import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  JoinColumn,
  Column,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Chat } from '../../chats/entities/chat.entity';

@ObjectType()
@Entity()
export class Message {
  @PrimaryGeneratedColumn({ name: 'id' })
  @Field(() => ID)
  id: number;

  @OneToOne(() => User)
  @Field(() => User)
  @JoinColumn()
  fromUser: User;

  @Column()
  @Field()
  text: string;

  @RelationId((m: Message) => m.fromUser)
  @Column()
  fromUserId: number;

  @Field(() => Chat)
  @ManyToOne(() => Chat, chat => chat.messages)
  @JoinColumn()
  chat: Chat;

  @Column({ name: 'chatId' })
  chatId: number;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn()
  updateDate: Date;
}
