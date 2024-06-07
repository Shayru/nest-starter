import { Repository } from "typeorm";
import { OrderCreateDTO } from "../dto/order-create.dto";
import { Order } from "../entity/order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { GetCurrentUserService } from "src/user/use-case/get-current-user.service";
import { GetProductByIdService } from "src/product/use-case/get-product-by-id.service";
import { OrderProduct } from "../entity/order-product.entity";
import { OrderProductCreateDTO } from "../dto/order-product-create.dto";

export class CreateOrderService{
    constructor(
        @InjectRepository(Order)
        private readonly repository: Repository<Order>,
        private readonly getCurrentUserService: GetCurrentUserService,
        private readonly getProductByIdService: GetProductByIdService
    ){}

    async create(createOrderData: OrderCreateDTO, currentUser: number): Promise<Order> {
        console.log('startCreate');
        const user = await this.getCurrentUserService.get(currentUser);
        const id = createOrderData.product;
        const quantity = createOrderData.quantity;
        console.log('quantity');
        console.log(createOrderData.quantity);
        const foundOrder = await this.repository.findOne({
            where: { 
                status: Order.OrderType.Created,
                customer: { id: currentUser }
            },
            relations: ['products','products.product','customer']
        });
        let order;
        if(!foundOrder){
            console.log('notFound')
            order = new Order(user);
            order = await this.repository.save(order)

            const product = await this.getProductByIdService.getById(id);
            if(!product){
                throw new Error('Produit Nok');
            }
            
            const dto = new OrderProductCreateDTO();
            dto.product = product
            dto.quantity = quantity


            const orderProduct = new OrderProduct(dto)

            const newTotal = parseFloat(order.total) + parseFloat((product.price * quantity).toFixed(2));
            order.total = newTotal.toFixed(2);
            order.products = [orderProduct];
        }  else{
            console.log('found')
            console.log(foundOrder)
            console.log(foundOrder.products);
            order = foundOrder
            let found = false
            foundOrder.products.forEach(product => {
                console.log(product.product);
                console.log(id);
                console.log(quantity);
                if(product.product.id == id){
                    console.log('test');
                    console.log(quantity);
                    product.incrementQuantity(quantity)
                    found = true;
                    foundOrder.total = foundOrder.total - product.product.price * product.quantity
                }
            })
            if(!found){
                console.log('HEEEEEEEEEEEEEEEEEEEEERER')
                const product = await this.getProductByIdService.getById(id);
                if(!product){
                    throw new Error('Produit Nok');
                }
                
                const dto = new OrderProductCreateDTO();
                dto.product = product
                dto.quantity = quantity


                const orderProduct = new OrderProduct(dto)
                const newTotal = parseFloat(order.total) + parseFloat((product.price * quantity).toFixed(2));
                order.total = newTotal.toFixed(2);
                console.log(order.total);
                order.products.push(orderProduct);
            }
        }

        console.log("finalOrder: ")
        console.log(order);

        return await this.repository.save(order);
    }
}