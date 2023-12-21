import type { APIRequest, APIResponse } from "@/sharedTypes";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

export default async function sendPrompt(input: string, route = "/message") {
  const message: ChatCompletionMessageParam = {
    role: "user",
    content: input,
  };

  const apiReq: APIRequest = [message];

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

  return res.message;
}
