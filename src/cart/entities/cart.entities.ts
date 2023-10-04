import { ProductEntity } from '../../products/entities';
import { UserEntity } from '../../users/entities';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Unique(['user', 'product'])
@Entity({
  name: 'cart',
})
export class CartEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 1, nullable: false })
  quantity: number;

  @Index()
  @ManyToOne(() => UserEntity, (user) => user.cart)
  @JoinColumn()
  user: UserEntity;

  @Index()
  @ManyToOne(() => ProductEntity, (product) => product.cart)
  @JoinColumn()
  product: ProductEntity;

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

  @BeforeInsert()
  @BeforeUpdate()
  validateRelationData() {
    if (!this.user) {
      throw new Error('User data is required for CartEntity.');
    }
    if (!this.product) {
      throw new Error('Product data is required for Cart Entity');
    }
  }
}
