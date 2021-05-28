import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
  @PrimaryGeneratedColumn("uuid")
  id:Number;
  @Column()
  name :string
}
