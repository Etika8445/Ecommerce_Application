import PropTypes from "prop-types";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import {useSelector} from "react-redux";
import { useDispatch } from "react-redux";
import { setprice } from "../../Reducers/CartSlice";

const Productcard = (props) => {
    const id = useSelector((state) => state.user.userid);   //user id from UserReducer
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const addtocart = async () => {            //called when clicked on add to cart button
        const token = Cookies.get('token');
        if (token) {
            console.log('Token:', token);
        }
        else {
            console.log('No token found');
            navigate('/');
        }
        const CartInfo = {
            'productId': props._id,
            'quantity':1,
            'userId': id,
        }
        console.log(CartInfo);
        try {
            const response = await axios.post("https://ecommerce-application-owt9.onrender.com/api/v1/cart", CartInfo, {  
                withCredentials: true,
                headers: {
                    Cookie:`token=${token}`
                }
            });
            dispatch(setprice({productId:props._id, userId:id,subprice:Number(props.price)}));    //updating CartReducer
            console.log(response.data);
            toast.success("Password or Email Incorrect", {
                position: "bottom-center",
              });
        }
        catch (err) {
            console.log('Error is ', err);
        }
    }

return (
    <>
        <div className="fixed-box rounded-lg transform hover:scale-105 transition duration-300 ease-in-out hover:shadow-lg" key={props._id}>
            <img className='h-[300px] w-full rounded-lg' src={props.image} />
            <div className="font-semibold text-lg p-2 w-full">
                <p>{props.name}</p>
                <p className="font-bold">Under ₹ {props.price}</p>
                <button onClick={addtocart} className="h-9 w-full font-normal mt-2 border-red-500 text-red-500 rounded-md border hover:bg-red-500 hover:text-white text-center" >
                    Add to Cart</button>
            </div>
        <ToastContainer/>

        </div>
    </>
);
}
Productcard.propTypes = {
    _id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string
}
export default Productcard;





