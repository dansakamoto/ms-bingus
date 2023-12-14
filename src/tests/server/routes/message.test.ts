import { expect, test, vi } from "vitest";
import message from "@/server/routes/message";
import type { Response, Request, NextFunction } from "express";
import { APIMessage } from "@/sharedTypes";

const req = {
  body: {
    message: "are you there?",
  },
};
const res = {
  send: (reply: APIMessage) => {
    return reply;
  },
};
const next = {};
const spy = vi.spyOn(res, "send");

test("call OpenAI api and check for valid output", async () => {
  await message(
    req as Request<APIMessage>,
    res as unknown as Response,
    next as NextFunction
  );
  expect(spy).toBeCalledWith({
    message: "[Placeholder text - lorem ipsum beep boop]",
  });
});
