import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderCreateDTO } from '../dto/order-create.dto';
import { ModifyLivraisonDTO } from '../dto/modify-livraison.dto';
import { ModifyInvoiceDTO } from '../dto/modify-invoice.dto';
import { OrderItem } from './order-item.entity';


@Entity()
export class Order {

    static OrderType =  {
        Created: "created",
        Paid: "paid",
      }
      
    constructor(data: OrderCreateDTO){
      if(data){
        this.createOrderItems(data);
        this.total = data.items.length * 10
      }
      this.createdAt = new Date(),
      this.updatedAt = new Date(),
      this.customer = 'test',
      this.paidAt = null,
      this.status = Order.OrderType.Created
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

  @OneToMany(() => OrderItem, (order) => order.id, {nullable: true,  cascade: true})
  items: OrderItem[];
  // @Column({ type: 'json' })
  // items: string[];

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
    this.status = Order.OrderType.Paid
  }

  setShippingAdress(data: ModifyLivraisonDTO){
    if(this.status != Order.OrderType.Created && this.status != Order.OrderType.Paid){
        throw new Error("Le commande n'est pas au bon status")
    }
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
    if(this.status != Order.OrderType.Created && this.status != Order.OrderType.Paid){
        throw new Error("Le commande n'est pas au bon status")
    }
    this.invoiceAddress = data.invoiceAddress
    this.invoiceAddressSetAt = new Date()
    this.updatedAt = new Date()
  }

  addOrderItems(data: OrderCreateDTO){
    if(data){ 
      this.items = []
      if(data.items.length > 3) {
          throw new Error("trop d'items");
      }

      for (var item of data.items) {
        const itemSave = new OrderItem(item);

        let exist = false;
        for(var orderItem of this.items){
          if(orderItem.product == itemSave.product){
              orderItem.quantity ++
              this.total += orderItem.price
              exist = true;
          }
        }
        if(!exist){
            this.items.push(itemSave)
            this.total += itemSave.price
            this.updatedAt = new Date()
        }
      }
    }
  }


  private createOrderItems(data: OrderCreateDTO) {
    this.items = []

    data.items.map(item => {
        const existingOrderItem = this.getOrderItemWithProduct(item);
        if (existingOrderItem) {
            existingOrderItem.incrementQuantity()
        } else {
            const newOrderItem = (new OrderItem(item));
            this.items.push(newOrderItem)
        }
    });
}

private getOrderItemWithProduct(product: string): OrderItem {
    return this.items.find((item) => {
        console.log(item.product)
        return item.product === product;
    });
}

}
