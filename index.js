const express = require("express");
const https = require("https");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const httpsOptions = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.cert"),
};

const server = https.createServer(httpsOptions, app);

server.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});
