import { getManager, getRepository } from "typeorm";
import TopicRepository from "../repository/TopicRepository";
import { Topic } from "../entity/Topic";
import { FastifyRequest, FastifyReply } from "fastify";
import response from "../helpers/response";
import moment = require("moment");

class TopicService {
  req: FastifyRequest<any>;
  rep: FastifyReply;

  constructor(req: FastifyRequest, rep: FastifyReply) {
    this.req = req;
    this.rep = rep;
  }

  // Service Api
  getTopic = async () => {
    const TopicRepos = getManager().getCustomRepository(TopicRepository);
    const { sort, dir, search } = this.req.query;
    let user: any;

    try {
      user = await TopicRepos.topicList(sort, dir, search);
    } catch (error) {
      return response.failed("", "Maaf Server sedang bermasalah !", this.rep);
    }

    if (user.length) {
      return response.pagination(user, "Data Ditemukan !", this.rep, this.req);
    }

    return response.failed("", "Data Tidak Ditemukan !", this.rep);
  };

  postTopic = async () => {
    const TopicRepos = getRepository(Topic);
    let topic: Topic;
    let { title, description } = this.req.body || this.req;

    if (!(title && description)) {
      return response.validation("", "Data tidak lengkap !", this.rep);
    }

    try {
      topic = await TopicRepos.findOne({
        topic_title: title,
      });
    } catch (error) {
      return response.failed("", "Maaf Server sedang bermasalah !", this.rep);
    }

    if (!topic) {
      let saveTopic = await TopicRepos.save({
        topic_title: title,
        topic_desc: description,
      });

      let data = {
        id: saveTopic.topic_id,
        title: saveTopic.topic_title,
        description: saveTopic.topic_desc,
        create_date: moment(saveTopic.topic_register).format(
          "dddd, DD MMMM YYYY"
        ),
        update_date: moment(saveTopic.topic_updated).format(
          "dddd, DD MMMM YYYY"
        ),
      };

      return response.success(data, "Data berhasil ditambahkan !", this.rep);
    }

    return response.failed("", "Maaf judul sudah terpakai !", this.rep);
  };

  patchTopic = async () => {
    const TopicRepos = getRepository(Topic);
    const { id } = this.req.params || this.req;
    const { title, description } = this.req.body || this.req;
    let topic: any;

    if (!(id && this.req.body)) {
      return response.validation("", "Data tidak lengkap !", this.rep);
    }

    try {
      topic = await TopicRepos.findOne({
        topic_id: id,
      });
    } catch (error) {
      console.log(error);
      return response.failed("", "Maaf Server sedang bermasalah !", this.rep);
    }

    if (topic) {
      let checked_title = await TopicRepos.findOne({
        topic_title: title,
      });

      if (checked_title) {
        return response.failed("", "Maaf judul sudah terpakai !", this.rep);
      }

      topic.topic_title = title;
      topic.topic_desc = description;

      let updateTopic = await TopicRepos.save(topic);

      let data = {
        id: updateTopic.topic_id,
        title: updateTopic.topic_title,
        description: updateTopic.topic_desc,
        create_date: moment(updateTopic.topic_register).format(
          "dddd, DD MMMM YYYY"
        ),
        update_date: moment(updateTopic.topic_updated).format(
          "dddd, DD MMMM YYYY"
        ),
      };

      return response.success(data, "Data berhasil diupdate", this.rep);
    }

    return response.failed("", "Data tidak ditemukan", this.rep);
  };

  deleteTopic = async () => {
    const TopicRepos = getRepository(Topic);
    const { id } = this.req.params || this.req;
    let topic: any;

    if (!id) {
      return response.validation("", "Data tidak lengkap !", this.rep);
    }

    try {
      topic = await TopicRepos.findOne({
        topic_id: id,
      });
    } catch (error) {
      console.log(error);
      return response.failed("", "Maaf Server sedang bermasalah !", this.rep);
    }

    if (topic) {
      await TopicRepos.delete({
        topic_id: id,
      });

      return response.success("", "Data berhasil dihapus", this.rep);
    }

    return response.failed("", "Data tidak ditemukan", this.rep);
  };
}

export default TopicService;
