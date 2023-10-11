import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { PaymentStatus } from '../constants';

@Unique(['checkoutId', 'productId'])
@Entity({
  name: 'payment',
})
export class PaymentEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'checkout_id',
    type: 'uuid',
  })
  checkoutId: string;

  @Column({
    name: 'user_id',
    type: 'uuid',
  })
  userId: string;

  @Column({
    name: 'product_id',
    type: 'uuid',
  })
  productId: string;

  @Column({
    name: 'product_title',
  })
  productTitle: string;

  @Column({
    name: 'product_price',
  })
  productPrice: number;

  @Column({
    name: 'admin_id',
    type: 'uuid',
  })
  adminId: string;

  @Column({ default: 1, nullable: false })
  quantity: number;

  @Column({
    default: PaymentStatus.PENDING,
  })
  status: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
  })
  deletedAt: Date;

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
