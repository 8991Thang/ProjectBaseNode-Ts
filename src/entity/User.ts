/* eslint-disable import/no-cycle */
import * as bcrypt from "bcrypt";
import { IsEmail } from "class-validator";
import config from "config";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SharePropEntity } from "@src/utils/sharePropEntity.utils";
import HobbyEntity from "./Hobby";

@Entity({ name: "user" })
export default class UserEntity extends SharePropEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ unique: true, nullable: false })
  @IsEmail()
  email: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: null, nullable: true })
  age: number;

  @Column({ default: null, nullable: true })
  address: string;

  @OneToMany("HobbyEntity", (hobby: HobbyEntity) => hobby.id, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  hobbys: Array<HobbyEntity>;

  @BeforeInsert()
  @BeforeUpdate()
  async beforeInsert(): Promise<void> {
    const salt = await bcrypt.genSalt(config.get("saltWordLength"));
    this.password = await bcrypt.hash(this.password, salt);
  }

  comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(this.password, password);
  }
}
