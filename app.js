const express = require("express");
const cors = require("cors");
const KakaoClient = require("./kakao.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.post("/login", async (req, res, next) => {
  console.log("/login start");
  try {
    const { code } = req.body;
    const { access_token } = await KakaoClient.getToken(code);
    const userData = await KakaoClient.getUserData(access_token);

    // Further login-related processing (e.g., database operations, session handling)

    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    const errorData = {
      message: "Internal server error.. :(",
    };
    res.status(500).json(errorData);
  }
  console.log("/login finish");
});

app.get("/kakao/url", (req, res, next) => {
  console.log("/kakao/url start");
  const url = KakaoClient.getAuthCodeURL();
  res.status(200).json({ url });
  console.log("/kakao/url finish");
});

module.exports = app;
