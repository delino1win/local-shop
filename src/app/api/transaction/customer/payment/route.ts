import { options } from "@/app/api/auth/[...nextauth]/options";
import connectMongoDataBase from "@/libs/mongodb";
import Payment from "@/models/payment";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import dayjs from "dayjs";
import Product from "@/models/product";
import { error } from "console";
import BuyerCart from "@/models/buyer_cart";

interface OrderDetail {
  buyerId: string;
  grossPrice: number;
  productDetail: {
    productId: string;
    productName: string;
    merchantUsername: string;
    price: string;
    productAmount: number;
  }[];
}

const quantityValidation = (
  qtyItemPresent: number,
  qtyItemOrdered: number
) => {
  if (qtyItemPresent <= qtyItemOrdered || qtyItemPresent < 0) {
    return NextResponse.json(
      {
        error: true,
        message: "Quantity Invalid",
      },
      { status: 400 }
    );
  } else {
    return (qtyItemPresent - qtyItemOrdered) as Number;
  }
};

export async function POST(request: NextRequest) {
  // const searchParams = request.
  const session = await getServerSession(options);
  const orderDetail: OrderDetail =
    await request.json();
  
  // console.log("productDetail", productOrder.productDetail)

  try {
    // await
    await connectMongoDataBase();
    
    // return NextResponse.json(paymentCreation);

  } catch (error) {
    console.error(error);
  }
}
