const { app } = require("./app.js");

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
}); // 서버 실행
