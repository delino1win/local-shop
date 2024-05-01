import { options } from "@/app/api/auth/[...nextauth]/options";
import connectMongoDataBase from "@/libs/mongodb";
import BuyerCart from "@/models/buyer_cart";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET () {

    const session = await getServerSession(options);

    // console.log("session for cart api: ",session)

    if(!session) return NextResponse.json({message: "You must Login First!"})

    if(session?.user?.role !== "buyer")
        return NextResponse.json({message: "You must be a Buyer!"})

    try {
        await connectMongoDataBase();
        // const checkBuyerCart = await BuyerCart.find({buyerId: session?.user?.id})
        // console.log("check buyer cart: ",checkBuyerCart)
        
        const listCart = await BuyerCart.find({buyerId: session?.user?.id}).populate<Product>({
        path: 'product',
            options: {
                select: 'userId productName inventory price images',
                populate: {
                    path: "user",
                    select: "username"
            }}
        }).lean();

        // console.log("user list cart: ", listCart)

        if(!listCart) return NextResponse.json({message: "You do not have Item to Buy!!"});

        return NextResponse.json(listCart)
    } catch (error) {
        console.log(error)
    }
}

export async function POST (request: NextRequest) { //buyer add 1 item/product 
    connectMongoDataBase();
    const session = await getServerSession(options);

    console.log("session for cart api: ",session)

    const {productId, totalItem} = await request.json();

    if(session?.user?.role !== "buyer")
        return NextResponse.json({message: "You must be a Buyer!"})

    try {
        const addItemToCart = await BuyerCart.create({
            buyerId: session?.user?.id,
            productId,
            totalItem
        })

        return NextResponse.json(addItemToCart)
    } catch (error) {
        console.log(error)
    }
}

export async function DELETE () {
    await connectMongoDataBase();

    try {
        await BuyerCart.findByIdAndDelete
    } catch (error) {
        console.log(error)
    }
}

// interface GetBuyerCartDetail extends Cart{
//     product: Product[]
// }

// export async function GET () {

    
//     connectMongoDataBase();

//     const session = await getServerSession(options);

//     // console.log("session for cart api: ",session)

//     if(!session) return NextResponse.json({message: "You must Login First!"})

//     if(session?.user?.role !== "buyer")
//         return NextResponse.json({message: "You must be a Buyer!"})

//     try {

//         const getBuyerDetail : GetBuyerCartDetail = await BuyerCart.find({buyerId: session?.user?.id}).populate<Product>({
//             path: 'product',
//                 options: {
//                     select: 'userId'
//                 }
//             }).lean();
        
//         if(!getBuyerDetail) return 
        
//         console.log("get buyer detail:", getBuyerDetail)

//         const {product} = getBuyerDetail

//         const getSellerId = product.map(prod => {
//             if(prod) return prod.userId.toString()
//         })
        
//         console.log("\nget seller id:", getSellerId.toString())

//         const user: Product & {user: User} = await Product.findOne({userId: getSellerId}).populate<Product>({
//             path: 'user',
//             options: {
//                 select: 'username'
//             }
//         }).lean()
        
//         if(!user) return 

//         console.log("\ngetSellerUsername: ", user) //

//         const getListCart = await BuyerCart.find({buyerId: session?.user?.id}).populate<Product>({
//         path: 'product',
//             options: {
//                 select: 'userId productName price images'
//             }
//         }).lean();

//         if(!getListCart) return NextResponse.json({message: "You do not have Item to Buy!!"});

//         console.log("\nGet List Cart: ",getListCart)

//         const pushSellerUsername = getListCart.map((props: Cart) => {
            
//         })

//         console.log("\nPush Username: ",pushSellerUsername)

//         return NextResponse.json(pushSellerUsername)
//     } catch (error) {
//         console.log(error)
//     }
// }