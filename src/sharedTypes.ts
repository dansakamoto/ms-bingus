import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

export type APIRequest = Array<ChatCompletionMessageParam>;

export type APIResponse = {
  message: string;
};
