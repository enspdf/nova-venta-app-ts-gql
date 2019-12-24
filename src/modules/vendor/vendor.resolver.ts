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

    @Mutation(returns => Vendor, { nullable: true })
    async updateVendor(@Arg("id") id: number, @Arg("input") vendorInput: VendorInput): Promise<Vendor | null> {
        return this.vendorService.updateVendor(id, vendorInput);
    }

    @Query(returns => [Vendor], { nullable: true })
    async getAllVendors(): Promise<Vendor[] | null> {
        return this.vendorService.getAllVendors();
    }

    @Query(returns => Vendor, { nullable: true })
    async getVendorById(@Arg("id") id: number): Promise<Vendor | null> {
        return this.vendorService.getVendorById(id);
    }
}