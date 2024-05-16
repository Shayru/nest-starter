import { Repository } from "typeorm";
import { OrderCreateDTO } from "../dto/order-create.dto";
import { Order } from "../entity/order.entity";
import { InjectRepository } from "@nestjs/typeorm";

export class CreateOrderService{
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>
    ){}

    async create(createOrderData: OrderCreateDTO): Promise<Order> {
        const order = new Order(createOrderData);

        return this.orderRepository.save(order);
    }
}