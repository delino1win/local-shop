"use client";

import Link from "next/link";
import { FaStar } from "react-icons/fa";

const FeaturedProduct = ({
  listProduct,
}: {
  listProduct: ProductWithUsername[];
}) => {
  // const {data: session} = useSession();

  // if(!session) return

  return (
    <div className="flex">
    <div className="grid grid-cols-4 shrink-0">
      {listProduct.map((props: ProductWithUsername) => (
        <div
          className="shadow-md m-2 ring-1 ring-blue-200 rounded-md shrink-0 w-[200px] max-h-[320px] overflow-hidden hover:shadow-md hover:shadow-blue-50 transition-all duration-200 ease-in-out"
          key={props.userId}
        >
          <Link href={`/product/${props._id}`}>
            <div className="flex flex-col">
                <img
                className="object-contain h-[160px]"
                src={props.images[0]}
                alt={props.productName}
              />
              <div className="bg-blue-200 h-[160px] flex flex-col p-1 text-sm text-cyan-800 space-y-3">
                <div className="flex flex-row justify-end">
                    <label className="bg-slate-400 rounded-s-lg px-1 -mr-1 -mt-1 font-light">
                    available: {props?.inventory}</label>
                </div>
                <div className="text-wrap font-light">
                    {props?.productName}
                </div>
                <div className="flex flex-col py-4 rounded-md px-2">
                <div className="text-base font-semibold">
                    Rp. {props?.price}
                </div>
                <div>
                    <i>{props?.user?.username}</i>
                </div>
                </div>
                
            </div>            
            </div>
          </Link>
        </div>
      ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
