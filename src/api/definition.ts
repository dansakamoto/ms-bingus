import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

export const maxChatHistory = 6; // includes current message and system message

export type APIRequest = Array<ChatCompletionMessageParam>;

export type APIResponse = {
  message: string;
};
