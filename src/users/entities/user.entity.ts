import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field()
  @Column()
  username: string;

  @Column()
  passwordHash: string;

  @Field()
  @CreateDateColumn()
  createDate: Date;
}
