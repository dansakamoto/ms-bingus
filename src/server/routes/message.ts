import OpenAI from "openai";
import MockOpenAI from "@/server/utils/MockApi";
import type { APIMessage } from "@/sharedTypes";
import type { NextFunction, Request, Response } from "express";
import type { ChatCompletionUserMessageParam } from "openai/resources/chat/completions";

export default async function message(
  req: Request<APIMessage>,
  res: Response,
  next: NextFunction
) {
  const messages: ChatCompletionUserMessageParam = {
    role: "user",
    content: req.body.message,
  };
  const openai =
    process.env.NODE_ENV == "production"
      ? new OpenAI({ apiKey: process.env.API_KEY })
      : new MockOpenAI();
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [messages],
  });
  if (!response) {
    next(new Error("Error receiving response fromo chat gpt"));
    return;
  }
  const reply = { message: response.choices[0].message.content };

  res.send(reply);
}
