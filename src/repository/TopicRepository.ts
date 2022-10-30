import { EntityRepository, EntityManager, getRepository } from "typeorm";
import { Topic } from "../entity/Topic";

@EntityRepository(Topic)
class TopicRepository {
  manage: EntityManager;
  repositoryUser: any;

  constructor(manage: EntityManager) {
    this.manage = manage;
    this.repositoryUser = getRepository(Topic);
  }

  async topicList(sort: string, dir: string, search: string) {
    var query = `select a.topic_id as id, a.topic_title as title, a.topic_desc as description,  to_char(a.topic_register, 'Day, DD Month yyyy') as  creation_date, to_char(a.topic_updated , 'Day, DD Month yyyy') as  update_date from topic a WHERE a.topic_id is not null `;

    if (!sort) {
      sort = ` a.topic_register`;
    }

    if (!dir) {
      dir = ` DESC`;
    }

    if (search) {
      query += ` AND a.topic_title ILIKE '%${search}%' `;
    }

    query += ` order by ${sort} ${dir} `;

    let data = this.manage.query(query);

    return data;
  }
}

export default TopicRepository;
