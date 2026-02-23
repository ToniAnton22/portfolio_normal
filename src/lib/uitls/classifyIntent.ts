import client from '$lib/server/openai/client';

export type IntentCategory = 'professional' | 'dnd_campaign' | 'coding_help' | 'off_topic';

interface Message {
	role: 'user' | 'assistant';
	content: string;
	timestamp: string;
}

const KEYWORDS = {
	professional: [
		'job',
		'hire',
		'hiring',
		'recruit',
		'experience',
		'skills',
		'qualifications',
		'resume',
		'cv',
		'portfolio',
		'work',
		'contract',
		'opportunity',
		'developer',
		'engineer',
		'position',
		'role',
		'salary',
		'availability',
		'background',
		'projects',
		'technologies'
	],
	dnd_campaign: [
		'dnd',
		'd&d',
		'campaign',
		'session',
		'npc',
		'player',
		'character',
		'quest',
		'location',
		'event',
		'dungeon',
		'dragon',
		'game',
		'story',
		'adventure',
		'party',
		'dice',
		'roll',
		'dm',
		'dungeon master'
	],
	coding_help: [
		'how do i code',
		'how to code',
		'debug',
		'debugging',
		'algorithm',
		'leetcode',
		'data structure',
		'implement',
		'bug fix',
		'error',
		'stackoverflow',
		'syntax',
		'compile',
		'runtime',
		'help me code',
		'solve this',
		'tutorial',
		'explain this code',
		'code review',
		'optimization',
		'best practice'
	]
};

export async function classifyIntent(
	query: string,
	recentHistory: Message[] = []
): Promise<IntentCategory> {
	const queryLower = query.toLowerCase();
	const contextWindow = recentHistory
		.slice(-3)
		.map((m) => m.content.toLowerCase())
		.join(' ');

	// Quick keyword matching first (fast path)
	const scores = {
		professional: 0,
		dnd_campaign: 0,
		coding_help: 0,
		off_topic: 0
	};

	// Score based on query
	for (const [category, keywords] of Object.entries(KEYWORDS)) {
		for (const keyword of keywords) {
			if (queryLower.includes(keyword)) {
				scores[category as keyof typeof scores] += 2;
			}
		}
	}

	// Bonus points from recent context (lighter weight)
	for (const [category, keywords] of Object.entries(KEYWORDS)) {
		for (const keyword of keywords) {
			if (contextWindow.includes(keyword)) {
				scores[category as keyof typeof scores] += 1;
			}
		}
	}

	// If we have a clear winner from keywords (>= 3 points), use it
	const maxScore = Math.max(...Object.values(scores));
	if (maxScore >= 3) {
		return Object.entries(scores).find(([_, score]) => score === maxScore)?.[0] as IntentCategory;
	}

	// Fallback: Use LLM for ambiguous cases
	const historyContext =
		recentHistory.length > 0
			? `Recent conversation:\n${recentHistory.map((m) => `${m.role}: ${m.content.slice(0, 200)}`).join('\n')}`
			: '';

	const classificationResponse = await client.chat.completions.create({
		model: 'gpt-4o-mini',
		messages: [
			{
				role: 'system',
				content: `You are a query classifier. Classify the user's intent into ONE category:
- professional: Questions about Cristian's job experience, skills, hiring, work history, qualifications, projects
- dnd_campaign: Questions about D&D games, sessions, NPCs, players, quests, locations, campaign stories
- coding_help: Requests for coding tutorials, debugging help, algorithm explanations, implementation guidance
- off_topic: Everything else

${historyContext}

Respond with ONLY the category name, nothing else.`
			},
			{
				role: 'user',
				content: query
			}
		],
		temperature: 0,
		max_tokens: 10
	});

	const category = classificationResponse.choices[0]?.message?.content?.trim().toLowerCase();

	if (
		category === 'professional' ||
		category === 'dnd_campaign' ||
		category === 'coding_help' ||
		category === 'off_topic'
	) {
		return category as IntentCategory;
	}

	// Ultimate fallback
	return 'off_topic';
}