import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Vendor } from '../../entity/Vendor';
import { VendorInput } from './input/VendorInput.input';
import { VendorRepository } from './vendor.repository';

@Service()
export class VendorService {
    constructor(
        @InjectRepository()
        private readonly vendorRepository: VendorRepository
    ) { }

    async createVendor(name: string, active: boolean): Promise<Boolean> {
        try {
            await this.vendorRepository.insert({ name, active });
        } catch (err) {
            console.log(err);
            return false;
        }

        return true;
    }

    async deleteVendor(id: number): Promise<Boolean> {
        try {
            await this.vendorRepository.delete({ id });
        } catch (err) {
            console.log(err);
            return false;
        }

        return true;
    }

    async updateVendor(id: number, vendorInput: VendorInput): Promise<Vendor | null> {
        try {
            const vendor = await this.vendorRepository.findOne({ where: { id } });
            return await this.vendorRepository.save({
                ...vendor,
                ...vendorInput
            });
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async getAllVendors(): Promise<Vendor[] | null> {
        try {
            return await this.vendorRepository.find();
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async getVendorById(id: number): Promise<Vendor | null> {
        try {
            return await this.vendorRepository.findOne({ where: { id } });
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}