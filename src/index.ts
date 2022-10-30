import db from "./decorators/db";
const news = require("./routes/news");
const topic = require("./routes/topic");
const server = require("fastify")();

const PORT = 5005;

const qs = require("qs");
server.register(require("fastify-formbody"), {
  parser: (str) => qs.parse(str),
});

server.register(db);

(async () => {
  server.register(news, { prefix: "/news" });
  server.register(topic, { prefix: "/topic" });

  server.listen(+PORT, () => {
    console.log("Server started on port " + PORT);
  });
})();
