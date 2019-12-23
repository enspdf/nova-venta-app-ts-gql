import { CreateVendorInput } from './input/CreateVendorInput.input';
import { VendorService } from './vendor.service';
import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Vendor } from "../../entity/Vendor";
import { Service } from 'typedi';

@Service()
@Resolver(of => Vendor)
export class VendorResolver {
    constructor(private readonly vendorService: VendorService) { }

    @Mutation(returns => Boolean)
    async createVendor(@Arg("input") createVendorInput: CreateVendorInput): Promise<Boolean> {
        const { name, active } = createVendorInput;
        return this.vendorService.createVendor(name, active);
    }

    @Query(returns => String)
    async HelloWorld(@Arg("name") name: string): Promise<String> {
        return `Hello World ${name}`;
    }
}