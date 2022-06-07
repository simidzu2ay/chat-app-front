import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Message } from './message.entity';

@Entity()
export class UserMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_message_id' })
  userMessageId: number;

  @ManyToOne(() => Message)
  @JoinColumn({ name: 'message_id' })
  message: Message;

  @RelationId((t: UserMessage) => t.message)
  messageId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @RelationId((t: UserMessage) => t.user)
  userId: number;
}
