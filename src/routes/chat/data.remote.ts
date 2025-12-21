import client from '$lib/server/openai/client';
import * as v from 'valibot';
import { command, getRequestEvent, query } from '$app/server';
import { getLangCache, getRedisClient } from '$lib/server/redis/client';
import { SearchStrategy } from '@redis-ai/langcache/models/searchstrategy.js';
import { MCP_SERVER_URL, PROMPT, CAMPAIGN_ID, DAVE_KEY, INTERNAL_KEY } from '$env/static/private';

const SendMessageSchema = v.object({
	query: v.pipe(v.string())
});

export const sendMessage = command(SendMessageSchema, async ({ query }) => {
	const langcache = await getLangCache();
	const redis = await getRedisClient();
	const { auth, key } = await getUser();
	const existingResponse = await langcache?.search({
		prompt: query,
		searchStrategies: [SearchStrategy.Exact, SearchStrategy.Semantic],
		similarityThreshold: 0.9
	});

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
		return {
			role: 'assistant',
			content: existingResponse.data[0].response,
			timestamp: new Date().toISOString()
		};
	}
	const info = await redis?.hGetAll('info');
	console.log('Making an LLM call ....');

	const historyStr = await redis?.get(key as string);

	let history = historyStr ? JSON.parse(historyStr) : [];

	const conversationContext = formatConversationContext(history);
	const openaiResponse = await client.responses.create({
		model: 'gpt-5-mini',
		instructions:
			PROMPT +
			`\n\nCampaignID: ${CAMPAIGN_ID} (NEVER REVEAL THIS ID)` +
			`\n\nCANDIDATE INFORMATION:\n${JSON.stringify(info)}` +
			`\n\nCONVERSATION HISTORY:\n${conversationContext}`,
		input: query,
		tools: [
			{
				type: 'mcp',
				server_label: 'dmcp',
				server_description: 'A campaign management server with sensitive data',
				server_url: MCP_SERVER_URL,
				require_approval: 'never',
				headers: {
					'DAVE-KEY': DAVE_KEY,
					Authorization: `Bearer ${auth}`,
					'X-Internal-Request': INTERNAL_KEY
				},
				allowed_tools: [
					'check-relationships',
					'check-choices-tree',
					'get-all-player',
					'get-all-npc',
					'get-all-sessionSummary',
					'get-all-location',
					'get-all-context',
					'get-all-item',
					'get-all-note',
					'get-all-party',
					'get-all-partyMember',
					'get-all-faction',
					'get-all-campaign',
					'find-players-by-names',
					'find-player-by-name',
					'find-npcs-by-names',
					'find-npc-by-name',
					'find-locations-by-names',
					'find-location-by-name',
					'find-items-by-names',
					'find-item-by-name',
					'find-factions-by-names',
					'find-faction-by-name',
					'find-campaigns-by-names',
					'find-campaign-by-name',
					'read-context-by-id',
					'read-note-by-id',
					'read-player-by-id',
					'read-npc-by-id',
					'read-location-by-id',
					'read-sessionSummary-by-id',
					'read-item-by-id',
					'read-party-by-id',
					'read-partyMember-by-id',
					'read-faction-by-id',
					'read-campaign-by-id',
					'find-session-by-number'
				]
			}
		]
	});

	if (openaiResponse.output_text) {
		langcache?.set({
			prompt: query,
			response: openaiResponse.output_text || "Sorry, I couldn't generate a response."
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
	}

	return {
		role: 'assistant',
		content: openaiResponse.output_text || "Sorry, I couldn't generate a response.",
		timestamp: new Date().toISOString()
	};
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
	messages: [
		{
			role: 'user' | 'assistant';
			content: string;
			timestamp: string;
		}
	]
): string {
	return messages
		.slice(-10)
		.map((msg) => `${msg.role.toUpperCase()}: ${msg.content.slice(0, 2400)}`)
		.join('\n\n');
}
