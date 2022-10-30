import { FastifyRequest, FastifyReply } from "fastify";

import NewsService from "../services/NewsService";

class NewsController {
  static news = async (
    req: FastifyRequest,
    rep: FastifyReply
  ): Promise<any> => {
    const service: NewsService = new NewsService(req, rep);

    try {
      await service.getNews();
    } catch (error) {
      console.log(error);
    }
  };

  static addNews = async (
    req: FastifyRequest,
    rep: FastifyReply
  ): Promise<any> => {
    const service: NewsService = new NewsService(req, rep);

    try {
      await service.postNews();
    } catch (error) {
      console.log(error);
    }
  };

  static editNews = async (
    req: FastifyRequest,
    rep: FastifyReply
  ): Promise<any> => {
    const service: NewsService = new NewsService(req, rep);

    try {
      await service.patchNews();
    } catch (error) {
      console.log(error);
    }
  };

  static deleteNews = async (
    req: FastifyRequest,
    rep: FastifyReply
  ): Promise<any> => {
    const service: NewsService = new NewsService(req, rep);

    try {
      await service.deleteNews();
    } catch (error) {
      console.log(error);
    }
  };
}

export default NewsController;
