const express = require("express");
const colors = require("colors");
const https = require("https");
const CryptoJS = require("crypto-js");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function encrypt(data, key) {
  const cipherText = CryptoJS.AES.encrypt(data, key).toString();
  return cipherText;
}
function decrypt(data, key) {
  try {
    const bytes = CryptoJS.AES.decrypt(data, key);

    if (bytes.sigBytes > 0) {
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedData;
    }
  } catch (error) {
    throw new Error("Decryption Failed Invalid Key");
  }
}

app.get("/encrypt", (req, res) => {
  const { data, key } = req.body;
  const encryptData = encrypt(data, key);
  res.json({ encryptData });
});

app.get("/decrypt", (req, res) => {
  const { data, key } = req.body;
  const encryptData = decrypt(data, key);
  res.json({ encryptData });
});

const httpsOptions = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.cert"),
};

const server = https.createServer(httpsOptions, app);

server.listen(PORT, () =>
  console.log(`[Server :: https://localhost:${PORT}]`.black.bgYellow)
);
