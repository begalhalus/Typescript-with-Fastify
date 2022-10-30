import { FastifyInstance } from "fastify";
import TopicController from "../controllers/TopicController";

module.exports = async (server: FastifyInstance) => {
  server.get("/", TopicController.topic);
  server.post("/", TopicController.addTopic);
  server.patch("/:id", TopicController.editTopic);
  server.delete("/:id", TopicController.deleteTopic);
};
