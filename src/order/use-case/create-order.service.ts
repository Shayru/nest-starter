import { Repository } from "typeorm";
import { OrderCreateDTO } from "../dto/order-create.dto";
import { Order } from "../entity/order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { GetProductByIdService } from "src/product/use-case/get-product-by-id.service";
import { OrderProduct } from "../entity/order-product.entity";
import { GetUserByIdService } from "src/user/use-case/get-user-by-id.service";

export class CreateOrderService{
    constructor(
        @InjectRepository(Order)
        private readonly repository: Repository<Order>,
        private readonly getUserByIdService: GetUserByIdService,
        private readonly getProductByIdService: GetProductByIdService
    ){}

    async create(createOrderData: OrderCreateDTO, userId: number): Promise<Order> {
        const user = await this.getUserByIdService.get(userId);
        const productId = createOrderData.product;
        const quantity = createOrderData.quantity;
        const foundOrder = await this.repository.findOne({
            where: { 
                status: Order.OrderType.Created,
                customer: { id: userId }
            },
            relations: ['products','products.product','customer']
        });
        let order;
        if(!foundOrder){
            order = new Order(user);
            order = await this.repository.save(order)

            const product = await this.getProductByIdService.getById(productId);
            if(!product){
                throw new Error('Produit Nok');
            }

            order.products = [new OrderProduct(product,quantity)];
            order.total = product.price * quantity;
        }  else{
            order = foundOrder
            let found = false
            foundOrder.products.forEach(orderProduct => {
                if(orderProduct.product.id == productId){
                    orderProduct.incrementQuantity(quantity)
                    found = true;
                    foundOrder.total = foundOrder.total + (orderProduct.product.price * quantity);
                }
            })
            if(!found){
                const product = await this.getProductByIdService.getById(productId);
                if(!product){
                    throw new Error('Produit Nok');
                }

                order.total = foundOrder.total + (product.price * quantity);
                order.products.push(new OrderProduct(product, quantity));
            }
        }
        return await this.repository.save(order);
    }
}