import ShowCart from "../components/cart/ShowCart"
import SummaryCart from "../components/cart/SummaryCart"
import Navbar from "../shared/components/Navbar"
// Cart page
const Cart = () => {
    return (
        <>
            <Navbar />
            <div className="w-full pt-16">
            <div className="h-12 w-full bg-red-500 text-white text-center md:text-3xl text-base font-bold place-content-center">Get 25% Off with Code: SUMMER24</div>
            <h1 className="w-full text-5xl font-bold text-center pt-6 pb-7">YOUR CART </h1>
            <div className="w-full lg:flex block lg:h-100vh">
                <div className="w-full lg:h-[100vh] overflow-hidden lg:w-[70%] lg:pl-[1%] lg:pr-[1%]">
                    <ShowCart />
                </div>
                <div className="lg:w-[28%] w-full">
                    <SummaryCart />
                </div>
            </div>
            </div>
        </>
    )
}

export default Cart