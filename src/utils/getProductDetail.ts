
const getProductDetail = async (productId: string) => {
    try {
        const res = await fetch(`http://localhost:3000/api/product/seller/detail?id=${productId}`, {
            cache: "no-store",
        })
        if(!res.ok) {
            alert("Error Occured, Try Again") 
            return null
        }
    
        const productDetail = await res.json();
        return productDetail;
    } catch (error) {
        console.log(error)
    }
}

export default getProductDetail;
