import { ComposableResolver } from "./composable.resolver";
import { ResolverContext } from "../../interfaces/ResolverContextInterface"
import { GraphQLFieldResolver } from "graphql";
export const authResolver: ComposableResolver<any, ResolverContext> =
    (resolver: GraphQLFieldResolver<any, ResolverContext>): GraphQLFieldResolver<any, ResolverContext> => {

        return (parent, args, context: ResolverContext, info) => {
            console.log(context.context)
            console.log('context-usert', context.context.user)
            console.log('context-usert', context.context.authorization)
            console.log('context',context.context)

            if(context.context.user || context.context.authorization) {
                console.log('AQUI NE ?')
                return resolver(parent, args, context.context, info)
            }

            throw new Error("unauthorized! Token not provide")
        };
    }
