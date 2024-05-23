import { useContext, useState } from "react";
import { MdShoppingCartCheckout } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { CheckoutContext } from "./cartList";
import CheckoutReceipt from "./checkoutReceipt";

export default function Checkout({
  checkoutIds,
  items,
}: {
  checkoutIds: string[];
  items: CartList[];
}) {
  const [isOpen, setIsOpen] = useContext(CheckoutContext)

  const checkoutItems = items.filter(item => checkoutIds.includes(item.productId))

  return (
    <>
      <div className="fixed bottom-5 right-24 text-sm font-semibold text-neutral-100 items-center">
        <button onClick={() => setIsOpen(!isOpen)}>
          {checkoutIds.length > 0 && (
            <div className="relative top-7 left-5 bg-red-600 size-7 rounded-full content-center text-center">
              <label className="self-center">
                {checkoutIds.length.toString()}
              </label>
            </div>
          )}
          <MdShoppingCartCheckout size={65} color="#66FF66" />
          <div className="flex flex-row items-center">
            <label className="text-neutral-900">Checkout</label>
            <MdOutlineKeyboardDoubleArrowRight size={22} color="#66FF66" />
          </div>
        </button>
      </div>
      {isOpen && (
        <CheckoutReceipt receiptList={checkoutItems} />
      )}
    </>
  );
}
