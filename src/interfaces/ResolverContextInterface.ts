import { DbConnection } from "./DBConnectionInterface";
import { StringValueNode } from "graphql";
import { AuthUser } from "./AuthUserInterface";

export interface ResolverContext {
    db? : DbConnection,
    authorization? : string;
    user?: AuthUser
}