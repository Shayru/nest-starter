import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OrderCreateDTO } from '../dto/order-create.dto';

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
            this.status = 'Cart',
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

}
