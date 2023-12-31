import "dotenv/config";
import express from "express";
import ViteExpress from "vite-express";
import message from "@/server/routes/message";

const port = 3000;

const app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
ViteExpress.listen(app, port, () => {
  console.log(`Microsoft Bingus lives at port ${port}`);
});

app.post("/message", message);
