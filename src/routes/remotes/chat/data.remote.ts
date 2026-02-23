import client from '$lib/server/openai/client';
import * as v from 'valibot';
import { command, getRequestEvent, query } from '$app/server';
import { getLangCache, getRedisClient } from '$lib/server/redis/client';
import { SearchStrategy } from '@redis-ai/langcache/models/searchstrategy.js';
import { MCP_SERVER_URL, CAMPAIGN_ID, DAVE_KEY, INTERNAL_KEY } from '$env/static/private';
import { selectedInfo } from '$lib/uitls/selectedInfo';
import { classifyIntent } from '$lib/uitls/classifyIntent';
import { getPromptForIntent } from '$lib/uitls/prompts';

const SendMessageSchema = v.object({
	query: v.pipe(v.string())
});

export const sendMessage = command(SendMessageSchema, async ({ query }) => {
	const langcache = await getLangCache();
	const redis = await getRedisClient();
	const { auth, key } = await getUser();
	let existingResponse;

	try {
		existingResponse = await langcache?.search({
			prompt: query,
			searchStrategies: [SearchStrategy.Exact, SearchStrategy.Semantic],
			similarityThreshold: 0.9
		});
	} catch (error) {
		// Cache miss (404) is normal - just continue to generate fresh response
		if (error?.status === 404) {
			existingResponse = null;
		} else {
			// Re-throw actual errors
			throw error;
		}
	}

	if (existingResponse?.data?.length) {
		const existingStr = await redis?.get(key as string);

		let existing: Array<{
			role: 'user' | 'assistant';
			content: string;
			timestamp: string;
		}> = [];

		if (existingStr) {
			existing = JSON.parse(existingStr);
		}

		existing.push(
			{
				role: 'user',
				content: query,
				timestamp: new Date().toISOString()
			},
			{
				role: 'assistant',
				content: existingResponse.data[0].response || "Sorry, I couldn't generate a response.",
				timestamp: new Date().toISOString()
			}
		);

		await redis?.set(key as string, JSON.stringify(existing));
		await redis?.expire(key as string, 60 * 60 * 24 * 7);

		return {
			role: 'assistant',
			content: existingResponse.data[0].response,
			timestamp: new Date().toISOString()
		};
	}

	const historyStr = await redis?.get(key as string);
	let history = historyStr ? JSON.parse(historyStr) : [];

	const category = await classifyIntent(query, history.slice(-6));
	console.log(`Intent classified as: ${category}`);

	const info = await redis?.hGetAll('info');
	const projectInfo = await selectedInfo(
		['dave', 'whatsapp', 'gtai', 'planewiki', 'donc'],
		'display'
	);
	const conversationContext = formatConversationContext(history);

	const promptConfig = getPromptForIntent(
		category,
		CAMPAIGN_ID,
		info,
		conversationContext,
		JSON.stringify(projectInfo, null, 2)
	);

	if (promptConfig.skipLlm && promptConfig.cannedResponse) {
		const response = {
			role: 'assistant' as const,
			content: promptConfig.cannedResponse,
			timestamp: new Date().toISOString()
		};

		history.push({ role: 'user', content: query, timestamp: new Date().toISOString() }, response);

		if (history.length > 20) history = history.slice(-20);
		await redis?.set(key as string, JSON.stringify(history));
		await redis?.expire(key as string, 60 * 60 * 24 * 7);

		return response;
	}

	console.log('Making an LLM call ....');
	const tools = promptConfig.requiresMcpTools
		? [
				{
					type: 'mcp' as const,
					server_label: 'dmcp',
					server_description: 'A server which can query the database for my D&D games',
					server_url: MCP_SERVER_URL,
					require_approval: 'never' as const,
					allowed_tools: [
						'find-player-by-name',
						'find-npc-by-name',
						'find-npcs-by-names',
						'find-players-by-names',
						'find-session-by-number',
						'find-locations-by-names',
						'find-location-by-name',
						'find-events-by-names',
						'find-event-by-name',
						'check-relationships',
						'check-active-quests'
					],
					authorization: auth,
					headers: {
						//Authorization: `Bearer ${auth}`,
						'DAVE-KEY': DAVE_KEY,
						'X-Internal-Request': INTERNAL_KEY
					}
				}
			]
		: [];

	try {
		const openaiResponse = await client.responses.create({
			model: 'gpt-5-mini',
			instructions: promptConfig.instructions,
			input: query,
			tools
		});

		if (openaiResponse.output_text) {
			langcache?.set({
				prompt: query,
				response: openaiResponse.output_text || "Sorry, I couldn't generate a response.",
				attributes: {
					createdAt: new Date().toDateString()
				},
				ttlMillis: 7 * 24 * 60 * 60 * 1000
			});

			history.push(
				{ role: 'user', content: query, timestamp: new Date().toISOString() },
				{
					role: 'assistant',
					content: openaiResponse.output_text,
					timestamp: new Date().toISOString()
				}
			);

			if (history.length > 20) history = history.slice(-20);

			await redis?.set(key as string, JSON.stringify(history));
			await redis?.expire(key as string, 60 * 60 * 24 * 7);
		}

		return {
			role: 'assistant',
			content: openaiResponse.output_text || "Sorry, I couldn't generate a response.",
			timestamp: new Date().toISOString()
		};
	} catch (e) {
		console.warn(e);
		return {
			role: 'assistant',
			content:
				'Something went wrong with generating the response. Please allow me to send this to the admin to investigate',
			timestamp: new Date().toISOString()
		};
	}
});

const getUser = query(async () => {
	const { cookies } = getRequestEvent();

	return {
		auth: cookies.get('token'),
		key: cookies.get('key')
	};
});

export const getMessages = query(async () => {
	const { auth, key } = await getUser();
	const redis = await getRedisClient();
	const data = await redis?.get(key as string);
	if (!data) {
		return [];
	}
	return JSON.parse(data);
});

function formatConversationContext(
	messages: Array<{
		role: 'user' | 'assistant';
		content: string;
		timestamp: string;
	}>
): string {
	return messages
		.slice(-10)
		.map((msg) => `${msg.role.toUpperCase()}: ${msg.content.slice(0, 2400)}`)
		.join('\n\n');
}
