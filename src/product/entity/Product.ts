import {Field, Int, ObjectType} from "type-graphql";
import {Column, Entity} from "typeorm";
import {BasicBaseEntity} from "../../BasicBaseEntity";

@ObjectType()
@Entity("products")
export class Product extends BasicBaseEntity {

    @Field(() => Int)
    @Column()
    userId: number;

    @Field()
    @Column("text")
    name: string;

    @Field(() => Int)
    @Column()
    price: number;

    @Field()
    @Column("text")
    barcode: string;

    @Field(() => Int)
    @Column()
    quantity: number;

}


