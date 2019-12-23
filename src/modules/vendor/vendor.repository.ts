import { Vendor } from "../../entity/Vendor";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Vendor)
export class VendorRepository extends Repository<Vendor> { }