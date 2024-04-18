"use client";
import React, { useState, useEffect } from "react";
import getProductDetail from "@/utils/getProductDetail";
import Link from "next/link";

const Page = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const [productDetail, setProductDetail] = useState<Product>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProductDetail(slug);
      setProductDetail(data);
    };
    fetchData();
  }, []);

  if (!productDetail) return null;

  return (
    <>
      <section className="flex justify-center">
        <div className="flex-col space-y-4">
          {productDetail && (
            <div>
              <ul>
                {productDetail.images && (
                    <div>
                        {productDetail.images.map((i: string, index: number) => (
                  <div key={index}>
                    <img height={50} width={50} src={i} alt="detail image" />
                  </div>
                ))}
                    </div>
                )}
                

                <li>Name of the Product: {productDetail?.productName}</li>
                <li>Product Description: {productDetail?.description}</li>
                <li>Product Price: {productDetail?.price}</li>
                <li>Product Amount: {productDetail?.inventory}</li>
                <li>Product Image: {productDetail?.brand}</li>
                <Link href={`/product/seller/updateProduct/${slug}`}>
                  Update
                </Link>
                <div>===============================================</div>
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Page;
