"use client";
import Product from "@/models/product";
import User from "@/models/user";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CartProduct extends Product {sellerUsername: string}

const AddToCartBtn = ({ props }: { props: CartProduct}) => {
  // const [cartStatus, setCartStatus] = useState<boolean>(false);
  const {data: session} = useSession()
  const route = useRouter()

  const [amountItems, setAmountItems] = useState<CartProduct["inventory"]>(0);
  const [totalPrice, setTotalPrice] = useState<CartProduct["price"]>(0);
  const [items, setItems] = useState<Product[]>();


  // productId: Product["_id"]
  const addToCartHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if(session?.user?.role !== "buyer") {
      alert("You cant perform this action, Login as buyer first!")
      return window.location.replace(`/product/${props?._id}`)
    }

    console.log("add item success")

    try {
        const res = await fetch(`http://localhost:3000/api/product/buyer/cart`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
              productId: props?._id,
              totalItem: amountItems
            })
        })

        if(!res.ok) return window.location.replace(`/product/${props?._id}`)

        alert(`item ${props.productName} succsesfully added!`)
        return route.replace(`/product/${props?._id}`)
    } catch (error) {
        console.log(error)
    }
}

//   console.log(`This is Cart Prod with ID ${props} and status: `, cartStatus);
  return (
    <div className="my-14 mx-4">
      <form 
        className="flex-row grid-rows-2" 
        onSubmit={addToCartHandler}>
        <div className="flex h-10 w-24 ml-5">
          <div className="flex border-2 rounded-md items-center justify-center px-5 hover:shadow-lg hover:font-bold" 
            onClick={() => {
              setAmountItems(amountItems + 1);
              setTotalPrice(totalPrice + props?.price)
            }}
          >
            Add+
          </div>

          {amountItems > 0 && (
                <div className="flex ml-2 p-2 justify-center items-center border-2 shadow-md rounded-lg">
                  <label className="text-sm">Total: </label>
                  <div className="ml-1 text-l font-bold">
                    {amountItems}
                  </div>
                    <div className="ml-2 text-3xl text-red-600 border-2 bg-red-200 rounded-md" 
                      onClick={() => {
                      setAmountItems(amountItems - 1);
                      setTotalPrice(totalPrice - props?.price)
                      }} >
                    -
                    </div>
                    <div onClick={() => {
                      setAmountItems(0);
                      setTotalPrice(0)
                      }} className="ml-2 font-semibold hover:font-extrabold">
                      X
                    </div>
                </div>
          )}


          {/* <button
          onClick={() => {
            if (cartStatus === false) {
              setCartStatus(true);
            } else setCartStatus(false);
          }}
        >
          {cartStatus === false ? <p>Cart</p> : <s>Cart</s>}
        </button> */}
        </div>
          {amountItems > 0 && (
              <div className="flex-row grid-rows-2 mt-4 bg-slate-100 ml-5 mr-16 border-2 shadow-sm rounded-lg">
                <div className="flex justify-center bg-slate-300">Total Price: Rp. {totalPrice}</div>
                <div className="flex justify-center my-3">
                  <button 
                    
                    className="p-2 border-2 bg-green-700 rounded-md text-white shadow-sm hover:shadow-lg hover:font-extrabold" 
                    type="submit">
                    Add Items To Cart
                  </button>
                </div>
                
              </div>
            )}
      </form>
      
    </div>
      
      
  );
};

export default AddToCartBtn;
