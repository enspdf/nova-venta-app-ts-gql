import { VendorRepository } from './vendor.repository';
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";

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
}