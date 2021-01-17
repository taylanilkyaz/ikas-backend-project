import {Field, InputType, Int} from "type-graphql";

@InputType()
export class ProductInput {

    @Field()
    name: string;

    @Field()
    price: number;

    @Field()
    barcode: string;

    @Field(() => Int)
    quantity: number;
}