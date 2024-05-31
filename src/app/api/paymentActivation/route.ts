import connectMongoDataBase from "@/libs/mongodb"
import UserPaymentAccount from "@/models/userPaymentAccount"
import { getServerSession } from "next-auth"
import { options } from "../auth/[...nextauth]/options"
import { NextRequest, NextResponse } from "next/server"
import { checkBoolean, nationalIdValidation, phoneNumberValidation } from "@/utils/paymentActivationValidation"

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

export async function POST (request: NextRequest) {

  await connectMongoDataBase()
  const session = await getServerSession(options)

  if(!session) return NextResponse.json({message: "Unauthorized"}, {status: 401})

  const req = await request.formData()

  const userId = req.get('userId')
  const username = req.get('username')
  const nationalId = req.get('nationalId')
  const phoneNumber = req.get('phoneNumber')
  const virtualAccount = req.getAll('virtualAccount[]')
  const ewallet = req.getAll('ewallet[]')
  const qris = req.get('qris')
  const activation = req.get('termCondition')

  const validation: Record<string, string> = {}
 
  if(userId !== session?.user?.id || username !== session?.user?.username) return NextResponse.json({message: 'Unauthorized'}, {status: 401})

  if(!nationalId) {
    validation.nationalId = "National ID cant be Empty"
  } else if(!nationalIdValidation(String(nationalId) ?? '')) {
    validation.nationalId = "Invalid Format"
  }

  if(!phoneNumber)
    validation.phoneNumber = "Phone Number can't be Empty"
  if(!phoneNumberValidation(String(phoneNumber) ?? '')) {
    validation.phoneNumber = "Invalid Format"
  }

  // const paymentType = {} as UserPaymentAccount['paymentType']

  // if(virtualAccount) {
  //   // virtualAccount.map(item => paymentType.virtualAccount.push(String(item)))
  //   for(const va of virtualAccount) {
  //     paymentType.virtualAccount = [...strVa]
  //   }
  // } else paymentType.virtualAccount = [] 

  // console.log("va: ", virtualAccount)

  // if(ewallet) {
  //   // ewallet.map(item => paymentType.ewallet.push(String(item)))
  //   for(const ew of ewallet) {
  //     paymentType.ewallet.push(String(ew))
  //   }
  // } else paymentType.ewallet = []

  // console.log("ewallet: ", ewallet)

  // if(qris) {
  //   paymentType.qris = true
  // } else paymentType.qris = false

  // if(!paymentType.virtualAccount && !paymentType.virtualAccount && !paymentType.qris) {
  //   validation.paymentType = "One of Payment Type can't be empty"
  // }

  if(!virtualAccount && !ewallet && !qris) {
    validation.paymentType = "One of Payment Type can't be empty" 
  }

  if(!activation) {
    validation.activation = "T&C Agreement fails"
  }

  if(Object.keys(validation).length > 0) {
    console.log({...validation})
    return NextResponse.json({...validation}, {status: 400})
  }

  // console.log({userId, username, nationalId, phoneNumber, paymentType, activation})


  try {
  
    const userPaymentAccount = await UserPaymentAccount.findOne({userId: session?.user?.id})

    if(userPaymentAccount) {
      return NextResponse.json({message: "User already exist"})
    }

    const createPaymentAccount = await UserPaymentAccount.create({
      userId: userId,
      username: username,
      nationalId: nationalId,
      phoneNumber: phoneNumber,
      paymentType: {
        virtualAccount, ewallet, qris
      },
      activation: activation,
      activationAt: Date.now(),
      totalTransactionAmount: 0
    })

    return NextResponse.json(createPaymentAccount)

  } catch (error) {
    console.error(error)
  }

}