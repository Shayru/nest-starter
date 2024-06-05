import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderCreateDTO } from '../dto/order-create.dto';
import { ModifyLivraisonDTO } from '../dto/modify-livraison.dto';
import { ModifyInvoiceDTO } from '../dto/modify-invoice.dto';
import { User } from 'src/user/entity/user.entity';
import { OrderProduct } from './order-product.entity';
import { OrderProductCreateDTO } from '../dto/order-product-create.dto';
import { Product } from 'src/product/entity/product.entity';


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
      this.total = 0;
    }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.id, {cascade: true})
  customer: User;
  
  @Column({nullable: true})
  paidAt: Date;

  @OneToMany(() => OrderProduct, (order) => order.id, {nullable: true,  cascade: true})
  products: OrderProduct[];

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

  // addOrderItems(data: OrderCreateDTO){
  //   if(data){ 
  //     this.items = []
  //     if(data.items.length > 3) {
  //         throw new Error("trop d'items");
  //     }

  //     for (var item of data.items) {
  //       const itemSave = new OrderItem(item);

  //       let exist = false;
  //       for(var orderItem of this.items){
  //         if(orderItem.product == itemSave.product){
  //             orderItem.quantity ++
  //             this.total += orderItem.price
  //             exist = true;
  //         }
  //       }
  //       if(!exist){
  //           this.items.push(itemSave)
  //           this.total += itemSave.price
  //           this.updatedAt = new Date()
  //       }
  //     }
  //   }
  // }


  createOrderProducts(data: OrderCreateDTO) {
    this.products = []

    data.products.map(product => {
        console.log("Checking : " + product)
        const existingOrderProduct = this.getOrderProductWithProduct(product);
        if (existingOrderProduct) {
          console.log("ProductExist")
          existingOrderProduct.incrementQuantity()
        } else {
          console.log("Product Doesn't Exist")
            const orderProduct = new OrderProductCreateDTO;
            orderProduct.order = this;
            orderProduct.product = product;
            console.log(orderProduct);

            const newProduct = (new OrderProduct(orderProduct));
            console.log("created OrderProduct")
            // console.log(newProduct);
            this.products.push(newProduct)
        }
    });
}

private getOrderProductWithProduct(product: Product): OrderProduct {
    this.products.forEach((p) => {
      if(p.product === product ){
          console.log("is Found")
      } else{
        console.log("not found")
      }
    })
    return this.products.find((itemProduct) => {
        // console.log(itemProduct)
        return itemProduct.product === product;
    });
}

}
