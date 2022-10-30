import { FastifyRequest, FastifyReply } from "fastify";

import TopicService from "../services/TopicService";

class TopicController {
  static topic = async (
    req: FastifyRequest,
    rep: FastifyReply
  ): Promise<any> => {
    const service: TopicService = new TopicService(req, rep);

    try {
      await service.getTopic();
    } catch (error) {
      console.log(error);
    }
  };

  static addTopic = async (
    req: FastifyRequest,
    rep: FastifyReply
  ): Promise<any> => {
    const service: TopicService = new TopicService(req, rep);

    try {
      await service.postTopic();
    } catch (error) {
      console.log(error);
    }
  };

  static editTopic = async (
    req: FastifyRequest,
    rep: FastifyReply
  ): Promise<any> => {
    const service: TopicService = new TopicService(req, rep);

    try {
      await service.patchTopic();
    } catch (error) {
      console.log(error);
    }
  };

  static deleteTopic = async (
    req: FastifyRequest,
    rep: FastifyReply
  ): Promise<any> => {
    const service: TopicService = new TopicService(req, rep);

    try {
      await service.deleteTopic();
    } catch (error) {
      console.log(error);
    }
  };
}

export default TopicController;
