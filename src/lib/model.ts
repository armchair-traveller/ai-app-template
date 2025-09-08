import { createOpenAI } from '@ai-sdk/openai';
import { OPENAI_API_KEY } from '$env/static/private';

const openai = createOpenAI({ apiKey: OPENAI_API_KEY });

export const model = openai('gpt-5-mini');
export const factualityModel = openai('gpt-5-nano');
export const summarizationModel = openai('gpt-5-nano');
// Model used for content safety guardrails
export const guardrailModel = openai('gpt-5-nano');
