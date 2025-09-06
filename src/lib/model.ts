import { openai } from '@ai-sdk/openai';

export const model = openai('gpt-5');
export const factualityModel = openai('gpt-5-nano');
export const summarizationModel = openai('gpt-5-nano');
// Model used for content safety guardrails
export const guardrailModel = openai('gpt-5-nano');
