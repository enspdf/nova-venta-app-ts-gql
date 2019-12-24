import { CampaignInput } from './input/CampaignInput.input';
import { CampaignService } from './campaign.service';
import { Campaign } from './../../entity/Campaign';
import { Service } from "typedi";
import { Resolver, Mutation, Arg, Query } from "type-graphql";

@Service()
@Resolver(of => Campaign)
export class CampaignResolver {
    constructor(private readonly campaignService: CampaignService) { }

    @Mutation(returns => Boolean)
    async createCampaign(@Arg("input") campaignInput: CampaignInput): Promise<Boolean> {
        const { name, startDate, endDate } = campaignInput;
        return this.campaignService.createCampaign(name, startDate, endDate);
    }

    @Mutation(returns => Boolean)
    async deleteCampaign(@Arg("id") id: number): Promise<Boolean> {
        return this.campaignService.deleteCampaign(id);
    }

    @Mutation(returns => Campaign, { nullable: true })
    async updateCampaign(@Arg("id") id: number, @Arg("input") campaignInput: CampaignInput): Promise<Campaign | null> {
        return this.campaignService.updateCampaign(id, campaignInput);
    }

    @Query(returns => [Campaign], { nullable: true })
    async getAllCampaigns(): Promise<Campaign[] | null> {
        return this.campaignService.getAllCampaigns();
    }

    @Query(returns => Campaign, { nullable: true })
    async getCampaignById(@Arg("id") id: number): Promise<Campaign | null> {
        return this.campaignService.getCampaignById(id);
    }
}