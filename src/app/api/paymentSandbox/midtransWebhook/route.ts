import connectMongoDataBase from "@/libs/mongodb";
import Order from "@/models/order";
import { NextResponse } from "next/server";
import { sha512 } from "sha512-crypt-ts";

interface PayloadType {
  order_id: string;
  status_code: string;
  gross_amount: string;
  transaction_status: string;
  signature_key: string;
}

export async function POST(request: Request) {
  const payload = await request.json();

  console.log("payload from midtrans: ", payload);

  const {
    order_id,
    status_code,
    gross_amount,
    transaction_status,
    signature_key,
  } = payload as PayloadType;

  try {
    await connectMongoDataBase();

    const signature = sha512.hex(
      order_id
        .concat(status_code)
        .concat(gross_amount)
        .concat(process.env.MIDTRANS_SECRET as string)
    );

    if (signature != signature_key) {
      return NextResponse.json(
        { message: "Invalid Signature" },
        { status: 401 }
      );
    }

    const order = await Order.findOne({orderId: order_id})

    if(!order) {
      return NextResponse.json(
        { message: "Invalid Order" },
        { status: 400 }
      ); 
    }

  } catch (error) {
    console.error(error);
  }
}
