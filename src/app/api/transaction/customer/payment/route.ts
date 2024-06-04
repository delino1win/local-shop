import { options } from "@/app/api/auth/[...nextauth]/options";
import connectMongoDataBase from "@/libs/mongodb";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function POST (request: NextRequest) {

  // const searchParams = request.
  const session = getServerSession(options)
  const {buyerId, grossPrice, productDetail} = await request.json()

  await connectMongoDataBase()

  try {
    // await

  } catch (error) {
    console.error(error)
  }
}