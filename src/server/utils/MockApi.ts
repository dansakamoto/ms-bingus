import type { ChatCompletionCreateParamsNonStreaming } from "openai/resources/index";

export default class MockOpenAI {
  chat = {
    completions: {
      create: async (params: ChatCompletionCreateParamsNonStreaming) => {
        const model = params.model;
        const messages = params.messages;
        if (model === "gpt-4" && messages) {
          return {
            id: "chatcmpl-8V9rSLmq1XNPMnfNB91DflIHL8hWL",
            object: "chat.completion",
            created: 1702436766,
            model: "gpt-4-0613",
            choices: [
              {
                index: 0,
                message: {
                  role: "assistant",
                  content: "[Placeholder text - lorem ipsum beep boop]",
                },
                finish_reason: "stop",
              },
            ],
            usage: { prompt_tokens: 8, completion_tokens: 9, total_tokens: 17 },
            system_fingerprint: null,
          };
        }
      },
    },
  };
}
