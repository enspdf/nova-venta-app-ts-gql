import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Buyer } from '../../entity/Buyer';
import { BuyerRepository } from './buyer.repository';
import { BuyerInput } from './input/BuyerInput.input';

@Service()
export class BuyerService {
    constructor(
        @InjectRepository()
        private readonly buyerRepository: BuyerRepository
    ) { }

    async createBuyer(name: string, active: boolean): Promise<Boolean> {
        try {
            await this.buyerRepository.insert({ name, active });
            return true;
        } catch {
            return false;
        }
    }

    async deleteBuyer(id: number): Promise<Boolean> {
        try {
            await this.buyerRepository.delete({ id });
            return true;
        } catch {
            return false;
        }
    }

    async updateBuyer(id: number, buyerInput: BuyerInput): Promise<Boolean> {
        try {
            const buyer = await this.buyerRepository.findOne({ where: { id } });
            const buyerToUpdate = { ...buyer, ...buyerInput };
            await this.buyerRepository.save(buyerToUpdate);
            return true;
        } catch {
            return false;
        }
    }

    async getAllBuyers(): Promise<Buyer[]> {
        let buyers: Buyer[] = [];

        try {
            buyers = await this.buyerRepository.find();
            return buyers;
        } catch {
            return buyers;
        }
    }

    async getBuyerById(id: number): Promise<Buyer> {
        let buyer: Buyer;

        try {
            buyer = await this.buyerRepository.findOne({ where: { id } });
            return buyer;
        } catch {
            return buyer;
        }
    }
}