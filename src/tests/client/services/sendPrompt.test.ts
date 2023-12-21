import { expect, test } from "vitest";
import express from "express";
import sendPrompt from "@/client/services/sendPrompt";

const app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.listen(3000);

app.post("/message", (req, res) => {
  res.send({
    message:
      "test output from " +
      req.body[0].content +
      ", role is set to " +
      req.body[0].role,
  });
});

test("test client-side api fetch", async () => {
  expect(await sendPrompt("test input", "http://localhost:3000/message")).toBe(
    "test output from test input, role is set to user"
  );
});
