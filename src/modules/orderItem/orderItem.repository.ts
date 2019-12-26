import { OrderItem } from './../../entity/OrderItem';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(OrderItem)
export class OrderItemRepository extends Repository<OrderItem> { }