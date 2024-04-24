"use client";
import React, { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function UpdateProductForm({product} : {product: Product}) {
  const [productName, setProductName] = useState<Product["productName"]>(product?.productName);
  const [brand, setBrand] = useState<Product["brand"]>(product?.brand);
  const [description, setDescription] = useState<Product["description"]>(product?.description);
  const [price, setPrice] = useState<Product["price"]>(product?.price);
  const [inventory, setInventory] = useState<Product["inventory"]>(product?.inventory);
  const [categories, setCategories] = useState<Product["categories"]>(product?.categories);
  const [images, setImages] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({})
  // const [imageCollection, setImageCollection] = useState<string[] | File[] | null>([])

    // Solusi utk Update Image
    //   const [sourceImage, setSource] = useState(null)
    // useEffect(()=>{
    // if string langsung setSource(string)
    // if file convert dulu baru setSource
    // }, [])

  const [resImages, setResImages] = useState<Product["images"]>(product?.images);

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

        for(const resImg of resImages ?? [])
        formData.append('resImages[]', resImg)

        for(const category of categories ?? []) {
          formData.append('categories[]', category)
        }

      const res = await fetch(`/api/product/seller/updateProduct?id=${product?._id}`, {
        method: "PUT",
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
        window.location.replace('/product/seller/productList')
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

      // console.log("Images: ", images);

      if (images.length > 7) return alert("Max 7");

      setImages([...images, ...files]);

    }
  };

  const removeImage = async (idx: number) => {

    const targetImage = [...images]
    targetImage.splice(idx, 1)
    setImages(targetImage)
    
  };

  const removeResImg = async (idx: number) => {

    const targetImage = [...resImages]
    targetImage.splice(idx, 1)
    setResImages(targetImage)
    
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
            className="bg-transparent border-b-2 border-slate-800 mr-1 font-normal focus:outline-none"
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
            className="bg-transparent border-b-2 border-slate-800 mr-1 font-normal focus:outline-none"
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
            placeholder=" . . ."
            type="text"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label>Product Description</label>
          {/* <input
            className="bg-transparent border-b-2 border-slate-800 mr-1 font-normal text- focus:outline-none"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder=" . . ."
            type="text"
          /> */}
          <textarea 
            className="bg-transparent mr-1 ring-1 ring-slate-800 h-[150px] max-h-[250px] min-h-[100px]" 
            value={description}
            onChange={(event) => setDescription(event.target.value)}
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
          <label>Delete Your Product Photos: </label>
          <div className="flex flex-row bg-slate-600 rounded-lg my-2 overflow-x-auto">
            {resImages.map((image, idx) => (
              <div className="relative p-2 shrink-0" key={idx}>
                <div>
                  <img
                    className="h-[100px] w-[120px] object-contain"
                    src={image}
                    alt={`img ${idx}`}
                  />
                </div>
                <div
                  className="absolute z-10 top-1 px-2 right-[5px] text-lg font-semibold text-black bg-slate-100 rounded-full hover:text-red-500 hover:font-extrabold transition-all duration-300 hover:shadow-lg"
                  onClick={() => removeResImg(idx)}
                >
                  X
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label>Add Your Product Photos: </label>
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

        <button
          className="w-3/5 bg-slate-600 p-2 rounded-lg self-center hover:shadow-lg hover:font-bold transition-all duration-300 ease-in-out"
          type="submit"
        >
          Update Product
        </button>
      </form>
    </section>
  );
}


// export default function UpdateProductForm({product} : {product: Product}) {

//   const [productName, setProductName] = useState<Product["productName"]>(product.productName);
//   const [brand, setBrand] = useState<Product["brand"]>(product.brand);
//   const [description, setDescription] = useState<Product["description"]>(product.description);
//   const [price, setPrice] = useState<Product["price"]>(product.price);
//   const [inventory, setInventory] = useState<Product["inventory"]>(product.inventory);
//   const [categories, setCategories] = useState<Product["categories"]>(product.categories);

//   const [imageFields, setImageFields] = useState<ImageField[]>(
//     product.images.map(value => getDefault(value))
//   );

// //   const { data: session } = useSession();
//   // console.log("\nadd product: ", session?.user.id);

//   /// BAGIAN GAMBAR WOI ///
//   //////
//   interface ImageField {
//     id: string;
//     value: string;
//   }

//   function getDefault(imgValue: string): ImageField {
//     return {
//       id: crypto.randomUUID(),
//       value: imgValue,
//     };
//   }

//   // setImageFields(imageFields.map((field) => {
//   //   if (field.id === id) {
//   //     return {
//   //       ...field,
//   //       value: e.target.value,
//   //     };
//   //   }
//   //   return field;  
//   // }));
//   function imageFieldsHandler(
//     id: string,
//     event: React.ChangeEvent<HTMLInputElement>
//   ) {

//     const imageField = imageFields.map(field => {
//       if(field.id === id) {
//         return {
//           ...field,
//           value: event.target.value
//         }
//       }
//       return field
//     })

//     setImageFields(imageField);
//   }

//   function addImageFields() {
//     setImageFields([...imageFields, getDefault("")]);
//   }

//   function deleteImageField(id: string) {
//     setImageFields(imageFields.filter((field) => field.id !== id));
//   }

//   function checkURLValid(_url: string) {
//     const urlRegex = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
//      return urlRegex.test(_url);
//   }
//   ///////
//   /// BAGIAN GAMBAR WOI ///

//   const handler = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     try {
//       const images = imageFields.filter(field=> checkURLValid(field.value)).map(field => {
//         return field.value
//       })
//       console.log("INI GAMBAR bos",images)

//       const res = await fetch(`http://localhost:3000/api/product/seller/updateProduct?id=${product?._id}`, {
//         method: "PUT",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify({
//         //   userId: session?.user?.id,
//           newProductName: productName,
//           newBrand: brand,
//           newDescription: description,
//           newCategories: categories,
//           newPrice: price,
//           newInventory: inventory,
//           newImages: images,
//         }),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to add new product");
//       } else {
//         window.location.replace("/product/seller/productList");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   function removeCategory(category: string) {
//     setCategories(categories.filter((i) => i !== category)); // hapus category yang isinya === cat
//   }
//   const categoryHandler = async (
//     event: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     const value = event.target.value; //pants | shirt | animal | food | and | so on
//     if (value === "default") return;
//     if (categories.includes(value)) {
//       setCategories(categories.filter((i) => i !== value));
//     } else {
//       setCategories([...categories, value]);
//     }

//     event.target.value = "default";
//   };

//   // console.log("update product images:", images)
//   // console.log("\nimages field", imageFields)


//   return (
//     <section className="flex justify-center">
//       <form
//         onSubmit={handler}
//         className="grid grid-cols-1 shadow-sm ring-2 divide-y-4 divide-slate-400/25 space-y-3 p-3 mt-20 w-5/12"
//       >
//         <input
//           value={productName}
//           onChange={(event) => setProductName(event.target.value)}
//           placeholder="Product Name"
//           type="text"
//         />
//         <input
//           value={brand}
//           onChange={(event) => setBrand(event.target.value)}
//           placeholder="Product Brand"
//           type="text"
//         />
//         <input
//           value={description}
//           onChange={(event) => setDescription(event.target.value)}
//           placeholder="Product Description"
//           type="text"
//         />

//         <label htmlFor="category">Select Categories:</label>
//         <select onChange={categoryHandler}>
//           <option value="default">Please select category</option>
//           <option value="shirt">Shirt</option>
//           <option value="pants">Pant</option>
//           <option value="spareparts">Motor Bike`s Sparepart</option>
//           <option value="electronic">Electronic</option>
//           <option value="tool">Tool</option>
//         </select>

//         <div className="flex gap-2">
//           <div>Selected Categories</div>
//           {categories.map((category) => {
//             return (
//               <button
//                 onClick={() => removeCategory(category)}
//                 className="bg-blue-500 px-2 py-0.5 rounded-md text-white"
//                 key={category}
//               >
//                 {category}
//               </button>
//             );
//           })}
//         </div>

        
//         <input
//           value={price}
//           onChange={(event) => setPrice(parseFloat(event.target.value))}
//           placeholder="Product Price"
//           type="number"
//         />
//         <input
//           value={inventory}
//           onChange={(event) => setInventory(parseFloat(event.target.value))}
//           placeholder="Product Amount"
//           type="number"
//         />
        
//         {/* 1. set up UI for the user, the behaviour that needs to implemented contains action that user can
//         ADD input field and also DELETE the input field and its value (image field) */}

//         {/* 2. This Code below represents the IMAGES that has been being inputed from the input field */}
//         <div className="space-y-3 pt-5"> 
//           <div className="text-xl font-semibold">Image Urls</div>
//           <div className="flex flex-col gap-1">
//             {imageFields.map((field) => { /*2.1 imageFields represents property that has been created and also being iterate to get each field*/
//               return (
//                 <div 
//                   key={field.id} 
//                   className={`${field.value && !checkURLValid(field.value) ? 'ring-red-500 ring': '' } flex gap-3 bg-black/5 px-2 py-1`}
//                 > {/* 2.2 each field contains properties of id and value */}

//                   <input
//                     value={field.value} // this value attribute represents the value of property of imageFields
//                     className="w-full text-white text-slate-900 focus:outline-none bg-transparent"
//                     placeholder="Input URL`s image"
//                     onChange={(e) => imageFieldsHandler(field.id, e)} //2.3 
//                   />
//                   <button
//                     onClick={() => deleteImageField(field.id)}
//                     type="button"
//                     className=""
//                   >x
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//           <button
//             type="button"
//             className="bg-blue-500 text-white px-4 py-2 rounded-xl"
//             onClick={addImageFields}
//           >
//             Add More URLs Image
//           </button>
//         </div>

//         {/* {insertImageField.map((add, index) => {
//           return <div key={index}>{add}</div>;
//         })} */}

//         <button
//           className="w-32 outline hover:outline-blue-500 justify-self-center"
//           type="submit"
//         >
//           Submit Button
//         </button>
//       </form>
//     </section>
//   );
// }
