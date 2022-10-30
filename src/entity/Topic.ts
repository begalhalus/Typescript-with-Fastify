import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";

@Entity()
export class Topic {
  @PrimaryGeneratedColumn()
  topic_id: number;

  @Column()
  @IsNotEmpty()
  @Length(1, 100)
  topic_title: string;

  @Column()
  @Length(1, 100)
  topic_desc: string;

  @Column()
  @CreateDateColumn()
  topic_register: Date;

  @Column()
  @UpdateDateColumn()
  topic_updated: Date;
}
