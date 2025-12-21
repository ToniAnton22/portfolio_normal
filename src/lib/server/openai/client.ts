import { OPENAI_KEY, OPENAI_PROJECT } from '$env/static/private';
import OpenAI from 'openai';

const client = new OpenAI({
	apiKey: OPENAI_KEY,
	project: OPENAI_PROJECT
});

export default client;
