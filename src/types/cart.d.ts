import { ObjectId } from "mongoose"

declare global {
    interface Cart {
        buyerId: string //Customer identification who adds the item to cart
        productId: string //Product identification that is being added
        totalItem: number //amount of items that is adde
    }
    interface CartList extends Cart {product: {
        _id: string
        userId: string
        productName: string
        brand: string
        categories: string[]
        inventory: number
        price: string
        images: string[]
        user: {
            username: string
        }
    }
    }
}