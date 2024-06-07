import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "src/product/entity/product.entity";
import { int } from "aws-sdk/clients/datapipeline";
import { OrderProductCreateDTO } from "../dto/order-product-create.dto";
import { ModifyOrderProductQuantityDTO } from "../dto/modify-order-product-quantity.dto";

@Entity()
export class OrderProduct {
    constructor(data: OrderProductCreateDTO){
        if(data){
            this.product = data.product;
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

    @ManyToOne(() => Product)
    product: Product;
  
    @ManyToOne(() => Order, (order) => order.products)
    order: Order;

    decrementQuantity(number?: int){
        if(number) {
            this.quantity = this.quantity - number
        } else {
            this.quantity ++
        }
    }
    
    incrementQuantity(number?: int){
        console.log(number);
        console.log(this.quantity);
        if(number) {
            this.quantity = this.quantity + number
        } else {
            this.quantity ++
        }
    }

    isChangeDelete(data: ModifyOrderProductQuantityDTO){
        return !data.increase && this.quantity - data.quantity <= 0;
    }

    changeQuantity(data: ModifyOrderProductQuantityDTO){
        if(data.increase){
            this.incrementQuantity(data.quantity);
        } else {
            this.decrementQuantity(data.quantity);
        }
    }
}