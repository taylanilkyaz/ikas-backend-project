import {isAuth} from '../middleware/isAuth';
import {IPayload} from '../Interface';
import {Product} from './entity/Product';
import {Arg, Ctx, Mutation, Query, Resolver, UseMiddleware, Int} from "type-graphql";
import {ProductInput} from "./models";
import {ApolloError} from "apollo-server-express";

@Resolver()
export class ProductResolver {

    @Query(() => [Product])
    @UseMiddleware(isAuth)
    async products(@Ctx() {payload}: { payload: IPayload }) {
        return await Product.find({where: {userId: payload?.userId}} as Partial<Product>);
    }

    @Query(() => Product)
    @UseMiddleware(isAuth)
    async getProductDetails(
        @Ctx() {payload}: { payload: IPayload },
        @Arg("id", () => Int) id: number,
    ) {
        const product = await Product.findOne({where: {id}} as Partial<Product>);
        if (!product || product.userId !== payload?.userId) {
            throw new ApolloError("You do not have a product with this id.", "INVALID_USER_PRODUCT");
        }
        return product;
    }

    @Mutation(() => Product)
    @UseMiddleware(isAuth)
    async addProduct(
        @Arg("product", () => ProductInput) product: ProductInput,
        @Ctx() {payload}: { payload: IPayload }) {

        const userId = payload?.userId;
        try {
            return await Product.create({...product, userId: userId} as Partial<Product>).save();
        } catch (err) {
            throw new ApolloError("Product couldn't add.", "DATABASE_ERROR");
        }
    }

    @Mutation(() => Product)
    @UseMiddleware(isAuth)
    async updateProduct(
        @Arg("id", () => Int) id: number,
        @Arg("input", () => ProductInput) input: ProductInput,
        @Ctx() {payload}: { payload: IPayload }) {

        const product = await Product.findOne({where: {id}} as Partial<Product>);
        if (product?.userId !== payload?.userId) {
            throw new ApolloError("You cannot delete someone else's products.", "INVALID_USER_PRODUCT");
        }

        try {
            await Product.update({id}, {...input});
            return {id, ...input};
        } catch (err) {
            throw new ApolloError("Update process is invalid.", "UPDATE_PRODUCT_ERROR")
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteProduct(
        @Arg("id", () => Int) id: number,
        @Ctx() {payload}: { payload: IPayload }) {

        const product = await Product.findOne({where: {id}} as Partial<Product>);
        if (product?.userId !== payload?.userId) {
            throw new ApolloError("You cannot delete someone else's products.", "INVALID_USER_PRODUCT");
        }
        await Product.delete({id});
        return true;
    }
}
