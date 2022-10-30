import { getManager, getRepository } from "typeorm";
import NewsRepository from "../repository/NewsRepository";
import { News } from "../entity/News";
import { FastifyRequest, FastifyReply } from "fastify";
import response from "../helpers/response";
import moment = require("moment");
import * as lodash from "lodash";
import helper from "../helpers/function";
const NEWS_STATUSES = {
  "1": "draft",
  "2": "deleted",
  "3": "published",
};

class NewsService {
  req: FastifyRequest<any>;
  rep: FastifyReply;

  constructor(req: FastifyRequest, rep: FastifyReply) {
    this.req = req;
    this.rep = rep;
  }

  // Service Api
  getNews = async () => {
    const NewsRepos = getManager().getCustomRepository(NewsRepository);
    const { sort, dir, search, status, topic } = this.req.query;
    let user: any;

    try {
      user = await NewsRepos.newsList(sort, dir, search, status, topic);
    } catch (error) {
      return response.failed("", "Maaf Server sedang bermasalah !", this.rep);
    }

    if (user.length) {
      let topicArray = user.map(async (list, key) => {
        return await NewsRepos.getTopic(list.topic);
      });

      let data = await Promise.all(topicArray);

      lodash.forEach(user, async (list, key) => {
        list.topic = data[key];

        list.status = NEWS_STATUSES[list.status];

        list.article_url =
          "http://www.example.com/articles/" + helper.generatechar(10);
      });

      return response.pagination(user, "Data Ditemukan !", this.rep, this.req);
    }

    return response.failed("", "Data Tidak Ditemukan !", this.rep);
  };

  postNews = async () => {
    const NewsRepos = getRepository(News);
    let news: News;
    const { title, description, status, topic, author } =
      this.req.body || this.req;

    if (!title) {
      return response.validation("", "Data tidak lengkap !", this.rep);
    }

    try {
      news = await NewsRepos.findOne({
        news_title: title,
      });
    } catch (error) {
      return response.failed("", "Maaf Server sedang bermasalah !", this.rep);
    }

    if (!news) {
      let saveNews = await NewsRepos.save({
        news_title: title,
        news_desc: description,
        news_sts: status,
        topic_id: topic,
        news_author: author,
      });

      let data = {
        id: saveNews.news_id,
        topic: { topic_id: saveNews.topic_id },
        title: saveNews.news_title,
        description: saveNews.news_desc,
        author: saveNews.news_author,
        status: NEWS_STATUSES[saveNews.news_sts],
        create_date: moment(saveNews.news_register).format(
          "dddd, DD MMMM YYYY"
        ),
        update_date: moment(saveNews.news_updated).format("dddd, DD MMMM YYYY"),
        article_url:
          "http://www.example.com/articles/" + helper.generatechar(10),
      };

      return response.success(data, "Data berhasil ditambahkan !", this.rep);
    }

    return response.failed("", "Maaf judul sudah terpakai !", this.rep);
  };

  patchNews = async () => {
    const NewsRepos = getRepository(News);
    const { id } = this.req.params || this.req;
    const { title, description, status, topic, author } =
      this.req.body || this.req;

    let news: any;

    if (!(id && this.req.body)) {
      return response.validation("", "Data tidak lengkap !", this.rep);
    }

    try {
      news = await NewsRepos.findOne({
        news_id: id,
      });
    } catch (error) {
      console.log(error);
      return response.failed("", "Maaf Server sedang bermasalah !", this.rep);
    }

    if (news) {
      let checked_title = await NewsRepos.findOne({
        news_title: title,
      });

      if (checked_title) {
        return response.failed("", "Maaf judul sudah terpakai !", this.rep);
      }

      news.news_title = title;
      news.news_desc = description ?? news.news_desc;
      news.news_sts = status ?? news.news_sts;
      news.topic_id = topic ?? news.topic_id;
      news.news_author = author ?? news.news_author;

      let updateNews = await NewsRepos.save(news);

      let data = {
        id: updateNews.news_id,
        topic: { topic_id: updateNews.topic_id },
        title: updateNews.news_title,
        description: updateNews.news_desc,
        author: updateNews.news_author,
        status: NEWS_STATUSES[updateNews.news_sts],
        create_date: moment(updateNews.news_register).format(
          "dddd, DD MMMM YYYY"
        ),
        update_date: moment(updateNews.news_updated).format(
          "dddd, DD MMMM YYYY"
        ),
        article_url:
          "http://www.example.com/articles/" + helper.generatechar(10),
      };

      return response.success(data, "Data berhasil diupdate", this.rep);
    }

    return response.failed("", "Data tidak ditemukan", this.rep);
  };

  deleteNews = async () => {
    const NewsRepos = getRepository(News);
    const { id } = this.req.params || this.req;
    let news: any;

    if (!id) {
      return response.validation("", "Data tidak lengkap !", this.rep);
    }

    try {
      news = await NewsRepos.findOne({
        news_id: id,
      });
    } catch (error) {
      console.log(error);
      return response.failed("", "Maaf Server sedang bermasalah !", this.rep);
    }

    if (news) {
      await NewsRepos.delete({
        news_id: id,
      });

      return response.success("", "Data berhasil dihapus", this.rep);
    }

    return response.failed("", "Data tidak ditemukan", this.rep);
  };
}

export default NewsService;
