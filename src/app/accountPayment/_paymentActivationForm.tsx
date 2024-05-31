"use client";
import { MdAddCard } from "react-icons/md";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { DefaultSession } from "next-auth";

export default function PaymentActivation({user}: {user: User}) {
  const [open, setOpen] = useState<boolean>(false);
  const [btnActivate, setBtnActivate] = useState<boolean>(false);

  const [nationalId, setNationalId] =
    useState<UserPaymentAccount["nationalId"]>("");
  const [phoneNumber, setPhoneNumber] =
    useState<UserPaymentAccount["phoneNumber"]>("");
  const [virtualAccount, setVirtualAccount] = useState<
    UserPaymentAccount["paymentType"]["virtualAccount"]
  >([]);
  const [ewallet, setEwallet] = useState<
    UserPaymentAccount["paymentType"]["ewallet"]
  >([]);
  const [qris, setQris] =
    useState<UserPaymentAccount["paymentType"]["qris"]>(false);
  const [termCondition, setTermCondition] = useState<boolean>(false);

  const { data: session } = useSession();

  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await activationData();
  //     setStatus(res);
  //   }
  //   fetchData();
  // }, [session?.user]);

  

  //Select Options Handler

  function vaHandler(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    if (value === "default") return;
    if (virtualAccount.includes(value)) {
      //example : there are bca, bni, bri. But bca has chosen

      //.filter is Array method to filter, return items that is not the same with value (case below). Then become array
      setVirtualAccount(virtualAccount.filter((item) => item !== value)); // bni is not bca? true, bri is not bca? true, bca is not bca? FALSE. Return the True items
    } else {
      setVirtualAccount([...virtualAccount, value]);
    }

    event.target.value = "default";
  }

  function ewalletHandler(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    if (value === "default") return;
    if (ewallet.includes(value)) {
      //example : there are bca, bni, bri. But bca has chosen

      //.filter is Array method to filter, return items that is not the same with value (case below). Then become array
      setEwallet(ewallet.filter((item) => item !== value)); // bni is not bca? true, bri is not bca? true, bca is not bca? FALSE. Return the True items
    } else {
      setEwallet([...ewallet, value]);
    }

    event.target.value = "default";
  }

  async function activationData() {
    try {
      const res = await fetch("/api/paymentActivation");

      if (res.ok) return "";

      const activationData = res.json();
      console.log("result of activationData:", activationData )

      return activationData;
    } catch (error) {
      console.error(error);
    }
  }

  function removeVaItem(vaItem: string) {
    setVirtualAccount(virtualAccount.filter((item) => item !== vaItem));
  }

  function removeEwalletItem(ewalletItem: string) {
    setEwallet(ewallet.filter((item) => item !== ewalletItem));
  }

  async function onSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData();

    try {
      if (session?.user?.id) formData.append("userId", session?.user?.id);

      if (session?.user?.username)
        formData.append("username", session?.user?.username);

      formData.append("nationalId", nationalId);
      formData.append("phoneNumber", phoneNumber);

      for (const va of virtualAccount ?? []) {
        formData.append("virtualAccount[]", va)
      }
      for (const ew of ewallet ?? []) {
        formData.append("ewallet[]", ew)
      }

      formData.append("qris", String(qris))
      formData.append("termCondition", String(termCondition))

      const res = await fetch('/api/paymentActivation', {
        method: 'POST',
        body: formData
      })

      console.log("payment account: ", res)

      if(!res.ok) {
        console.error(res)
        alert("Invalid")
        window.location.reload()

      }
      window.location.reload()

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center gap-5 my-10">
        <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <div className="w-full h-full bg-slate-200 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500">
              
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
                        <label>Registry</label> <MdAddCard size={20} />
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                </div>

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
                      className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={user.username}
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
                      className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={user.userRole}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      National ID
                    </label>
                    <input
                      type="text"
                      onChange={(event) => setNationalId(event.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="..."
                      required
                      maxLength={12}
                    />
                  </div>
                  <div className="mt-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Phone number
                    </label>
                    <input
                      type="tel"
                      onChange={(event) => setPhoneNumber(event.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="081234567890"
                      required
                      maxLength={13}
                    />
                  </div>
                  <div className="mt-5">
                    <div className="flex flex-row items-center gap-3">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Select Virtual Account
                      </label>
                      <div className="gap-2">
                        {virtualAccount.map((item) => (
                          <button
                            className="py-1 px-3 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            key={item}
                            onClick={() => removeVaItem(item)}
                          >
                            {item.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>
                    <select
                      onChange={vaHandler}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="default">Choose Bank VA</option>
                      <option value="bini">BINI</option>
                      <option value="baca">BACA</option>
                      <option value="brri">BRRI</option>
                      <option value="oceanicbank">OCEANICBANK</option>
                    </select>
                  </div>
                  <div className="mt-5">
                    <div className="flex flex-row items-center gap-3">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Select E-Wallet
                      </label>
                      <div className="gap-2">
                        {ewallet.map((item) => (
                          <button
                            className="py-1 px-3 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            key={item}
                            onClick={() => removeEwalletItem(item)}
                          >
                            {item.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>
                    <select
                      onChange={ewalletHandler}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="default">Choose E-Wallet</option>
                      <option value="vovo">VOVO</option>
                      <option value="gopaid">GoPaid</option>
                      <option value="fundy">Fundy</option>
                    </select>
                  </div>

                  <div className="flex mt-5">
                    <div className="flex items-center h-5">
                      <input
                        id="helper-checkbox"
                        aria-describedby="helper-checkbox-text"
                        type="checkbox"
                        checked={qris}
                        onChange={(event) => setQris(event.target.checked)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div className="ms-2 text-sm">
                      <label className="font-medium text-gray-900 dark:text-gray-300">
                        QRIS
                      </label>
                      <p
                        id="helper-checkbox-text"
                        className="text-xs font-normal text-gray-500 dark:text-gray-300"
                      >
                        Using QRIS for SCAN QR CODE
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center self-center mt-5">
                    <input
                      id="link-checkbox"
                      type="checkbox"
                      checked={termCondition}
                      onChange={(event) =>
                        setTermCondition(event.target.checked)
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      I agree with the{" "}
                      <a
                        href="#"
                        className="text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        terms and conditions
                      </a>
                      .
                    </label>
                  </div>
                  {termCondition && (
                    <button
                      type="submit"
                      className="mt-5 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
