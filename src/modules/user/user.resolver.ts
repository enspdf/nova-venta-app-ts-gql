import { UserInput } from './input/UserInput.input';
import { UserService } from './user.service';
import { User } from './../../entity/User';
import { Service } from "typedi";
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { LoginResponse } from './response/LoginResponse.response';

@Service()
@Resolver(of => User)
export class UserResolver {
    constructor(private readonly userService: UserService) { }

    @Mutation(returns => Boolean)
    async register(@Arg("input") userInput: UserInput): Promise<Boolean> {
        return this.userService.register(userInput);
    }

    @Mutation(returns => LoginResponse)
    async login(@Arg("email") email: string, @Arg("password") password: string): Promise<LoginResponse | null> {
        return this.userService.login(email, password);
    }

    @Query(returns => User, { nullable: true })
    async profile(@Arg("id") id: number): Promise<User | null> {
        return this.userService.profile(id);
    }
}