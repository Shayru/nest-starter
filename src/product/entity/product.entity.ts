import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ProductCreateDto } from "../dto/product-create.dto";

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
  
    @Column({ type: 'int' })
    price: number;
  
    @Column({ type: 'varchar' })
    description: string;
  
    @Column({ type: 'varchar', nullable: true})
    image: string;
  
    @Column({ type: 'varchar', nullable: true })
    color: string;
}