import Product from "@/models/product";
import connectMongoDataBase from "@/libs/mongodb";
import { NextResponse } from "next/server";
import { uploadImage } from "@/utils/uploadImage";

export async function POST(request: Request) {
  await connectMongoDataBase();
  function returnChecker(reqValue: any) {
    if (!reqValue) {
      return "";
    } else return reqValue;
  }

  try {
    // const {
    //   userId,
    //   productName,
    //   description,
    //   brand,
    //   categories,
    //   price,
    //   inventory,
    //   images,
    //   thumbnail,
    // } = await request.json();
    // console.log();

    const req = await request.formData()
    const userId = req.get('userId')
    const productName = req.get('productName')
    const brand = req.get('brand')
    const description = req.get('description')
    const price = req.get('price')
    const inventory = req.get('inventory')
    const categories = req.getAll('categories[]')
    const images = req.getAll('images[]')

    // if(!productName || !price || !price || !inventory) {
    //     return NextResponse.json({message: "Mandatory Required!"})
    // }

    // console.log("DALAM SERVER, INI IMAGES", images);4

    const validation: Record<string, string> = {}
    const numPrice = Number(price)
    const numInventory = Number(inventory)

    if (!userId) {
      return console.log("No User ID");
    }

    if(!productName) {
        validation.productName = "Product name required"
    }

    if(!numPrice) {
        validation.price = "Price required"
    } else if(numPrice < 0) {
        validation.price = "Price can't be minus"
    }

    if(!numInventory) {
        validation.inventory = "Inventory required"
    } else if(numInventory < 0) {
        validation.inventory = "Inventory can't be minus"
    }

    if(images.length < 1) {
        validation.images = "Image required"
    } else if (images.length > 7) {
        validation.images = "Images max are 7"
    }

    if(Object.keys(validation).length > 0 ) {
        return NextResponse.json({...validation}, {status: 400})
    }
    
    const imgsArr = []

    for(const img of images) {
        if(img instanceof File) {
            try {
                const imgUrl = await uploadImage(await img.arrayBuffer())
                if(imgUrl) {
                    imgsArr.push(imgUrl)
                }
            } catch (error) {
                console.log("error")
            }
        }
    }

    // console.log("imgs arr: ", imgsArr)

    await Product.create({
      userId,
      productName,
      description: returnChecker(description),
      brand: returnChecker(brand),
      categories,
      price: numPrice,
      inventory: numInventory,
      images: [...imgsArr],
      thumbnail: imgsArr[0]
    });
    return NextResponse.json({message: "Product is Added"}, { status: 200});
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
