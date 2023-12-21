import { expect, test, vi } from "vitest";
import message from "@/server/routes/message";
import type { Response, Request, NextFunction } from "express";
import type { APIRequest } from "@/api/definition";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const prompt: ChatCompletionMessageParam = {
  role: "user",
  content: "test input",
};

const req = {
  body: [prompt],
};

const res = {
  send: (reply: APIRequest) => {
    return reply;
  },
};
const next = {};
const spy = vi.spyOn(res, "send");

test("call OpenAI api and check for valid output", async () => {
  await message(
    req as Request<APIRequest>,
    res as unknown as Response,
    next as NextFunction
  );
  expect(spy).toBeCalledWith({
    message: "[Placeholder text - lorem ipsum beep boop]",
  });
});
