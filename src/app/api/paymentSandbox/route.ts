import { options } from "@/app/api/auth/[...nextauth]/options";
import connectMongoDataBase from "@/libs/mongodb";
import snap from "@/libs/snapSandbox";
import Order from "@/models/order";
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
  const generateUuid = new UUID();

  const testOrder = {
    transaction_details: {
      order_id: "testing_static_0001",
      gross_amount: 50000,
    },
    item_details: [{
      name: "makanan",
      price: 50000,
      quantity: 1,
    }],
    customer_details: {
      email: "test@email.com",
    },
    customExpiry: {
      order_time: Date.now().toString(),
      expiry_duration: 120,
      unit: "minute",
    },
  };

  const session = await getServerSession(options);

  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  // const order = await request.json()

  try {
    await connectMongoDataBase();

    const checkOrderId = await Order.findOne({orderId: testOrder.transaction_details.order_id})

    if(checkOrderId) {
      return NextResponse.json({message: "Order already Created"}, {status: 400})
    }

    const token = await snap.createTransactionToken(testOrder);
    const url = await snap.createTransactionRedirectUrl(testOrder);

    if(!token) return NextResponse.json({message: "Bad Request"}, {status: 400})

    const createOrder = await Order.create({
      orderId: testOrder.transaction_details.order_id,
      orderDetail: testOrder,
      customerPaymentAccount: session?.user?.id,
      token: token,
      url: url,
      paymentStatus: "pending",
      createdAt: Date.now()
    })

    return NextResponse.json(createOrder)

  } catch (error) {
    console.error(error);
  }
}

// export async function POST(request: NextRequest) {

//   const generateUserId = new UUID();

//   const session = await getServerSession(options);

//   if(!session) return NextResponse.json({message: "Unauthorized"}, {status: 401})

//   // const orderDetail: OrderDetail =
//   //   await request.json();

//   // console.log("orderDetail: ", orderDetail)

// const dummyTest = {
//   item_details: {
//     name: 'makanan',
//     price: 50000,
//     quantity: 1
//   },
//     customer_details: {
//       email: "dummy@email.com"
//     },
//     transaction_details: {
//       order_id: 1000001,
//       gross_amount: 50000
//     },
//     customExpiry: {
//       order_time: Date.now().toString(),
//       expiry_duration: 120,
//       unit: "minute"
//     }
// }

//   try {
//     await connectMongoDataBase();

//     // const token = await snap.createTransactionToken({
//     //   item_details: orderDetail.productDetail,
//     //   customer_details: {
//     //     email: orderDetail.email
//     //   },
//     //   transaction_details: {
//     //     order_id: generateUserId
//     //   },
//     //   customExpiry: {
//     //     order_time: Date.now().toString(),
//     //     expiry_duration: 120,
//     //     unit: "minute"
//     //   }

//     // })

//     // const dummyToken = await snap.createTransactionToken(dummyTest)
//     // const dummyUrl = await snap.createTransactionRedirectUrl(dummyTest)

//     // console.log("Token:", dummyToken)

//     // return NextResponse.json({dummyToken, dummyUrl})

//   } catch (error) {
//     console.error(error);
//   }
// }
