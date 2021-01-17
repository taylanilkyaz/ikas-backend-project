import {Field, InputType, ObjectType} from "type-graphql";
import {IsEmail} from "class-validator";

@InputType()
export class UserInput {

    @Field()
    name: string;

    @Field()
    surname: string;

    @IsEmail()
    @Field()
    email: string;

    @Field()
    password: string;
}

@InputType()
export class LoginInput {
    @Field()
    email: string;

    @Field()
    password: string;
}


@ObjectType()
export class LoginResponse {
    @Field()
    accessToken: string;

    @Field()
    refreshToken: string;
}

@ObjectType()
export class RefreshTokenResponse {
    @Field()
    accessToken: string;
}

