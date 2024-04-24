import connectMongoDataBase from "@/libs/mongodb";
import Product from "@/models/product";
import { uploadImage } from "@/utils/uploadImage";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  // const {
  //     newProductName: productName,
  //     newDescription: description,
  //     newBrand: brand,
  //     newCategories: categories,
  //     newPrice: price,
  //     newInventory: inventory,
  //     newImages: images} = await request.json();

  try {
    await connectMongoDataBase();
    // const updateProduct = await Product.findByIdAndUpdate(id, {
    //     productName,
    //     description,
    //     brand,
    //     categories,
    //     price,
    //     inventory,
    //     images
    // })

    // if(!updateProduct) return

    // return NextResponse.json(updateProduct)

    const req = await request.formData();
    const userId = req.get("userId");
    const productName = req.get("productName");
    const brand = req.get("brand");
    const description = req.get("description");
    const price = req.get("price");
    const inventory = req.get("inventory");
    const categories = req.getAll("categories[]");
    const images = req.getAll("images[]");
    const resImages = req.getAll("resImages[]");

    const validation: Record<string, string> = {};
    const numPrice = Number(price);
    const numInventory = Number(inventory);

    if (!userId) {
      return console.log("No User ID");
    }

    if (!productName) {
      validation.productName = "Product name required";
    }

    if (!numPrice) {
      validation.price = "Price required";
    } else if (numPrice < 0) {
      validation.price = "Price can't be minus";
    }

    if (!numInventory) {
      validation.inventory = "Inventory required";
    } else if (numInventory < 0) {
      validation.inventory = "Inventory can't be minus";
    }

    const imgsArr = [...resImages];

    for (const img of images) {
      if (img instanceof File) {
        try {
          const imgUrl = await uploadImage(await img.arrayBuffer());
          if (imgUrl) {
            imgsArr.push(imgUrl);
          }
        } catch (error) {
          console.log("error");
        }
      }
    }

    if (imgsArr.length < 1) {
      validation.images = "Image required";
    } else if (imgsArr.length > 7) {
      validation.images = "Images max are 7";
    }

    if (Object.keys(validation).length > 0) {
      return NextResponse.json({ ...validation }, { status: 400 });
    }

    const updateProps = await Product.findByIdAndUpdate(id, {
      productName,
      description,
      brand,
      categories,
      price,
      inventory,
      images: [...imgsArr],
    });

    if (!updateProps) {
      return NextResponse.json(
        {
          error: true,
          message: "Update failed!",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Add Product Success" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: true,
        message: "Update failed!",
      },
      { status: 500 }
    );
  }
}
