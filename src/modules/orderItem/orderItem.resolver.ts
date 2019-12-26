import { UpdateOrderItemInput } from './input/UpdateOrderItemInput.input';
import { OrderItemService } from './orderItem.service';
import { OrderItem } from './../../entity/OrderItem';
import { Service } from "typedi";
import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { OrderItemInput } from './input/OrderItemInput.input';

@Service()
@Resolver(of => OrderItem)
export class OrderItemResolver {
    constructor(private readonly orderItemService: OrderItemService) { }

    @Mutation(returns => Boolean)
    async createOrderItem(@Arg("input") orderItemInput: OrderItemInput): Promise<Boolean> {
        return this.orderItemService.createOrderItem(orderItemInput);
    }

    @Mutation(returns => Boolean)
    async deleteOrderItem(@Arg("id") id: number): Promise<Boolean> {
        return this.orderItemService.deleteOrderItem(id);
    }

    @Mutation(returns => OrderItem, { nullable: true })
    async updateOrderItem(@Arg("id") id: number, @Arg("input") updateOrderItemInput: UpdateOrderItemInput): Promise<OrderItem | null> {
        return this.orderItemService.updateOrderItem(id, updateOrderItemInput);
    }

    @Query(returns => [OrderItem], { nullable: true })
    async getAllOrderItems(): Promise<OrderItem[] | null> {
        return this.orderItemService.getAllOrderItems();
    }

    @Query(returns => OrderItem, { nullable: true })
    async getOrderItemById(@Arg("id") id: number): Promise<OrderItem | null> {
        return this.orderItemService.getOrderItemById(id);
    }
}