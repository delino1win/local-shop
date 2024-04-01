// "use client"
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import Dropzone from 'react-dropzone';
// import Image from "next/image";

// export default function AddProductForm () {
//     const router  = useRouter();

//     const [productName, setProductName] = useState("");
//     const [brand, setBrand] = useState("");
//     const [price, setPrice] = useState(0);
//     const [inventory, setInventory] = useState(0);
//     const [images, setImages] = useState<string[]>([]);
//     const [description, setDescription] = useState("");

//     const handler = async (event: any) => {
//         event.preventDefault();

//         if(!productName) {
//             alert("Product Name Required!");
//         }else if(!price) {
//             alert("Price Required!");
//         } else if(!inventory) {
//             alert("Product Amount Required");
//         }

//         try {
//             const res = await fetch("https://localhost:3000/api/product/addProduct", {
//                 method: "POST",
//                 headers: {
//                     "Content-type": "application/json",
//                 },
//                 body: JSON.stringify({productName, brand, price, inventory, images, description})
//             })


//             if(!res.ok) {
//                 throw new Error("Failed to add new product");
//             } else {
//                 await alert("Product Successfully Created");
//                 await router.push("/");
//             }
//         } catch (error) {
//             alert(error);
//             console.log(error)
//         }

//     const onDrop = (dropedImages: any) => {
//         const newImageData = dropedImages.map((file: any) => {
//             url: URL.createObjectURL(file);
//         });
//         setImages([...images, newImageData]);
//     };
        

//         return (
//             <form onSubmit={handler} className="flex flex-col space-y-3 justify-center">
//                 <input 
//                     value={productName}
//                     onChange={event => setProductName(event.target.value)}
//                     placeholder="Product Name"
//                     type="text"
//                 />
//                 <input 
//                     value={brand}
//                     onChange={event => setBrand(event.target.value)}
//                     placeholder="Product Brand"
//                     type="text"
//                 />
//                 <input 
//                     value={price}
//                     onChange={event => setPrice(parseFloat(event.target.value))}
//                     placeholder="Product Price $"
//                     type="number"
//                 />
//                 <input 
//                     value={inventory}
//                     onChange={event => setInventory(parseFloat(event.target.value))}
//                     placeholder="Total Product"
//                     type="text"
//                 />
//                 <div>
//                     <Dropzone onDrop={onDrop} />
//                     <Image src={`${images}`} alt="" height={10} width={10} />
//                 </div>

//                 <input 
//                     value={description}
//                     onChange={event => setDescription(event.target.value)}
//                     placeholder="Product Description"
//                     type="text"
//                 />
//                 <button type="submit">Submit</button>
//             </form>
//         )
//     }
// }