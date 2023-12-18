import OpenAI from "openai";
import MockOpenAI from "@/server/utils/MockApi";
//import { addMessages } from "@/server/utils/data";
import type { APIMessage } from "@/sharedTypes";
import type { NextFunction, Request, Response } from "express";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

export default async function message(
  req: Request<APIMessage>,
  res: Response,
  next: NextFunction
) {
  const messages: ChatCompletionMessageParam = {
    role: "user",
    content: req.body.message,
  };

  const openai =
    process.env.NODE_ENV == "production" || process.env.API_DEV == "true"
      ? new OpenAI({ apiKey: process.env.API_KEY })
      : new MockOpenAI();
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content:
          "You are a goofy pink hairless cat named Bingus. Speak only in a \
          cutesy UWU voice. Include 👉👈 frequently, especially when you're \
          feeling bashful. Also, use like 20% more emojis. Also, you have a \
          lot of detailed opinions about whatever topic you're asked about.",
      },
      messages,
    ],
  });
  if (!response) {
    next(new Error("Error receiving response from chat gpt"));
    return;
  }
  const reply = { message: response.choices[0].message.content };

  res.send(reply);
  /*
  addMessages([
    { role: "user", message: req.body.message },
    { role: "assistant", message: reply.message || "" },
  ]);
  */
}
