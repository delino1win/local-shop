import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import PaymentActivation from "./_paymentActivationForm";
import connectMongoDataBase from "@/libs/mongodb";
import UserPaymentAccount from "@/models/userPaymentAccount";
import { NextResponse } from "next/server";
import User from "@/models/user";

const getPaymentUser = async (userId?: string) => {
  await connectMongoDataBase();

  if (!userId)
    return console.error("no user ID presented");

  try {
    const userPaymentAccount = await UserPaymentAccount.findOne({
      userId: userId,
    });

    return userPaymentAccount
  } catch (error) {
    console.error(error);
  }
};

const getUserData = async (userId?: string) => {
  await connectMongoDataBase();

  try {
    const user = await User.findOne({
      userId: userId
    })

    if(!user) return ''

    return user as User
  } catch (error) {
    console.error(error)
  }

}

export default async function Page() {
  // if (!session?.user)
  //   

  
  const session = await getServerSession(options);

  if(!session?.user) {
    return (
          <>
            <div>You Are Unauthorized</div>
          </>
        );
  }

  const paymentUserData = await getPaymentUser(session?.user?.id);

  const userData = await getUserData(session?.user?.id) as User

    return (
      <>
        {!paymentUserData ? (
          <div className="flex justify-center">
            <PaymentActivation user={userData} />
          </div>
        ) : (
          <>
            <div>Payment User Data Exist</div>
          </>
        )}
      </>
    );
}
