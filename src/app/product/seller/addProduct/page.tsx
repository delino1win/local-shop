"use client";
import React, {
  ButtonHTMLAttributes,
  SelectHTMLAttributes,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function AddProductForm() {
  const [productName, setProductName] = useState<Product["productName"]>("");
  const [brand, setBrand] = useState<Product["brand"]>("");
  const [description, setDescription] = useState<Product["description"]>("");
  const [price, setPrice] = useState<Product["price"]>();
  const [inventory, setInventory] = useState<Product["inventory"]>();
  const [categories, setCategories] = useState<Product["categories"]>([]);
  const [images, setImages] = useState<Product["images"]>([]);

  const [imageUrl, setImageUrl] = useState<string>();
  const [insertImageField, setInsertImageField] = useState<React.JSX.Element[]>(
    []
  );

  const router = useRouter();
  const { data: session } = useSession();
  // console.log("\nadd product: ", session?.user.id);

  /// BAGIAN GAMBAR WOI ///
  //////
  interface ImageField {
    id: string;
    value: string;
  }

  function getDefault(): ImageField {
    return {
      id: crypto.randomUUID(),
      value: "",
    };
  }

  const [imageFields, setImageFields] = useState<ImageField[]>([getDefault()]);

  function imageFieldsHandler(
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setImageFields(
      imageFields.map((field) => {
        if (field.id === id) { //if id n.n equals to n
          return {
            ...field,
            value: e.target.value,
          }; //Update the field that consists of id and value, with this specific syntax update the value of id n.n with the event object of the n
        }
        return field; //the updated field is returned
      })
    ); // set the updated field of id: n from {id: n, value: " "} to {id: n, value: ` event_object_of_n `}
  }

  function addImageFields() { // Used for if the user add new input field
    setImageFields([...imageFields, getDefault()]); // to set up the rest of the value of imageFields and displays it and also
    // The new input field has identity (id) and default value of " " empty string
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
      const images = imageFields.filter(field => checkURLValid(field.value)).map(field => {
        return field.value
      })
      console.log("INI GAMBAR bos",images)
      const res = await fetch("http://localhost:3000/api/product/seller/addProduct", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user?.id,
          productName,
          brand,
          description,
          categories,
          price,
          inventory,
          images,
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
        
        <div className="space-y-3 pt-5">
          <div className="text-xl font-semibold">Image Urls</div>
          <div className="flex flex-col gap-1">
            {imageFields.map((field) => {
              return (
                <div key={field.id} className={`${field.value && !checkURLValid(field.value) ? 'ring-red-500 ring': '' } flex gap-3 bg-black/5 px-2 py-1`}>
                  <input
                    className="w-full text-slate-900 focus:outline-none bg-transparent"
                    placeholder="Input URL`s image"
                    onChange={(e) => imageFieldsHandler(field.id, e)}
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
