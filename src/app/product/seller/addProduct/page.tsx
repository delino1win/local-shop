"use client";
import React, { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function AddProductForm() {
  const [productName, setProductName] = useState<Product["productName"]>("");
  const [brand, setBrand] = useState<Product["brand"]>("");
  const [description, setDescription] = useState<Product["description"]>("");
  const [price, setPrice] = useState<Product["price"]>(0);
  const [inventory, setInventory] = useState<Product["inventory"]>(0);
  const [categories, setCategories] = useState<Product["categories"]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({})
  // const [imageCollection, setImageCollection] = useState<string[] | File[] | null>([])

  const router = useRouter();
  const { data: session } = useSession();
  // console.log("\nadd product: ", session?.user.id);

  const handler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData();

    try {
        if(session?.user?.id) formData.append('userId', session?.user?.id)
        formData.append('productName', productName)
        formData.append('brand', brand)
        formData.append('description', description)
        
        formData.append('price', String(price))
        formData.append('inventory', String(inventory))
        for (const img of images ?? []) {
          formData.append('images[]', img)
        }

        for(const category of categories ?? []) {
          formData.append('categories[]', category)
        }

      const res = await fetch("/api/product/seller/addProduct", {
        method: "POST",
        // headers: {
        //   "Content-Type": "multipart/formdata"
        // },
        body: formData,
      });

      if(!res.ok) {
        alert("Res not OK!")
        // setErrors(await res.json())
      }
        // window.location.replace('/product/seller/productList')
        router.replace('/product/seller/productList')
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

  //Image

  const imageHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    // if (event.target.files) {
    //   if(event.target.files instanceof File) {
    //   const files = Array.from(event.target.files);
    //   setImages([...images, ...files]);
    //   } else setImages([...images, ])
    // }

    if (event.target.files) {
      const files = Array.from(event.target.files);

      console.log("Images: ", images);

      if (images.length > 7) return alert("Max 7");

      setImages([...images, ...files]);
    }
  };

  const removeImage = async (idx: number) => {
    const targetImage = [...images];
    targetImage.splice(idx, 1);
    setImages(targetImage);
  };

  return (
    <section className="flex justify-center">
      <form
        onSubmit={handler}
        className="flex flex-col space-y-7 mb-10 p-3 w-3/4 max-sm:w-full text-gray-200 text-2xl max-sm:text-xs font-extralight antialiased"
      >
        <div className="flex flex-col space-y-1">
          <label>Product Name</label>
          <input
            className="bg-transparent border-b-2 border-slate-800 mr-1 font-normal text- focus:outline-none"
            value={productName}
            onChange={(event) => setProductName(event.target.value)}
            placeholder=" . . ."
            type="text"
            required
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label>Product Brand</label>
          <input
            className="bg-transparent border-b-2 border-slate-800 mr-1 font-normal text- focus:outline-none"
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
            placeholder=" . . ."
            type="text"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label>Product Description</label>
          <input
            className="bg-transparent border-b-2 border-slate-800 mr-1 font-normal text- focus:outline-none"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder=" . . ."
            type="text"
          />
        </div>

        <div className="flex flex-col">
          <div className="flex mb-3">
            <div>Select Categories: </div>
            <div
              className={`${
                categories.length !== 0 ? "border-b-2 border-slate-800 " : ""
              } space-x-3`}
            >
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
          </div>
          <select
            className="rounded-md focus:outline-none p-1 bg-transparent ring-1 ring-slate-300 w-1/2 max-sm:w-full text-slate-900"
            onChange={categoryHandler}
          >
            <option value="default">Please select category</option>
            <option value="apparel">Apparel</option>
            <option value="spareparts">Ride Spareparts</option>
            <option value="electronic">Electronic</option>
            <option value="food">Foods</option>
            <option value="material">Materials</option>
            <option value="medicine">Medicine</option>
            <option value="tool">Tool</option>
          </select>
        </div>

        <div className="flex flex-col space-y-1">
          <label>Product Price</label>
          <input
            className="bg-transparent border-b-2 border-slate-800 mr-1 font-normal text- focus:outline-none"
            value={price}
            onChange={(event) => setPrice(parseFloat(event.target.value))}
            placeholder=" . . ."
            type="number"
            required
            min={1}
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label>Amount</label>
          <input
            className="bg-transparent border-b-2 border-slate-800 mr-1 font-normal text- focus:outline-none"
            value={inventory}
            onChange={(event) => setInventory(parseFloat(event.target.value))}
            placeholder=" . . ."
            type="number"
            required
            min={1}
          />
        </div>

        <div>
          <label>Input Your Product Photos: </label>
          <div className="flex flex-row bg-slate-600 rounded-lg my-2 overflow-x-auto">
            {images.map((image, idx) => (
              <div className="relative p-2 shrink-0" key={idx}>
                <div>
                  <img
                    className="h-[100px] w-[120px] object-contain"
                    src={URL.createObjectURL(image)}
                    alt={`img ${idx}`}
                  />
                </div>
                <div
                  className="absolute z-10 top-1 px-2 right-[5px] text-lg font-semibold text-black bg-slate-100 rounded-full hover:text-red-500 hover:font-extrabold transition-all duration-300 hover:shadow-lg"
                  onClick={() => removeImage(idx)}
                >
                  X
                </div>
              </div>
            ))}
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={imageHandler}
          />
          
        </div>

        <div>
          <label>Your Thumbnail Product: </label>
          {images.length > 0 && (
            <img className="h-[120px] w-[150px]" src={URL.createObjectURL(images[0])} />
          )}
        </div>

        <button
          className="w-3/5 bg-slate-600 p-2 rounded-lg self-center hover:shadow-lg hover:font-bold transition-all duration-300 ease-in-out"
          type="submit"
        >
          Create Product
        </button>
      </form>
    </section>
  );
}
