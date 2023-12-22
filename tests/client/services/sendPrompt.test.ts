import { test, expect, vi } from "vitest";
import sendPrompt from "@/client/services/sendPrompt";
import type { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import type { APIRequest } from "@/api/definition";

const testIn = "test input messsage";
const testOut = "test output message";

function mockFetchResponse() {
  return {
    ok: true,
    json: () =>
      new Promise((resolve) =>
        resolve({
          message: "test output message",
        })
      ),
  };
}
global.fetch = vi.fn().mockResolvedValue(mockFetchResponse());

function mockApiBody(input: string) {
  const message: ChatCompletionMessageParam = {
    role: "user",
    content: input,
  };
  const apiReq: APIRequest = [message];
  return JSON.stringify(apiReq);
}

test("make POST request to send message", async () => {
  const res = await sendPrompt(testIn, "/test-route");

  expect(fetch).toHaveBeenCalledWith("/test-route", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: mockApiBody(testIn),
  });

  expect(res).toStrictEqual(testOut);
});
