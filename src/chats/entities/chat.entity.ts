import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Message } from '../../messages/entities/message.entity';

@ObjectType()
@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  name: string;

  @ManyToMany(() => User)
  @Field(() => [User])
  @JoinTable()
  members: User[];

  @RelationId((c: Chat) => c.members)
  membersIds: number[];

  @OneToMany(() => Message, message => message.chat, { cascade: true })
  messages: Message[];
}
