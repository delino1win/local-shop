import FeaturedProduct from "./components/product/featuredProduct";


const getAllProduct = async () => {
    const baseUrl = process.env.NEXTAUTH_URL as string
    if(!baseUrl) return 
    try {
        const res = await fetch(`${baseUrl}/api/product`, {
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