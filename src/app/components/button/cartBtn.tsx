"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";

const CartIcon = ({enter, leave}: any) => {
  return (
    <button
      onMouseEnter={enter}
      onMouseLeave={leave}
      type="button"
      className="focus:outline-none rounded-full bg-gray-200 p-2 hover:bg-gray-300"
    >
      <svg
        fill="none"
        height="15"
        viewBox="0 0 15 15"
        width="15"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.978822 0.356323L0.0209961 0.643671L3.12789 11H14.9999V4.5C14.9999 3.11929 13.8806 2 12.4999 2H1.47192L0.978822 0.356323Z"
          fill="black"
        />
        <path
          clipRule="evenodd"
          d="M5.5 12C4.67157 12 4 12.6716 4 13.5C4 14.3284 4.67157 15 5.5 15C6.32843 15 7 14.3284 7 13.5C7 12.6716 6.32843 12 5.5 12ZM5 13.5C5 13.2239 5.22386 13 5.5 13C5.77614 13 6 13.2239 6 13.5C6 13.7761 5.77614 14 5.5 14C5.22386 14 5 13.7761 5 13.5Z"
          fill="black"
          fillRule="evenodd"
        />
        <path
          clipRule="evenodd"
          d="M12.5 12C11.6716 12 11 12.6716 11 13.5C11 14.3284 11.6716 15 12.5 15C13.3284 15 14 14.3284 14 13.5C14 12.6716 13.3284 12 12.5 12ZM12 13.5C12 13.2239 12.2239 13 12.5 13C12.7761 13 13 13.2239 13 13.5C13 13.7761 12.7761 14 12.5 14C12.2239 14 12 13.7761 12 13.5Z"
          fill="black"
          fillRule="evenodd"
        />
      </svg>
    </button>
  );
};

// const cartItems = async () => {
//     try {
//         const res = await fetch("http://localhost:3000/api/product/buyer/cart")

//         if(!res.ok) return

//         const cartList = await res.json()
//         return cartList as Cart;
        
//     } catch (error) {
//         console.log(error)
//     }
// }

const CartBtn = () => {
  const { data: session } = useSession();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartList[]>([])

  // console.log("cart session", session)
  // console.log("cart items:",cartItems)
  // console.log("cart lengths: ", cartItems.length)

  useEffect(() => {
    const fetctData = async () => {
        if (session?.user?.role === "buyer") return <CartIcon />
        try {
            const res = await fetch("http://localhost:3000/api/product/buyer/cart")

            if(!res.ok) return 

            const cartList  = await res.json();
            setCartItems(cartList)
        } catch (error) {
            console.log(error)
        }
    }
    fetctData();
  }, [session])

  return (
    <div className="relative">
        <CartIcon 
            enter={() => {
                setIsHover(true)}} 
            leave={() => {
                setIsHover(false)}}
                />
        {cartItems.length > 0 && isHover && (
            <div className="absolute top-full right-0 w-[500px] bg-white shadow-md rounded-lg overflow-x-hidden z-50 transition-all duration-150 ease-in-out"
            >
                <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} className="p-2">
                    <h3 className="text-base border-b-2 font-semibold mb-1 text-center">Your Cart</h3>
                    <Link className="hover:font-semibold transition-all duration-200" href={``}>See All List</Link>
                    {cartItems.map((prop) => (
                        <div className="bg-gray-100 rounded-lg" key={prop.productId}>
                                <div className="flex grid-cols-3 py-1 justify-between border-b-2 mx-2"  key={prop.product.userId}>
                                    <div className="border-2 shadow-lg rounded-lg">
                                      <img className="rounded-lg justify-center w-[100px] h-[80px] " src={prop?.product?.images[0]} alt="Image" />
                                    </div>
                                    <div className="flex-row content-center min-w-[170px] justify-start">
                                      <div className="font-extrabold text-lg">
                                        {prop?.product?.productName}
                                      </div>
                                      <div className="font-semibold text-sm">
                                        {prop?.product?.user?.username}
                                      </div>
                                    </div>
                                    <div className="content-center">{prop?.totalItem}X {prop?.product?.price} $</div>
                                </div>
                        </div>
                    ))}
                </div>
            </div>
        ) }
    </div>
  );
};

export default CartBtn;
