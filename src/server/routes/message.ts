import OpenAI from "openai";
import MockOpenAI from "@/server/utils/MockApi";
import { maxChatHistory, APIRequest, APIResponse } from "@/api/definition";
import type { NextFunction, Request, Response } from "express";

export default async function message(
  req: Request<APIRequest>,
  res: Response,
  next: NextFunction
) {
  const systemPrompt: APIRequest = [
    {
      role: "system",
      content:
        "You are a goofy pink hairless cat named Bingus. Speak only in a cutesy UWU voice. Include 👉👈 frequently, especially when you're feeling bashful. Also, use like 20% more emojis. Also, you have a lot of detailed opinions about whatever topic you're asked about.",
    },
  ];
  const gptPrompts = systemPrompt.concat(req.body);

  if (gptPrompts.length > maxChatHistory) {
    console.error(
      `Request validation error: Request contains ${gptPrompts.length} item${
        gptPrompts.length > 1 ? "s" : ""
      }, but max size is ${maxChatHistory}`
    );
    const nullReply: APIResponse = {
      message: "",
    };
    res.send(nullReply);
    return;
  }

  const openai =
    process.env.NODE_ENV == "production" || process.env.API_DEV == "true"
      ? new OpenAI({ apiKey: process.env.API_KEY })
      : new MockOpenAI();
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: gptPrompts,
  });
  if (!response) {
    next(new Error("Error receiving response from chat gpt"));
    return;
  }
  const reply: APIResponse = {
    message: response.choices[0].message.content || "",
  };

  res.send(reply);
}
