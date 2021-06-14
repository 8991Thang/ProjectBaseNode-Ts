/* eslint-disable import/no-cycle */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import UserEntity from "@src/entity/User";
import { HobbyType } from "@src/types/hobby.type";
import { SharePropEntity } from "@src/utils/sharePropEntity.utils";

@Entity({ name: "hobby" })
export default class HobbyEntity extends SharePropEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  name: string;

  @Column({
    type: "enum",
    enum: HobbyType,
  })
  typeOfHobby: HobbyType;

  @OneToMany(() => UserEntity, (user: UserEntity) => user.hobbys)
  userId: UserEntity;
}
