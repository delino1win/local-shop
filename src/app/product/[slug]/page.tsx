import DetailProduct from "@/app/components/product/detailProduct"
import { headers } from "next/headers"


const getDetailProduct = async (id: Product["userId"]) => {
    try {
        const res = await fetch(`http://localhost:3000/api/product/detail?id=${id}`, {
            cache: 'no-store'
        })
        if(!res.ok) return console.log("res not ok")

        const detailProduct = await res.json();
        
        // console.log(detailProduct)

        if(!detailProduct) return

        return detailProduct;
    } catch (error) {
        console.log(error)
    }
}

const Page = async ({params} : {params: {slug: string}}) => {

    const { slug } = await params; //slug references from the id in the featured product list which is Product Listed by ID
    const detailProduct = await getDetailProduct(slug); //get the detailed product by id
    
    if(!detailProduct) return 

    // console.log("product console from page: ", detailProduct)

    return (
        <section>
            <DetailProduct detail={detailProduct} />
        </section>
    )
}

export default Page