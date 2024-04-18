import { ObjectId } from "mongoose"

declare global {
    interface Product {
        // map(arg0: (i: any) => import("react").JSX.Element): import("react").ReactNode
        _id: string
        userId: string
        productName: string
        description: string
        brand: string
        categories: string[]
        price?: number
        inventory: number
        images: string[]
        thumbnail: string
    }
    type ProductWithUsername = Product & {user: {username: string}}
    
}
