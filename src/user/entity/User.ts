import {Entity, Column, Index} from "typeorm";
import {ObjectType, Field} from "type-graphql";
import {IsEmail} from "class-validator";
import {BasicBaseEntity} from "../../BasicBaseEntity";

@ObjectType()
@Entity("users")
export class User extends BasicBaseEntity {

    @Field()
    @Column("text")
    name: string;

    @Field()
    @Column("text")
    surname: string;

    @Field()
    @Column("text")
    @Index({unique: true})
    @IsEmail()
    email: string;

    @Column("text")
    password: string;

}