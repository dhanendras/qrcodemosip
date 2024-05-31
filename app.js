const express = require("express");
const { PORT } = require("./config");
const { post_GetToken, get_GetUserInfo } = require("./esignetService");
const app = express();
app.use(express.json());

app.get("/qr", (req, res) => {
  res.send("Welcome to Token REST APIs!!");
});

//Token Request Handler
app.post("/qr/fetchQR", async (req, res) => {
  try {
    console.log("===req.body===", req.body)
    const tokenResponse = await post_GetToken(req.body);
    res.send(tokenResponse);
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
});

//PORT ENVIRONMENT VARIABLE
const port = PORT;
app.listen(port, () => console.log(`Listening on port ${port}..`));
