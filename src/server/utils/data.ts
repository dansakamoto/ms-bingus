import pg from "pg";
import type { Request, Response } from "express";
import type { APIMessage } from "@/sharedTypes";

const pool = new pg.Pool();
pool.on("error", (err, client) => {
  console.error(`Unexpected error on idle client`, err);
  client.release();
});

export async function getMessages(_: Request<APIMessage>, res: Response) {
  const client = await pool.connect();
  const data = await client.query("SELECT * FROM messages");
  client.release();
  if (data) {
    res.send({ messages: data.rows });
  } else {
    throw new Error("Error retrieving messages from database");
  }
}

export async function addMessages(
  messages: { role: "user" | "assistant"; message: string }[]
) {
  const client = await pool.connect();

  for (const m of messages) {
    const status = await client.query(
      "INSERT INTO messages VALUES(DEFAULT,$1,$2)",
      [m.role, m.message]
    );
    if (!status) throw new Error("Error saving messages to database");
  }
}
