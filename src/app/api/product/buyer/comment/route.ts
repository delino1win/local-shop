import { options } from "@/app/api/auth/[...nextauth]/options";
import connectMongoDataBase from "@/libs/mongodb";
import ProductComment from "@/models/comments";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

  const {productId, text} = await request.json()

  const session = await getServerSession(options)

  if(session?.user?.role !== "buyer") return NextResponse.json({message: "Access Denied"}, {status: 401})

  try {
    await connectMongoDataBase()

    const comment = await ProductComment.create({
      productId: productId,
      buyerId: session?.user?.id,
      text: text
    })


    return NextResponse.json(comment)
  } catch (error) {
    console.log(error)
  }
}