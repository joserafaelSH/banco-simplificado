import { Express } from "express";
import express from "express";

const port = 3000;
const app: Express = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is listening on port teste ${port}`);
});
