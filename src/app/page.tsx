import FeaturedProduct from "./components/product/featuredProduct";


const getAllProduct = async () => {
    try {
        const res = await fetch(`${process.env.BASE_URL as string}/api/product`, {
            cache: "no-store"
        });
        if(!res.ok) return

        const allProductList = await res.json();
        return allProductList
    } catch (error) {
        console.log(error)
        return [] 
    }
}

const Page = async () => {
    const allProductList = await getAllProduct()
 return(
    <div> 
        <FeaturedProduct listProduct={allProductList} />
    </div>
 )
}

export default Page;