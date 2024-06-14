"use client";

import { formatter } from "@/utils/idrCurrency";
import { BsShop } from "react-icons/bs";
import { subtotal } from "@/utils/priceFormula";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const accumulatePrice = (receiptList: CartList[]) => {
  const listAmount = receiptList.map((item) => {
    const tItem = item.totalItem;
    const price = Number(item.product.price);
    const total = tItem * price;
    return total;
  });

  return listAmount.reduce((sum, num) => sum + num, 0);
};

export default function CheckoutReceipt({
  receiptList,
}: {
  receiptList: CartList[];
}) {
  const router = useRouter();

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const orderProduct = {
      // buyerId: receiptList[0].buyerId, //can use session too but reduce performance. since buyerId only one.
      email: receiptList[0].product.user.email,
      grossPrice: accumulatePrice(receiptList),
      productDetail: receiptList.map((prop) => ({
        id: prop.productId,
        name: prop.product.productName,
        merchant_name: prop.product.user.username,
        price: prop.product.price,
        quantity: prop.totalItem,
      })),
    };

    // console.log('order product:', orderProduct)

    const res = await fetch(`/api/paymentSandbox`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderProduct),
    });

    if (!res.ok) {
      alert("Failed!");
    } else {
      const data: PaymentType = await res.json();

      console.log(data)
      router.push(`/accountPayment/${data._id}`); //expect the invoiceI

    }
  };

  return (
    <>
      <div className="flex z-20 text-sky-100">
        <div className="fixed w-[500px] top-32 right-1/3 rounded-lg p-1 shadow-xl shadow-slate-800 bg-gradient-to-br from-blue-500 to-slate-600">
          <div className="min-h-[300px] max-h-[400px] overflow-y-auto p-2">
            {receiptList.map((item) => (
              <div
                key={item.productId}
                className="flex flex-col p-2 my-2 gap-2"
              >
                <div className="inline-flex items-center gap-3 text-lg tracking-wide">
                  <BsShop size={20} />
                  <label>{item.product.user.username}</label>
                </div>
                <div className="flex flex-row gap-4 text-sm font-light">
                  <div className="w-[90px] h-[90px]">
                    <img
                      src={item.product.images[0]}
                      className="object-contain rounded-lg"
                      alt=""
                    />
                  </div>

                  <div className="flex flex-col w-full gap-1">
                    <div className="flex flex-row  justify-between">
                      <div>{item.product.productName}</div>
                      <div>{item.totalItem}x</div>
                    </div>
                    <div className="flex flex-row justify-between">
                      <div>
                        {formatter.format(parseFloat(item.product.price))}
                      </div>
                    </div>
                    <div className="flex flex-row justify-between mt-1 border-t-[1px] border-slate-50">
                      <label>Sub - total</label>
                      <div>
                        {formatter.format(
                          subtotal(item.totalItem, item.product.price)
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col py-3 gap-3">
            <div className="flex justify-between text-xl border-t-2 border-slate-100 mx-4 py-2 font-semibold text-sky-500">
              <label className="pl-3">TOTAL</label>
              <div className="px-3 border-slate-100">
                {formatter.format(Number(accumulatePrice(receiptList)))}
              </div>
            </div>
            <form onSubmit={onSubmitHandler} className="flex justify-center">
              <button
                type="submit"
                className="min-w-[260px] w-[400px] text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                {/* <Link href={`/accountPayment/302480384503`} target="_blank">Proses Pembayaran</Link> */}
                Bayar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
