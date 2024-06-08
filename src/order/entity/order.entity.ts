import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ModifyLivraisonDTO } from '../dto/modify-livraison.dto';
import { User } from 'src/user/entity/user.entity';
import { OrderProduct } from './order-product.entity';
import { DecimalColumnTransformer } from 'src/utils/decimal-column.transformer';


@Entity()
export class Order {
    static OrderType =  {
        Created: "created",
        Paid: "paid",
      }
      
    constructor(user: User){
      if(user){
        this.customer = user;
      }
      this.createdAt = new Date(),
      this.updatedAt = new Date(),
      this.paidAt = null,
      this.status = Order.OrderType.Created
      this.total = 0.00;
    }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  createdAt: Date;

  @Column()
  updatedAt: Date;
  
  @Column({nullable: true})
  paidAt: Date;

  @ManyToOne(() => User)
  customer: User;

  @OneToMany(() => OrderProduct, (OrderProduct) => OrderProduct.order, { cascade: true })
  products: OrderProduct[];

  @Column({ type: 'varchar' })
  status: string;

  @Column('decimal', { precision: 10, scale: 2, transformer: new DecimalColumnTransformer() })
  total: number;

  @Column({nullable: true})
  shippingAddress: string;

  @Column({nullable: true})
  invoiceAddress: string;

  @Column({nullable: true})
  invoiceAddressSetAt: Date;


  pay(){
    this.updatedAt = new Date()
    this.paidAt = new Date()
    this.status = Order.OrderType.Paid
  }

  setShippingAdress(data: ModifyLivraisonDTO){
    if(this.status != Order.OrderType.Created && this.status != Order.OrderType.Paid){
        throw new Error("Le commande n'est pas au bon status")
    }
    this.invoiceAddress = data.invoiceAddress
    this.shippingAddress = data.shippingAddress
    this.updatedAt = new Date()
    this.invoiceAddressSetAt = new Date()
  }
}
