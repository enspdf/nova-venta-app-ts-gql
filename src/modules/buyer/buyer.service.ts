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
        } catch (err) {
            console.log(err);
            return false;
        }

        return true;
    }

    async deleteBuyer(id: number): Promise<Boolean> {
        try {
            await this.buyerRepository.delete({ id });
        } catch (err) {
            console.log(err);
            return false;
        }

        return true;
    }

    async updateBuyer(id: number, buyerInput: BuyerInput): Promise<Buyer | null> {
        try {
            const buyer = await this.buyerRepository.findOne({ where: { id } });
            return await this.buyerRepository.save({
                ...buyer,
                ...buyerInput
            })
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async getAllBuyers(): Promise<Buyer[] | null> {
        try {
            return await this.buyerRepository.find();
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async getBuyerById(id: number): Promise<Buyer | null> {
        try {
            return await this.buyerRepository.findOne({ where: { id } });
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}