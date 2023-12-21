import type { APIRequest, APIResponse } from "@/sharedTypes";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

let lastExchange: ChatCompletionMessageParam[] = [];

export default async function sendPrompt(input: string, route = "/message") {
  const message: ChatCompletionMessageParam = {
    role: "user",
    content: input,
  };

  const apiReq: APIRequest =
    lastExchange.length > 0 ? [...lastExchange, message] : [message];

  console.log("next request:");
  console.log(apiReq);

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

  lastExchange = [
    { role: "user", content: input },
    { role: "assistant", content: res.message },
  ];

  return res.message;
}
