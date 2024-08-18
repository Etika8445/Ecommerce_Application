import ShowProduct from "../components/product/ShowProduct"
import Navbar from "../shared/components/Navbar"
const Products = () => {
  return (
    <>
         <Navbar/>
        <div className="pt-16">
        <ShowProduct/>
        </div>

    </>
  )
}

export default Products