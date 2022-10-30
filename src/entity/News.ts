import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  news_id: number;

  @Column({
    nullable: true,
    type: "json",
  })
  @Length(1, 100)
  topic_id: string;

  @Column()
  @Length(1, 100)
  news_title: string;

  @Column({
    nullable: true,
  })
  @Length(1, 100)
  news_desc: string;

  @Column({
    comment: "1 = draft, 2 = deleted, 3 = published",
    default: 1,
  })
  @Length(1, 10)
  news_sts: number;

  @Column({
    default: "anonymous",
  })
  @Length(1, 100)
  news_author: string;

  @Column()
  @CreateDateColumn()
  news_register: Date;

  @Column()
  @UpdateDateColumn()
  news_updated: Date;
}
