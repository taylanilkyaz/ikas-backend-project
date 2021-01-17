import {BaseEntity, PrimaryGeneratedColumn} from "typeorm";
import {Field, Int, ObjectType} from "type-graphql";

@ObjectType()
export class BasicBaseEntity extends BaseEntity {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    //Id field common to all entities. Maybe createdAt or updatedAt can be added later.
    //For this reason, customBaseEntity was added to not include common fields in every entity.

}