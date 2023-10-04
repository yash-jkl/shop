import { ProductEntity } from '../../products/entities';
import { UserEntity } from '../../users/entities';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({
  name: 'order',
})
export class OrderEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @ManyToOne(() => UserEntity, (user) => user.order)
  @JoinColumn()
  user: UserEntity;

  @Column({
    name: 'payment_id',
    type: 'uuid',
  })
  paymentId: string;

  @Index()
  @ManyToOne(() => ProductEntity, (product) => product.order)
  @JoinColumn()
  product: ProductEntity;

  @Column()
  productPrice: string;

  @Column({ default: 1, nullable: false })
  quantity: number;

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

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  validateRelationData() {
    if (!this.user) {
      throw new Error('User data is required for OrderEntity.');
    }
    if (!this.product) {
      throw new Error('Product data is required for OrderEntity');
    }
  }
}
