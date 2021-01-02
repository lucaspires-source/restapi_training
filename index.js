import express from "express";

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("server is just ready");
});

app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
