const router = require("express").Router();
const env = require("dotenv");
const { Configuration, OpenAIApi } = require("openai");

env.config();

// Configure open api
const configuration = new Configuration({
  organization: "org-HEg5ajcwhs8m1LXQgIbK6HeG",
  apiKey: process.env.API_KEY, // VISIT .env AND MAKE CHANGES
});
const openai = new OpenAIApi(configuration);

// dummy route to test
router.get("/", (req, res) => {
  res.json({
    message: "Hello ^-^",
  });
});

//post route for making requests
router.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `${message}` }],
    });
    res.json({ message: response.data.choices[0].message.content });
    console.log(response.data.choices[0].message);
  } catch (e) {
    console.log(e);
    res.send(e).status(400);
  }
});

module.exports = router;
