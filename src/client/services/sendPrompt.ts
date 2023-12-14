import type { APIMessage } from "@/sharedTypes";

export default async function sendPrompt(input: string, route = "/message") {
  const data = { message: input };
  const res = await fetch(route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((r) => {
    if (!r.ok) return Error("something went wrong, please try again");
    return r.json() as Promise<APIMessage>;
  });

  return res.message;
}
