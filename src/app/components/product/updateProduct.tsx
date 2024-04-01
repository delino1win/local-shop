"use client";
import React, {useEffect, useState} from "react";
// import { useSession } from "next-auth/react";

export default function UpdateProductForm({product} : {product: Product}) {

  const [productName, setProductName] = useState<Product["productName"]>(product.productName);
  const [brand, setBrand] = useState<Product["brand"]>(product.brand);
  const [description, setDescription] = useState<Product["description"]>(product.description);
  const [price, setPrice] = useState<Product["price"]>(product.price);
  const [inventory, setInventory] = useState<Product["inventory"]>(product.inventory);
  const [categories, setCategories] = useState<Product["categories"]>(product.categories);

  const [imageFields, setImageFields] = useState<ImageField[]>(
    product.images.map(value => getDefault(value))
  );

//   const { data: session } = useSession();
  // console.log("\nadd product: ", session?.user.id);

  /// BAGIAN GAMBAR WOI ///
  //////
  interface ImageField {
    id: string;
    value: string;
  }

  function getDefault(imgValue: string): ImageField {
    return {
      id: crypto.randomUUID(),
      value: imgValue,
    };
  }

  // setImageFields(imageFields.map((field) => {
  //   if (field.id === id) {
  //     return {
  //       ...field,
  //       value: e.target.value,
  //     };
  //   }
  //   return field;  
  // }));
  function imageFieldsHandler(
    id: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) {

    const imageField = imageFields.map(field => {
      if(field.id === id) {
        return {
          ...field,
          value: event.target.value
        }
      }
      return field
    })

    setImageFields(imageField);
  }

  function addImageFields() {
    setImageFields([...imageFields, getDefault("")]);
  }

  function deleteImageField(id: string) {
    setImageFields(imageFields.filter((field) => field.id !== id));
  }

  function checkURLValid(_url: string) {
    const urlRegex = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
     return urlRegex.test(_url);
  }
  ///////
  /// BAGIAN GAMBAR WOI ///

  const handler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const images = imageFields.filter(field=> checkURLValid(field.value)).map(field => {
        return field.value
      })
      console.log("INI GAMBAR bos",images)

      const res = await fetch(`http://localhost:3000/api/product/seller/updateProduct?id=${product?._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
        //   userId: session?.user?.id,
          newProductName: productName,
          newBrand: brand,
          newDescription: description,
          newCategories: categories,
          newPrice: price,
          newInventory: inventory,
          newImages: images,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add new product");
      } else {
        window.location.replace("/product/seller/productList");
      }
    } catch (error) {
      console.log(error);
    }
  };

  function removeCategory(category: string) {
    setCategories(categories.filter((i) => i !== category)); // hapus category yang isinya === cat
  }
  const categoryHandler = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value; //pants | shirt | animal | food | and | so on
    if (value === "default") return;
    if (categories.includes(value)) {
      setCategories(categories.filter((i) => i !== value));
    } else {
      setCategories([...categories, value]);
    }

    event.target.value = "default";
  };

  // console.log("update product images:", images)
  // console.log("\nimages field", imageFields)


  return (
    <section className="flex justify-center">
      <form
        onSubmit={handler}
        className="grid grid-cols-1 shadow-sm ring-2 divide-y-4 divide-slate-400/25 space-y-3 p-3 mt-20 w-5/12"
      >
        <input
          value={productName}
          onChange={(event) => setProductName(event.target.value)}
          placeholder="Product Name"
          type="text"
        />
        <input
          value={brand}
          onChange={(event) => setBrand(event.target.value)}
          placeholder="Product Brand"
          type="text"
        />
        <input
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Product Description"
          type="text"
        />

        <label htmlFor="category">Select Categories:</label>
        <select onChange={categoryHandler}>
          <option value="default">Please select category</option>
          <option value="shirt">Shirt</option>
          <option value="pants">Pant</option>
          <option value="spareparts">Motor Bike`s Sparepart</option>
          <option value="electronic">Electronic</option>
          <option value="tool">Tool</option>
        </select>

        <div className="flex gap-2">
          <div>Selected Categories</div>
          {categories.map((category) => {
            return (
              <button
                onClick={() => removeCategory(category)}
                className="bg-blue-500 px-2 py-0.5 rounded-md text-white"
                key={category}
              >
                {category}
              </button>
            );
          })}
        </div>

        
        <input
          value={price}
          onChange={(event) => setPrice(parseFloat(event.target.value))}
          placeholder="Product Price"
          type="number"
        />
        <input
          value={inventory}
          onChange={(event) => setInventory(parseFloat(event.target.value))}
          placeholder="Product Amount"
          type="number"
        />
        
        {/* 1. set up UI for the user, the behaviour that needs to implemented contains action that user can
        ADD input field and also DELETE the input field and its value (image field) */}

        {/* 2. This Code below represents the IMAGES that has been being inputed from the input field */}
        <div className="space-y-3 pt-5"> 
          <div className="text-xl font-semibold">Image Urls</div>
          <div className="flex flex-col gap-1">
            {imageFields.map((field) => { /*2.1 imageFields represents property that has been created and also being iterate to get each field*/
              return (
                <div 
                  key={field.id} 
                  className={`${field.value && !checkURLValid(field.value) ? 'ring-red-500 ring': '' } flex gap-3 bg-black/5 px-2 py-1`}
                > {/* 2.2 each field contains properties of id and value */}

                  <input
                    value={field.value} // this value attribute represents the value of property of imageFields
                    className="w-full text-white text-slate-900 focus:outline-none bg-transparent"
                    placeholder="Input URL`s image"
                    onChange={(e) => imageFieldsHandler(field.id, e)} //2.3 
                  />
                  <button
                    onClick={() => deleteImageField(field.id)}
                    type="button"
                    className=""
                  >x
                  </button>
                </div>
              );
            })}
          </div>
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-xl"
            onClick={addImageFields}
          >
            Add More URLs Image
          </button>
        </div>

        {/* {insertImageField.map((add, index) => {
          return <div key={index}>{add}</div>;
        })} */}

        <button
          className="w-32 outline hover:outline-blue-500 justify-self-center"
          type="submit"
        >
          Submit Button
        </button>
      </form>
    </section>
  );
}
