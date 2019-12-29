import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { PaymentRepository } from "./payment.repository";
import { PaymentInput } from "./input/PaymentInput.input";
import { Payment } from "../../entity/Payment";
import { Campaign } from "../../entity/Campaign";
import { Vendor } from "../../entity/Vendor";
import { Buyer } from "../../entity/Buyer";
import { User } from "../../entity/User";
import { CampaignRepository } from "../campaign/campaign.repository";
import { VendorRepository } from "../vendor/vendor.repository";
import { BuyerRepository } from "../buyer/buyer.repository";
import { UserRepository } from "../user/user.repository";

@Service()
export class PaymentService {
    constructor(
        @InjectRepository()
        private readonly paymentRepository: PaymentRepository,

        @InjectRepository()
        private readonly campaignRepository: CampaignRepository,

        @InjectRepository()
        private readonly vendorRepository: VendorRepository,

        @InjectRepository()
        private readonly buyerRepository: BuyerRepository,

        @InjectRepository()
        private readonly userRepository: UserRepository
    ) { }

    async createPayment(paymentInput: PaymentInput): Promise<Boolean> {
        try {
            const campaign: Campaign = await this.campaignRepository.findOne({ where: { id: paymentInput.campaignId } });
            const vendor: Vendor = await this.vendorRepository.findOne({ where: { id: paymentInput.vendorId } });
            const buyer: Buyer = await this.buyerRepository.findOne({ where: { id: paymentInput.buyerId } });
            const user: User = await this.userRepository.findOne({ where: { id: paymentInput.userId } });

            await this.paymentRepository.create({
                ...paymentInput,
                campaign,
                vendor,
                buyer,
                user
            }).save();
        } catch (err) {
            console.log(err);
            return false;
        }

        return true;
    }

    async deletePayment(id: number): Promise<Boolean> {
        try {
            await this.paymentRepository.delete({ id });
        } catch (err) {
            console.log(err)
            return false;
        }

        return true;
    }

    async getAllPayments(campaignId: number | null): Promise<Payment[] | null> {
        try {
            const query = this.paymentRepository
                .createQueryBuilder("payment")
                .innerJoinAndSelect("payment.campaign", "campaign")
                .innerJoinAndSelect("payment.vendor", "vendor")
                .innerJoinAndSelect("payment.buyer", "buyer")
                .innerJoinAndSelect("payment.user", "user");

            if (campaignId) {
                query.where("campaign.id = :campaignId", { campaignId });
            }

            return await query.getMany();
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async getPaymentById(id: number): Promise<Payment | null> {
        try {
            return await this.paymentRepository
                .createQueryBuilder("payment")
                .innerJoinAndSelect("payment.campaign", "campaign")
                .innerJoinAndSelect("payment.vendor", "vendor")
                .innerJoinAndSelect("payment.buyer", "buyer")
                .innerJoinAndSelect("payment.user", "user")
                .where("payment.id = :paymentId", { paymentId: id })
                .getOne();
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}