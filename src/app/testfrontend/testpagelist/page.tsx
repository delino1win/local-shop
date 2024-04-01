import Link from "next/link";
import React from "react";

const getTestList = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/testfrontend/teststring", {
            cache: "no-store"
        })

        if(!res.ok) {
            throw new Error ("Fail To Fetch Data");
        }

        const testList = await res.json();
        return testList;

    } catch (error) {
        console.log(error)
    }
}

const testPageList = async () => {

    const testList = await getTestList();

    return (
        <>
            {testList.map((testList: any, index: any)  => (
                    <section className="flex justify-center" key={index}>
                        <div className="flex-col space-y-4">
                        <h1>Name of the Product: {testList?.stringFirst}</h1>
                        <h1>Name of the Product: {testList?.stringSecond}</h1>
    
                        <div>===============================================</div>
                    </div>
        
                </section>
            ))}
            <Link href="/testfrontend/testpageform">Add new Test</Link>
        </>
    );
}

export default testPageList;