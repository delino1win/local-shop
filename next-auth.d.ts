import { DefaultUser, DefaultSession } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";
import {params} from "next-auth/redirect"

declare module "next-auth" {
    interface Session {
        user: {
            id: string,
            role: string,
            username: string
        } & DefaultSession
    }

    interface User extends DefaultUser {
        username: string,
        role: string
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string,
        name: string,
        role: string
    }
}

// declare module "next-auth/redirect" {
//     interface params {
//         url: string,
//         baseUrl: string
//     }
// }