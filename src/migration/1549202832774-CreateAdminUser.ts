import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { News } from "../entity/News";
import { Topic } from "../entity/Topic";

export class CreateAdminUser1547919837483 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let news = [
      {
        news: new News(),
        news_id: 1,
        topic_id: JSON.parse('["1"]'),
        news_title:
          "Gagal Menangi Balapan Musim Ini Bukan Akhir Dunia bagi Lewis Hamilton",
        news_desc:
          "Juara dunia Formula 1 tujuh kali Lewis Hamilton mengatakan gagal memenangi satu pun balapan musim ini bukanlah akhir dunia baginya.",
        news_sts: 3,
        news_author: "Rahmadz",
      },
      {
        news: new News(),
        news_id: 2,
        topic_id: JSON.parse('["2", "3"]'),
        news_title:
          "Begini Kelakuan 12 Zodiak saat Olahraga di Pusat Kebugaran, Siapa yang Paling Mager?",
        news_desc:
          "Seperti apa kecenderung seseorang saat memutuskan untuk olahraga di pusat kebugaran. Hal tersebut rupanya juga bisa dilihat berdasarkan zodiak",
        news_sts: 1,
        news_author: "Fery",
      },
    ];
    const newsRepository = await getRepository(News);
    await newsRepository.save(news);

    let topic = [
      {
        topic: new Topic(),
        topic_id: 1,
        topic_title: "Sport",
        topic_desc: "Semua tentang sport ada disini",
      },
      {
        topic: new Topic(),
        topic_id: 2,
        topic_title: "Lifestyle",
        topic_desc: "Semua tentang sport ada disini",
      },
      {
        topic: new Topic(),
        topic_id: 3,
        topic_title: "Otomotif",
        topic_desc: "Semua tentang sport ada disini",
      },
    ];
    const topicRepository = await getRepository(Topic);
    await topicRepository.save(topic);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
