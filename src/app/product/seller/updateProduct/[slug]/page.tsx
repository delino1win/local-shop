import UpdateProductForm from "@/app/components/product/updateProduct";
import getProductDetail from "@/utils/getProductDetail";

interface Params {slug: string}

const UpdateProduct = async ({params} : {params: Params}) => {
  const { slug } = params;
  const productDetail = await getProductDetail(slug);

  console.log("slug", slug)
  console.log("Product Detail", productDetail)
  

  return (
    <>
      <UpdateProductForm product={productDetail} />
    </>
  )
}

export default UpdateProduct