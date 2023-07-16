const app = require("express")();
const { randomUUID} = require("crypto");
const axios = require("axios");

app.use(require("body-parser").json());
app.use(require("cors")());

// In memory storage
const posts = {};

app.get("/posts", (_req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomUUID();
  const { title } = req.body;

  posts[id] = { id, title };

  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: posts[id],
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type);

  res.send({ status: "OK" });
});


app.listen(4000, () => {
  console.log("Listening on 4000");
});
