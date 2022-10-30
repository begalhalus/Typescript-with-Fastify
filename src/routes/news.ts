import { FastifyInstance } from "fastify";
import NewsController from "../controllers/NewsController";

module.exports = async (server: FastifyInstance) => {
  server.get("/", NewsController.news);
  server.post("/", NewsController.addNews);
  server.patch("/:id", NewsController.editNews);
  server.delete("/:id", NewsController.deleteNews);
};
