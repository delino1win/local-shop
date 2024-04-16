import Product from "@/models/product";
import connectMongoDataBase from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  function returnChecker(reqValue: any) {
    if (!reqValue) {
      return "";
    } else return reqValue;
  }

  try {
    const {
      userId,
      productName,
      description,
      brand,
      categories,
      price,
      inventory,
      images,
      thumbnail,
    }: Product = await request.json();
    console.log();
    await connectMongoDataBase();
    // if(!productName || !price || !price || !inventory) {
    //     return NextResponse.json({message: "Mandatory Required!"})
    // }

    // console.log("DALAM SERVER, INI IMAGES", images);
    if (!userId) {
      return console.log("No User ID");
    }

    const createProduct = await Product.create({
      userId,
      productName,
      description: returnChecker(description),
      brand: returnChecker(brand),
      categories,
      price,
      inventory,
      images,
      thumbnail,
    });
    return NextResponse.json(createProduct);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
