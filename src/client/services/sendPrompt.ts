import type { APIRequest, APIResponse } from "@/api/definition";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const lastExchanges: ChatCompletionMessageParam[] = [];

export default async function sendPrompt(input: string, route = "/message") {
  const message: ChatCompletionMessageParam = {
    role: "user",
    content: input,
  };

  const apiReq: APIRequest =
    lastExchanges.length > 0 ? [...lastExchanges, message] : [message];

  const res = await fetch(route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(apiReq),
  }).then((r) => {
    if (!r.ok) return Error("something went wrong, please try again");
    return r.json() as Promise<APIResponse>;
  });

  if (!res.message) {
    console.error("Received empty response from endpoint");
    return "";
  }

  while (lastExchanges.length > 2) {
    lastExchanges.shift();
  }
  lastExchanges.push({ role: "user", content: input });
  lastExchanges.push({ role: "assistant", content: res.message });

  return res.message;
}
