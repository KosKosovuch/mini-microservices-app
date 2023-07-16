const app = require("express")();
const axios = require("axios");

app.use(require("body-parser").json());

app.post("/events", async (req, res) => {
  const { type, data: { content, ...rest } } = req.body;

  if (type === "CommentCreated") {
    const status = content.includes("orange") ? "rejected" : "approved";

    await axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
      data: { ...rest, status, content }
    });
  }

  res.send({ status: "OK" });
});

app.listen(4003, () => {

  console.log("Listening on 4003");
});
