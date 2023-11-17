const axios = require("axios");

class Kakao {
  constructor() {
    this.key = process.env.KAKAO_KEY || "4721c4f7e6a29a07febfd392b4eaac17";
    this.redirectUri = `http://localhost:3000/auth`;
  }

  getAuthCodeURL() {
    return `https://kauth.kakao.com/oauth/authorize?client_id=${this.key}&redirect_uri=${this.redirectUri}&response_type=code`;
  }

  async getToken(code) {
    const params = {
      client_id: this.key,
      code,
      grant_type: "authorization_code",
      redirect_uri: this.redirectUri,
    };

    const { data } = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const tokenData = {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    };

    return tokenData;
  }

  async getUserData(token) {
    const { data } = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const userData = {
      nickname: data.kakao_account.profile.nickname,
    };

    return userData;
  }
}

module.exports = new Kakao();
