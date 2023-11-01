import { Express } from "express";
import express from "express";

export const port = 3000;
export const app: Express = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});
