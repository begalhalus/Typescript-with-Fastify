import { EntityRepository, EntityManager, getRepository } from "typeorm";
import { News } from "../entity/News";

@EntityRepository(News)
class NewsRepository {
  manage: EntityManager;
  repositoryUser: any;

  constructor(manage: EntityManager) {
    this.manage = manage;
    this.repositoryUser = getRepository(News);
  }

  async newsList(
    sort: string,
    dir: string,
    search: string,
    status: number,
    topic: number
  ) {
    var query = `select a.news_id as id, a.topic_id as topic, a.news_title as title, a.news_desc as description, a.news_author as author, a.news_sts as status,  to_char(a.news_register, 'Day, DD Month yyyy') as  creation_date, to_char(a.news_updated , 'Day, DD Month yyyy') as  update_date from news a WHERE a.news_id is not null `;

    if (!sort) {
      sort = ` a.news_register`;
    }

    if (!dir) {
      dir = ` DESC`;
    }

    if (search) {
      query += ` AND a.news_title ILIKE '%${search}%' `;
    }

    if (topic) {
      query += ` AND a.topic_id::text like '%${topic}%' `;
    }

    if (status) {
      query += ` AND a.news_sts::text like '%${status}%' `;
    }

    query += ` order by ${sort} ${dir} `;

    let data = this.manage.query(query);

    return data;
  }

  async getTopic(topic_id: number) {
    let data = this.manage.query(
      `select a.topic_id, a.topic_title  from topic a where a.topic_id IN (${topic_id})   `
    );
    return data;
  }
}

export default NewsRepository;
