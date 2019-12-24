import { EntityRepository, Repository } from "typeorm";
import { Campaign } from "../../entity/Campaign";

@EntityRepository(Campaign)
export class CampaignRepository extends Repository<Campaign> { }