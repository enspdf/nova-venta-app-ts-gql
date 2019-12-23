import { Buyer } from "../../entity/Buyer";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Buyer)
export class BuyerRepository extends Repository<Buyer>{ }