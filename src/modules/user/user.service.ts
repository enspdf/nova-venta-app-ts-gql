import { UserInput } from './input/UserInput.input';
import { UserRepository } from './user.repository';
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { LoginResponse } from './response/LoginResponse.response';
import { compare, hash } from "bcryptjs";
import { User } from '../../entity/User';
import { createAccessToken } from "../../utils/Auth";

@Service()
export class UserService {
    constructor(
        @InjectRepository()
        private readonly userRepository: UserRepository
    ) { }

    async register(userInput: UserInput): Promise<Boolean> {
        const hashedPassword = await hash(userInput.password, 12);

        try {
            await this.userRepository.insert({ ...userInput, password: hashedPassword });
        } catch (err) {
            console.log(err);
            return false;
        }

        return true;
    }

    async login(email: string, password: string): Promise<LoginResponse | null> {
        const user = await this.userRepository.findOne({ where: { email } });

        if (!user) {
            return null;
        }

        const valid = await compare(password, user.password);

        if (!valid) {
            return null;
        }

        return {
            accessToken: createAccessToken(user),
            user
        };
    }

    async profile(id: number): Promise<User | null> {
        try {
            return await this.userRepository.findOne({ where: { id } });
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}