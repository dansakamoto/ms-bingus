import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

export type APIRequest = [ChatCompletionMessageParam];

export type APIResponse = {
  message: string;
};
