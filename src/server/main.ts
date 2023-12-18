import "dotenv/config";
import express from "express";
import ViteExpress from "vite-express";
import message from "@/server/routes/message";
// import { getMessages } from "@/server/utils/data";

const port = 3000;
const app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// Vite
ViteExpress.listen(app, port, () => {
  console.log(`Microsoft Bingus lives at port ${port}`);
});

// Routes
app.post("/message", message);
// app.get("/history", getMessages);
