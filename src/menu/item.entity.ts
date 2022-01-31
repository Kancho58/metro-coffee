import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ItemStatus } from './item-status.enum';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  category: string;

  @Column()
  ingredients: string;

  @Column()
  status: ItemStatus;

  @ManyToOne((_type) => User, (user) => user.items, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
