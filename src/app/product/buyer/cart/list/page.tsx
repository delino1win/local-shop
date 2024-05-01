import { options } from "@/app/api/auth/[...nextauth]/options";
import CartList from "@/app/components/cart/cartList";
import connectMongoDataBase from "@/libs/mongodb";
import BuyerCart from "@/models/buyer_cart";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


async function getCartList () {
  const session = await getServerSession(options);

    // console.log("session for cart api: ",session)

    if(!session) return

    if(session?.user?.role !== "buyer") return 
    try {
        await connectMongoDataBase();
        // const checkBuyerCart = await BuyerCart.find({buyerId: session?.user?.id})
        // console.log("check buyer cart: ",checkBuyerCart)
        
        const listCart: CartList[] = await BuyerCart.find({buyerId: session?.user?.id}).populate<Product>({
        path: 'product',
            options: {
                select: '_id userId productName brand categories inventory price images',
                populate: {
                    path: "user",
                    select: "username"
            }}
        }).lean();

        // console.log("user list cart: ", )

        if(!listCart) return 

        return listCart
    } catch (error) {
        console.log(error)
    }
}


export default async function Page () {

    const res = await getCartList()

    if(!res) return

    console.log("res:", res)
    // console.log("res type:", typeof res)

    return (

      <>
        <div>
          <CartList props={res}/>
        </div>
        <div>
        </div>
      </>
    )
} 