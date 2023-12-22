import { describe, expect, test, vi } from "vitest";
import message, { nullReply } from "@/server/routes/message";
import { mockGptResponse } from "@/server/utils/MockApi";
import type { Response, Request, NextFunction } from "express";
import type { APIRequest } from "@/api/definition";

const mockReq = {
  body: [
    {
      role: "user",
      content: "test input",
    },
  ],
};
const mockReqBad = {
  body: [
    {
      role: "system",
      content: "test input",
    },
    {
      role: "user",
      content: "test input",
    },
    {
      role: "assistant",
      content: "test input",
    },
    {
      role: "user",
      content: "test input",
    },
    {
      role: "assistant",
      content: "test input",
    },
    {
      role: "user",
      content: "test input",
    },
    {
      role: "assistant",
      content: "test input",
    },
    {
      role: "user",
      content: "test input",
    },
  ],
};
const mockRes = {
  send: (reply: APIRequest) => {
    return reply;
  },
};
const spy = vi.spyOn(mockRes, "send");

describe("GPT API Service", () => {
  test("call mock OpenAI api and check for valid output", async () => {
    await message(
      mockReq as Request<APIRequest>,
      mockRes as unknown as Response,
      {} as NextFunction
    );

    expect(spy).toBeCalledWith({
      message: mockGptResponse,
    });
  });

  test("call mock OpenAI api with too many parameters", async () => {
    await message(
      mockReqBad as Request<APIRequest>,
      mockRes as unknown as Response,
      {} as NextFunction
    );

    expect(spy).toBeCalledWith(nullReply);
  });
});
