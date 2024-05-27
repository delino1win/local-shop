import connectMongoDataBase from "@/libs/mongodb"
import UserPaymentAccount from "@/models/userPaymentAccount"
import { getServerSession } from "next-auth"
import { options } from "../auth/[...nextauth]/options"
import { NextResponse } from "next/server"

export async function GET () {

  await connectMongoDataBase()
  const session = await getServerSession(options)

  if(!session) return NextResponse.json({message: "Unauthorized"}, {status: 401})

  try {
  
    const userPaymentAccount = await UserPaymentAccount.findOne({userId: session?.user?.id})

    return NextResponse.json(userPaymentAccount)

  } catch (error) {
    console.error(error)
  }
}

export async function POST () {

  await connectMongoDataBase()
  const session = await getServerSession(options)

  if(!session) return NextResponse.json({message: "Unauthorized"}, {status: 401})

  try {
  
    const userPaymentAccount = await UserPaymentAccount.findOne({userId: session?.user?.id})

    if(!userPaymentAccount) {
      await UserPaymentAccount.create({})
    }

    return NextResponse.json(userPaymentAccount)

  } catch (error) {
    console.error(error)
  }

}