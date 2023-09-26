import { CartEntity } from 'src/cart/entities/cart.entities';
import { AdminEntity } from '../../admin/entities';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({
  name: 'product',
})
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({
    name: 'title',
    nullable: false,
  })
  title: string;

  @Column({
    nullable: true,
    name: 'description',
  })
  description: string;

  @Index()
  @Column({
    nullable: false,
  })
  price: number;

  @Index()
  @Column({
    name: 'is_available',
    default: true,
  })
  isAvailable: boolean;

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

  @ManyToOne(() => AdminEntity, (admin) => admin.products)
  admin: AdminEntity;

  @OneToMany(() => CartEntity, (cart) => cart.product, {
    nullable: true,
  })
  cart: CartEntity[];

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  validateAdminData() {
    if (!this.admin) {
      throw new Error('Admin data is required for ProductEntity.');
    }
  }
}
