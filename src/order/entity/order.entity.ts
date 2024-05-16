import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OrderCreateDTO } from '../dto/order-create.dto';
import { ModifyLivraisonDTO } from '../dto/modify-livraison.dto';
import { ModifyInvoiceDTO } from '../dto/modify-invoice.dto';

enum OrderType {
    Created = "created",
    Paid = "paid",
  }
   

@Entity()
export class Order {


    constructor(orderCreateData?: OrderCreateDTO){
        if(orderCreateData){
            if(orderCreateData.items.length > 3) {
                throw new Error("trop dd'items");
            }
    
            this.items = orderCreateData.items,
            this.createdAt = new Date(),
            this.updatedAt = new Date(),
            this.customer = 'test',
            this.paidAt = null,
            this.status = OrderType.Created,
            this.total = 10 * orderCreateData.items.length
        }
    }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  customer: string;
  
  @Column({nullable: true})
  paidAt: Date;

  @Column({ type: 'json'})
  items: string[];

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'int' })
  total: number;

  @Column({nullable: true})
  shippingAddress: string;

  @Column({nullable: true})
  shippingMethod: string;

  @Column({nullable: true})
  invoiceAddress: string;

  @Column({nullable: true})
  shippingMethodSetAt: Date;

  @Column({nullable: true})
  invoiceAddressSetAt: Date;


  pay(){
    this.updatedAt = new Date()
    this.paidAt = new Date()
    this.status = OrderType.Paid
  }

  setShippingAdress(data: ModifyLivraisonDTO){
    if(this.invoiceAddress == null){
        this.invoiceAddress = data.shippingAddress
        this.invoiceAddressSetAt = new Date()
    }
    this.shippingAddress = data.shippingAddress
    this.shippingMethod = data.shippingMethod
    this.shippingMethodSetAt = new Date()
    this.updatedAt = new Date()
  }

  setInvoiceAdress(data: ModifyInvoiceDTO){
    this.invoiceAddress = data.invoiceAddress
    this.invoiceAddressSetAt = new Date()
    this.updatedAt = new Date()
  }

}
