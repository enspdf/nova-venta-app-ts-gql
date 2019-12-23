import { Service } from "typedi";
import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { Buyer } from "../../entity/Buyer";
import { BuyerService } from "./buyer.service";
import { BuyerInput } from "./input/BuyerInput.input";

@Service()
@Resolver(of => Buyer)
export class BuyerResolver {
    constructor(private readonly buyerService: BuyerService) { }

    @Mutation(returns => Boolean)
    async createBuyer(@Arg("input") buyerInput: BuyerInput): Promise<Boolean> {
        const { name, active } = buyerInput;
        return this.buyerService.createBuyer(name, active);
    }

    @Mutation(returns => Boolean)
    async deleteBuyer(@Arg("id") id: number): Promise<Boolean> {
        return this.buyerService.deleteBuyer(id);
    }

    @Mutation(returns => Boolean)
    async updateBuyer(@Arg("id") id: number, @Arg("input") buyerInput: BuyerInput): Promise<Boolean> {
        return this.buyerService.updateBuyer(id, buyerInput);
    }

    @Query(returns => [Buyer])
    async getAllBuyers(): Promise<Buyer[]> {
        return this.buyerService.getAllBuyers();
    }

    @Query(returns => Buyer)
    async getBuyerById(@Arg("id") id: number): Promise<Buyer> {
        return this.buyerService.getBuyerById(id);
    }
}