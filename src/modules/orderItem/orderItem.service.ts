import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { UserRepository } from '../user/user.repository';
import { Buyer } from './../../entity/Buyer';
import { Campaign } from './../../entity/Campaign';
import { OrderItem } from './../../entity/OrderItem';
import { Vendor } from './../../entity/Vendor';
import { BuyerRepository } from './../buyer/buyer.repository';
import { CampaignRepository } from './../campaign/campaign.repository';
import { VendorRepository } from './../vendor/vendor.repository';
import { OrderItemInput } from './input/OrderItemInput.input';
import { UpdateOrderItemInput } from './input/UpdateOrderItemInput.input';
import { OrderItemRepository } from './orderItem.repository';
import { User } from '../../entity/User';

@Service()
export class OrderItemService {
    constructor(
        @InjectRepository()
        private readonly orderItemRepository: OrderItemRepository,

        @InjectRepository()
        private readonly campaignRepository: CampaignRepository,

        @InjectRepository()
        private readonly vendorRepository: VendorRepository,

        @InjectRepository()
        private readonly buyerRepository: BuyerRepository,

        @InjectRepository()
        private readonly userRepository: UserRepository
    ) { }

    async createOrderItem(orderItemInput: OrderItemInput): Promise<Boolean> {
        try {
            const campaign: Campaign = await this.campaignRepository.findOne({ where: { id: orderItemInput.campaignId } });
            const vendor: Vendor = await this.vendorRepository.findOne({ where: { id: orderItemInput.vendorId } });
            const buyer: Buyer = await this.buyerRepository.findOne({ where: { id: orderItemInput.buyerId } });
            const user: User = await this.userRepository.findOne({ where: { id: orderItemInput.userId } });

            await this.orderItemRepository.create({
                ...orderItemInput,
                campaign,
                vendor,
                buyer,
                user
            }).save();
        } catch (err) {
            console.log(err);
            return false;
        }

        return true;
    }

    async deleteOrderItem(id: number): Promise<Boolean> {
        try {
            await this.orderItemRepository.delete({ id });
        } catch (err) {
            console.log(err);
            return false;
        }

        return true;
    }

    async updateOrderItem(id: number, updateOrderItemInput: UpdateOrderItemInput): Promise<OrderItem | null> {
        try {
            const orderItem = this.orderItemRepository.findOne({ where: { id } });
            return await this.orderItemRepository.save({
                ...orderItem,
                ...updateOrderItemInput
            });
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async getAllOrderItems(): Promise<OrderItem[] | null> {
        try {
            return await this.orderItemRepository.find();
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async getOrderItemById(id: number): Promise<OrderItem | null> {
        try {
            return await this.orderItemRepository.findOne({ where: { id } });
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}