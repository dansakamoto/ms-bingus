CREATE TYPE "role" AS ENUM (
  'user',
  'assistant',
  'system'
);

CREATE TABLE "messages" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "role" role NOT NULL,
  "message" text
);
