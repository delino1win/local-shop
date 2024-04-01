"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Dropzone from 'react-dropzone';
import Image from "next/image";


const AddProductForm = () => {
    const router = useRouter();
    const [stringFirst, setStringFirst] = useState("");
    const [stringSecond, setStringSecond] = useState("");

    const handler = async (event: any) => {
        event.preventDefault();
        try {
            const res = await fetch("http://localhost:3000/api/testfrontend/teststring", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({stringFirst, stringSecond})

            })
        
            if(!res.ok) {
                throw new Error("Failed to add new product");
            } else {
                router.push("/testfrontend/testpagelist");
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <section className="flex justify-center" >
            <form onSubmit={handler} className="grid grid-cols-1 border-4 p-3 mt-20 w-5/12">
                <input
                    value={stringFirst}
                    onChange={event => setStringFirst(event.target.value)}
                    placeholder="Product Name"
                    type="text"/>
                <input
                    value={stringSecond}
                    onChange={event => setStringSecond(event.target.value)}
                    placeholder="Product Brand"
                    type="text"/>
                <button type="submit">Submit Button</button>
            </form>
        </section>
    )
}

export default AddProductForm;