"use client";
import { MdAddCard } from "react-icons/md";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function PaymentActivation() {
  const [status, setStatus] = useState<UserPaymentAccount>();
  const [open, setOpen] = useState<boolean>(false);
  const [btnActivate, setBtnActivate] = useState<boolean>(false);

  const { data: session } = useSession();

  useEffect(() => {
    async function fetchData() {
      const res = await activationData();
      setStatus(res);
    }
    fetchData();
  }, []);

  async function activationData() {
    try {
      const res = await fetch("/api/paymentActivation");

      if (res.ok) return "";

      const activationData = res.json();

      return activationData;
    } catch (error) {
      console.error(error);
    }
  }

  async function onSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  if (!session || !session.user)
    return (
      <>
        <div>You Are Unauthorized</div>
      </>
    );

  return (
    <>
      <div className="flex flex-col justify-center gap-5 my-10">
        <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <div className="w-full h-full bg-slate-200 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500">
            {status ? (
              <>
                <label>{status.activation}</label>
              </>
            ) : (
              <>
                <div className="max-w-sm p-6 rounded-lg dark:bg-gray-800 dark:border-gray-700 gap-4">
                  <div className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Virtual Account E-Wallet QRIS
                  </div>
                  <p className="mb-3 font-normal text-slate-50 dark:text-gray-400">
                    Your Payment Account is Not Active.
                  </p>

                  {!btnActivate ? (
                    <>
                      <button
                        onClick={() => {
                          setOpen(!open);
                          setBtnActivate(true);
                        }}
                        className="inline-flex gap-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        <label>Activate</label> <MdAddCard size={20} />
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Activate Your Payment Now Seamlessly with Multiple Payment
              Channel!
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              You can freely choose your payment type for your business
            </p>
          </div>
        </div>
        <div>
          {open && (
            <>
              <form onSubmit={onSubmitHandler}>
                <div className="flex flex-col bg-gradient-to-r from-sky-100 via-gray-200 to-slate-400 py-5 px-7 rounded-lg">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Username
                    </label>
                    <input
                      type="text"
                      id="disabled-input"
                      aria-label="disabled input"
                      className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={session.user.username}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Your Role
                    </label>
                    <input
                      type="text"
                      id="disabled-input"
                      aria-label="disabled input"
                      className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={session.user.role}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      National ID
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="..."
                      required
                    />
                  </div>
                  <div className="mt-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Phone number
                    </label>
                    <input
                      type="tel"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="081234567890"
                      required
                    />
                  </div>
                  <div className="mt-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Select Virtual Account
                    </label>
                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option selected>Choose Bank VA</option>
                      <option value="US">BINI</option>
                      <option value="CA">BACA</option>
                      <option value="FR">BRRI</option>
                      <option value="DE">OCEANICBANK</option>
                    </select>
                  </div>
                  <div className="mt-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Select E-Wallet
                    </label>
                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option selected>Choose E-Wallet</option>
                      <option value="US">VOVO</option>
                      <option value="CA">GoPaid</option>
                      <option value="FR">Fund</option>
                    </select>
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
