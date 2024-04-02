"use client";

import Link from "next/link";

const FeaturedProduct = ({
  listProduct,
}: {
  listProduct: ProductWithUsername[];
}) => {
  // const {data: session} = useSession();

  // if(!session) return

  return (
    <div>
      {listProduct.map((props: ProductWithUsername) => (
        <div
          className="shadow-md w-60 m-2 border-2 rounded-md"
          key={props.userId}
        >
          <Link href={`http://localhost:3000/product/${props._id}`}>
            <div>
              <img
                className="h-75 w-75 p-5"
                src={props.images[0]}
                alt={props.productName}
              />
            </div>
            <div className="p-2 flex-nowrap overflow-hidden">
              <ul>
                <li>
                  <b>Seller</b>: {props?.user?.username}
                </li>
                <li>
                  <b>Product Name: </b>
                  {props.productName}
                </li>
                <li>
                  <b>Price: $</b>
                  {props.price}
                </li>
                <li>
                  <b>Item available: </b>
                  {props.inventory}
                </li>
                <li>
                  <b>Brand: </b>
                  {props.brand}
                </li>
                <li>
                  <b>Categories: </b>
                  {props.categories.join(", ")}
                </li>
                <li>
                  <b>Description: </b>
                  {props.description}
                </li>
              </ul>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProduct;
