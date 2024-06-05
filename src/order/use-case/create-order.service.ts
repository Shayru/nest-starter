import { Repository } from "typeorm";
import { OrderCreateDTO } from "../dto/order-create.dto";
import { Order } from "../entity/order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { GetCurrentUserService } from "src/user/use-case/get-current-user.service";

export class CreateOrderService{
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        private readonly getCurrentUserService: GetCurrentUserService
    ){}

    async create(createOrderData: OrderCreateDTO): Promise<Order> {
        const user = await this.getCurrentUserService.get();
        const order = new Order(user);
        this.orderRepository.save(order)
        console.log("order created")
        console.log(order);
        console.log("creating Products")
        order.createOrderProducts(createOrderData);
        console.log("----------------FINAL ORDER ----------------------")
        console.log(order);
        this.orderRepository.save(order)

        return order;
    }
}