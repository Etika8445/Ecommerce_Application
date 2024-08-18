import Cardcart from "./Cardcart";
import { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import axios from "axios";
import { setprice, clearCart } from "../../Reducers/CartSlice";
const ShowCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [productDetailsMap, setProductDetailsMap] = useState({});
    const id = useSelector((state) => state.user.userid);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                dispatch(clearCart());
                const response = await axios.get(`https://ecommerce-application-owt9.onrender.com/api/v1/cart/${id}`);   //get the cart by id
                const items = response.data;
                setCartItems(items);

                const productRequests = items.map(item => axios.get(`https://ecommerce-application-owt9.onrender.com/api/v1/products/${item.productId}`));  //get product by using the id present in the cart
                const productResponses = await Promise.all(productRequests);

                const productMap = productResponses.reduce((map, response, index) => {
                    map[items[index].productId] = response.data.message;
                    return map;
                }, {});

                setProductDetailsMap(productMap);
                items.forEach(item => {              //upadting price when the user Login in the cartReducer
                    const product = productMap[item.productId];
                    if (product) {
                        dispatch(setprice({
                            productId: item.productId,
                            userId: id,
                            subprice: item.quantity * product.price
                        }));
                    }
                });
            } catch (err) {
                console.error("Failed to fetch cart or product details:", err);
            }
        };
        fetchProducts();
    }, [id,dispatch]);
    
    //Cart card layout 
    return (
        <>
            <div className="w-auto h-20 md:flex items-center border-b-2 cursor-context-menu place-content-center ml-3 mr-3 pb-2 font-bold text-xl hidden">
                <div className="w-[169px] pl-[30px]">PRODUCT</div>
                <div className="md:w-[26%] text-center">NAME</div>
                <div className="md:w-[15%]">PRICE</div>
                <div className="md:w-[22%]">QUANTITY</div>
                <div className="w-[15%]">SUBPRICE</div>
            </div>
            <div className="lg:h-[100vh] lg:pb-20 lg:overflow-y-scroll" style={{ scrollbarWidth: "none" }}>
                {cartItems.map((item,id) => {
                    const product = productDetailsMap[item.productId];
                    if (product) {         //check whether there are any product to send or not
                        return (
                            <Cardcart
                                key={id}
                                product={product}
                                items={item}
                            />
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
        </>
    );
};

export default ShowCart;
