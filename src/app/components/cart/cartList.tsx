"use client";

import Link from "next/link";
import React, { createContext, useState } from "react";
import { formatter } from "@/utils/idrCurrency";
import { MdDeleteForever } from "react-icons/md";
import { MdShoppingCartCheckout } from "react-icons/md";
import Checkout from "./checkout";

type CheckoutContext = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

export const CheckoutContext = createContext<CheckoutContext>([
  false,
  () => {},
]);

export default function CartList({ props }: { props: CartList[] }) {
  function initialProps() {
    return props.map((item) => {
      return {
        ...item,
        chosen: false, //add the new key with it's inital value
      };
    });
  }

  interface Items extends CartList {
    chosen: boolean;
  }

  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [items, setItems] = useState<Items[]>(initialProps());
  const [chosenItems, setChosenItems] = useState<string[]>([]);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleCheckAll(event: React.ChangeEvent<HTMLInputElement>) {
    // const isCheckedAll = event.target.checked
    // setSelectAll(isCheckedAll)

    // setSelectCheckBox(isCheckedAll) //syntax for select all

    const { checked } = event.target;

    setSelectAll(checked);

    //manipulate it value
    const updateChosen = items.map((item) => ({ ...item, chosen: checked }));
    setItems(updateChosen);

    if (checked) {
      const productId = items.map((item) => item.productId);
      setChosenItems(productId);
    } else {
      setChosenItems([]);
    }
  }

  // useEffect(() => {
  //   const updateAllChosenItems = items.map(item => ({...item, chosen: selectAll}))
  //   setItems(updateAllChosenItems)

  //   if(selectAll) {
  //     const insertAllProductId = items.map(item => item.productId)
  //     setChosenItems(insertAllProductId)
  //   } else setChosenItems([])

  // }, [selectAll])

  function handleSelectCheckBox(event: React.ChangeEvent<HTMLInputElement>) {
    const { checked, value } = event.target;

    // console.log("checked: ", checked)
    // console.log("value: ", value)
    setSelectAll(false);

    setItems((currItems) =>
      //accessing the array of items, check if the value of element input as productId is the same as current item's productId then choosen field's value is 'checked'
      //({product?.choosen}) , else returns current state of items which are nothing change
      currItems.map((item) =>
        item.productId === value ? { ...item, chosen: checked } : item
      )
    );

    if (checked) {
      setChosenItems([...chosenItems, value]);
    } else {
      setChosenItems(chosenItems.filter((prodId) => prodId !== value)); //this mean take the prodIds that is not the same with value
    }
  }

  console.log(chosenItems);

  return (
    <>
      <CheckoutContext.Provider value={[isOpen, setIsOpen]}>
        <div className="overflow-x-auto shadow-md sm:rounded-lg mt-10">
          {isOpen ? (
            <div className="">

            </div>
          ) : (
            <table className={`${isOpen ? 'pointer-events-none' : ''} w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400`}>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all"
                      checked={selectAll}
                      onChange={handleCheckAll}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Brand
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((product) => (
                <tr
                  key={product?.productId}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table"
                        value={product?.productId}
                        checked={product?.chosen}
                        onChange={handleSelectCheckBox}
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      {/* {String(product?.chosen)} */}
                      <label
                        htmlFor="checkbox-table-search-1"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {product?.product?.productName}{" "}
                    <div className="text-xs text-gray-500 hover:text-blue-600 transition-all duration-200">
                      <Link href={`/product/seller/${product?.product?._id}`}>
                        See Detail
                      </Link>
                    </div>
                  </th>
                  <td className="px-6 py-4">{product?.product?.brand}</td>
                  <td className="px-6 py-4 grow-0">
                    <div className="max-w-[200px] w-full max-h-[50px] h-full overflow-x-auto">
                      {product?.product?.categories.join(", ")}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {formatter.format(Number(product?.product?.price))}
                  </td>
                  <td className="px-6 py-4">{product?.totalItem}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-row gap-2">
                      <MdDeleteForever
                        color="red"
                        size={24}
                        className="hover:rounded-md hover:ring-1 hover:ring-red-500 "
                      />
                      <MdShoppingCartCheckout
                        color="#66FF66"
                        size={24}
                        className="hover:rounded-md hover:ring-1 hover:ring-green-500 "
                      />
                      {/* <button onClick={() => deleteConfirmation(product?.product?._id, product?.product?.productName)}>Delete</button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
          
          {chosenItems.length > 0 && (
            <>
              <Checkout checkoutIds={chosenItems} items={items} />
            </>
          )}
        </div>
      </CheckoutContext.Provider>
    </>
  );
}
