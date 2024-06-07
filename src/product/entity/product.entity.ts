import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductCreateDto } from "../dto/product-create.dto";
import { OrderProduct } from "src/order/entity/order-product.entity";

@Entity()
export class Product {
    constructor(product: ProductCreateDto){
        if(product){
            this.title = product.title;
            this.price = product.price;
            this.description = product.description;
            this.image = product.image;
            this.color = product.color;
        }
    }

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar' })
    title: string;
  
    @Column('decimal', { precision: 10, scale: 2 })
    price: number;
  
    @Column({ type: 'varchar' })
    description: string;
  
    @Column({ type: 'varchar', nullable: true})
    image: string;
  
    @Column({ type: 'varchar', nullable: true })
    color: string;

    @OneToMany(() => OrderProduct, orderProduct => orderProduct.product)
    orderProduct: OrderProduct[];
}