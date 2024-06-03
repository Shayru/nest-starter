import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class OrderItem {
    constructor(product: string){
        if(product !== null && product !== ''){
            this.product = product
            this.quantity = 1
            this.price = 10
        }
    }

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar' })
    product: string;
  
    @Column({ type: 'int' })
    quantity: number;
  
    @Column({ type: 'int' })
    price: number;

    @ManyToOne(() => Order, (order) => order.items)
    order: Order


    incrementQuantity(){
        this.quantity ++
    }
}