import { PaymentService } from './payment.service';
import { Service } from "typedi";
import { Payment } from "../../entity/Payment";
import { Resolver, Mutation, Arg, Query } from 'type-graphql';
import { PaymentInput } from './input/PaymentInput.input';

@Service()
@Resolver(of => Payment)
export class PaymentResolver {
    constructor(private readonly paymentService: PaymentService) { }

    @Mutation(returns => Boolean)
    async createPayment(@Arg("input") paymentInput: PaymentInput): Promise<Boolean> {
        return this.paymentService.createPayment(paymentInput);
    }

    @Mutation(returns => Boolean)
    async deletePayment(@Arg("id") id: number): Promise<Boolean> {
        return this.paymentService.deletePayment(id);
    }

    @Query(returns => [Payment], { nullable: true })
    async getAllPayments(@Arg("campaignId", { defaultValue: null }) campaignId: number): Promise<Payment[] | null> {
        return this.paymentService.getAllPayments(campaignId);
    }

    @Query(returns => Payment, { nullable: true })
    async getPaymentById(@Arg("id") id: number): Promise<Payment | null> {
        return this.paymentService.getPaymentById(id);
    }
}