
const getAllProducts = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/product", {
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

export default getAllProducts;