import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import PaymentActivation from "./_paymentActivationForm";
import connectMongoDataBase from "@/libs/mongodb";
import UserPaymentAccount from "@/models/userPaymentAccount";
import { NextResponse } from "next/server";
import User from "@/models/user";

const getPaymentUser = async (userId?: string) => {
  await connectMongoDataBase();

  if (!userId) return console.error("no user ID presented");

  try {
    const userPaymentAccount = await UserPaymentAccount.findOne({
      userId: userId,
    }).lean();

    return userPaymentAccount;
  } catch (error) {
    console.error(error);
  }
};

const getUserData = async (userId?: string) => {
  await connectMongoDataBase();

  try {
    const user = await User.findOne({
      userId: userId,
    });

    if (!user) return "";

    return user as User;
  } catch (error) {
    console.error(error);
  }
};

export default async function Page() {
  // if (!session?.user)
  //

  const session = await getServerSession(options);

  if (!session?.user) {
    return (
      <>
        <div>You Are Unauthorized</div>
      </>
    );
  }

  const paymentUserData = await getPaymentUser(session?.user?.id);

  const userData = (await getUserData(session?.user?.id)) as User;

  return (
    <>
      <div className="flex justify-center">
        {!paymentUserData ? (
          <div className="flex justify-center">
            <PaymentActivation user={userData} />
          </div>
        ) : (
          <>
            <div className="w-full mt-10 max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                  Your Active Payment
                </h5>
              </div>
              <div className="flow-root">
                <ul
                  role="list"
                  className="divide-y divide-gray-200 dark:divide-gray-700"
                >
                  <li className="py-3 sm:py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0"></div>
                      <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Virtual Account:{" "}
                          {paymentUserData.paymentType.virtualAccount ? (
                            <label className="font-bold text-blue-800">
                              {paymentUserData.paymentType.virtualAccount.map(
                                (item) => item.toUpperCase()
                              ).join("  ")}
                            </label>
                          ) : (
                            <>-</>
                          )}
                        </p>
                        <p className="mt-5 text-sm font-medium text-gray-900 truncate dark:text-white">
                          E-Wallet:{" "}
                          {paymentUserData.paymentType.ewallet ? (
                            <label className="font-bold text-blue-800">
                              {paymentUserData.paymentType.ewallet.map((item) =>
                                item.toUpperCase()
                              ).join("  ")}
                            </label>
                          ) : (
                            <>-</>
                          )}
                        </p>
                        <p className="mt-5 text-sm font-medium text-gray-900 truncate dark:text-white">
                          QRIS:{" "}
                          {paymentUserData.paymentType.qris === true ? (
                            <label className="gap-2 font-bold text-blue-800">
                              status active
                            </label>
                          ) : (
                            <label className="gap-2 font-bold text-red-400">
                              status inactive
                            </label>
                          )}
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
