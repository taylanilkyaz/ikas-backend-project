import {hash, compare} from "bcryptjs";
import {User} from "./entity/User";
import {
    Resolver,
    Query,
    Mutation,
    Arg,
} from "type-graphql";
import {createAccessToken, createRefreshToken} from '../utils/authenticationUtils';
import {LoginInput, LoginResponse, RefreshTokenResponse, UserInput} from "./models";
import {ApolloError} from "apollo-server-express";
import {verify} from "jsonwebtoken";

@Resolver()
export class UserResolver {
    @Query(() => [User])
    users() {
        return User.find();
    }

    @Mutation(() => User)
    async register(
        @Arg("user", () => UserInput) user: UserInput,
    ) {
        const hashedPassword = await hash(user.password, 12);

        try {
            return await User.create({...user, password: hashedPassword} as Partial<User>).save();
        } catch (err) {
            throw new ApolloError(err, "BAD_USER_INPUT")
        }
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg("loginUser", () => LoginInput) loginUser: LoginInput): Promise<LoginResponse> {

        const user = await User.findOne({where: {email: loginUser.email}});
        if (!user) throw new ApolloError("Couldn't find user", "USER_NOT_FOUND");

        const valid = await compare(loginUser.password, user.password);
        if (!valid) throw new ApolloError("Wrong password", "WRONG_PASSWORD");

        return {
            accessToken: createAccessToken(user),
            refreshToken: createRefreshToken(user)
        };
    }

    @Mutation(() => RefreshTokenResponse)
    async refreshToken(
        @Arg("refreshToken") refreshToken: string): Promise<RefreshTokenResponse> {

        let payload: any = null;
        try {
            payload = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
        } catch (err) {
            throw new ApolloError("Invalid refresh token", "INVALID_REFRESH_TOKEN")
        }

        const user = await User.findOne({id: payload.userId});
        if (!user) throw new ApolloError("couldn't find user", "USER_NOT_FOUND");

        return {
            accessToken: createAccessToken(user)
        };
    }

}