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
            return true;
        } catch {
            return false;
        }
    }

    async deleteVendor(id: number): Promise<Boolean> {
        try {
            await this.vendorRepository.delete({ id });
            return true;
        } catch {
            return false;
        }
    }

    async updateVendor(id: number, vendorInput: VendorInput): Promise<Boolean> {
        try {
            const vendor = await this.vendorRepository.findOne({ where: { id } });
            const vendorToUpdate = { ...vendor, ...vendorInput };
            await this.vendorRepository.save(vendorToUpdate);
            return true;
        } catch {
            return false;
        }
    }

    async getAllVendors(): Promise<Vendor[]> {
        let vendors: Vendor[] = []

        try {
            vendors = await this.vendorRepository.find();
            return vendors;
        } catch {
            return vendors;
        }
    }

    async getVendorById(id: number): Promise<Vendor> {
        let vendor: Vendor;

        try {
            vendor = await this.vendorRepository.findOne({ where: { id } });
            return vendor;
        } catch {
            return vendor;
        }
    }
}