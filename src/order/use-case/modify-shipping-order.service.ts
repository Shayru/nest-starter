import { Repository } from "typeorm";
import { Order } from "../entity/order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { ModifyLivraisonDTO } from "../dto/modify-livraison.dto";


Injectable();
export class ModifyShippingOrderService{
    constructor(
        @InjectRepository(Order)
        private readonly repository: Repository<Order>
    ){}

    async modify(id: number, data: ModifyLivraisonDTO): Promise<Order> {
        const order = await this.repository.findOneBy({ id });
        order.setShippingAdress(data)

        return await this.repository.save(order);
    }
}