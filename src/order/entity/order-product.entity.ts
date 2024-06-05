import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "src/product/entity/product.entity";
import { int } from "aws-sdk/clients/datapipeline";
import { OrderProductCreateDTO } from "../dto/order-product-create.dto";

@Entity()
export class OrderProduct {
    constructor(data: OrderProductCreateDTO){
        if(data){
            this.product = data.product;
            this.order = data.order;
            if(data.quantity){
                this.quantity = data.quantity
            } else {
                this.quantity = 1;
            }
        }
    }

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'int' })
    quantity: number;

    @ManyToOne(() => Product, (product) => product.id)
    product: Product

    @ManyToOne(() => Order, (order) => order.products)
    order: Order

    decrementQuantity(){
        this.quantity --
    }
    
    incrementQuantity(number?: int){
        if(number) {
            this.quantity += number
        } else {
            this.quantity ++
        }
    }
}