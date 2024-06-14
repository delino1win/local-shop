
import { options } from "@/app/api/auth/[...nextauth]/options";
import connectMongoDataBase from "@/libs/mongodb";
import snap from "@/libs/snapSandbox";
import { UUID } from "mongodb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface OrderDetail {
  email: string;
  gross_price: number;
  productDetail: {
    id: string;
    productName: string;
    merchantUsername: string;
    price: string;
    productAmount: number;
  }[];
}

export async function POST(request: NextRequest) {

  const generateUserId = new UUID();

  const session = await getServerSession(options);

  if(!session) return NextResponse.json({message: "Unauthorized"}, {status: 401})

  // const orderDetail: OrderDetail =
  //   await request.json();

  // console.log("orderDetail: ", orderDetail)

  let dummyTest = {
    item_details: {
      name: 'bola',
      price: 100000,
      quantity: 1
    },
      customer_details: {
        email: "dummy@email.com"
      },
      transaction_details: {
        order_id: 10101010101010,
        gross_amount: 100000
      },
      customExpiry: {
        order_time: Date.now().toString(),
        expiry_duration: 120,
        unit: "minute"
      }
  }

  try {
    await connectMongoDataBase();

    // const token = await snap.createTransactionToken({
    //   item_details: orderDetail.productDetail,
    //   customer_details: {
    //     email: orderDetail.email
    //   },
    //   transaction_details: {
    //     order_id: generateUserId
    //   },
    //   customExpiry: {
    //     order_time: Date.now().toString(),
    //     expiry_duration: 120,
    //     unit: "minute"
    //   }
      
    // })

    const dummyToken = await snap.createTransactionToken(dummyTest)
    const dummyUrl = await snap.createTransactionRedirectUrl(dummyTest)

    console.log("Token:", dummyToken)

    return NextResponse.json({dummyToken, dummyUrl})

  } catch (error) {
    console.error(error);
  }
}