import { CampaignInput } from './input/CampaignInput.input';
import { CampaignRepository } from './campaign.repository';
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Campaign } from '../../entity/Campaign';

@Service()
export class CampaignService {
    constructor(
        @InjectRepository()
        private readonly campaignRepository: CampaignRepository
    ) { }

    async createCampaign(name: string, startDate: Date, endDate: Date): Promise<Boolean> {
        try {
            await this.campaignRepository.insert({ name, startDate, endDate });
        } catch (err) {
            console.log(err);
            return false;
        }

        return true;
    }

    async deleteCampaign(id: number): Promise<Boolean> {
        try {
            await this.campaignRepository.delete({ id });
        } catch (err) {
            console.log(err);
            return false;
        }

        return true;
    }

    async updateCampaign(id: number, campaignInput: CampaignInput): Promise<Campaign | null> {
        const campaign = await this.campaignRepository.findOne({ where: { id } });
        return await this.campaignRepository.save({
            ...campaign,
            ...campaignInput
        });
    } catch(err) {
        console.log(err);
        return null;
    }

    async getAllCampaigns(): Promise<Campaign[] | null> {
        try {
            return await this.campaignRepository.find();
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async getCampaignById(id: number): Promise<Campaign | null> {
        try {
            return await this.campaignRepository.findOne({ where: { id } });
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}