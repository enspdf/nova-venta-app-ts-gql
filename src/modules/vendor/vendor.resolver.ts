import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

import { Vendor } from '../../entity/Vendor';
import { VendorInput } from './input/VendorInput.input';
import { VendorService } from './vendor.service';

@Service()
@Resolver(of => Vendor)
export class VendorResolver {
    constructor(private readonly vendorService: VendorService) { }

    @Mutation(returns => Boolean)
    async createVendor(@Arg("input") vendorInput: VendorInput): Promise<Boolean> {
        const { name, active } = vendorInput;
        return this.vendorService.createVendor(name, active);
    }

    @Mutation(returns => Boolean)
    async deleteVendor(@Arg("id") id: number): Promise<Boolean> {
        return this.vendorService.deleteVendor(id);
    }

    @Mutation(returns => Boolean)
    async updateVendor(@Arg("id") id: number, @Arg("input") vendorInput: VendorInput) {
        return this.vendorService.updateVendor(id, vendorInput);
    }

    @Query(returns => [Vendor])
    async getAllVendors(): Promise<Vendor[]> {
        return this.vendorService.getAllVendors();
    }

    @Query(returns => Vendor)
    async getVendorById(@Arg("id") id: number): Promise<Vendor> {
        return this.vendorService.getVendorById(id);
    }
}