import { IsEmail } from "class-validator";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class User {
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

  @Column("simple-array")
  hobby: string[];
}
