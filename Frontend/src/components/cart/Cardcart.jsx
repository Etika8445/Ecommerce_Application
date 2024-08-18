import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setprice , removeprice} from "../../Reducers/CartSlice";
import deletes  from "../../assets/delete.png";

const Cardcart = (props) => {
    const prices=props.product.price;         
    const quantity =props.items.quantity;
    const navigate = useNavigate();
    const [initquantity, setquantity] = useState(quantity);      //quantity
    const [initprice, setprices] = useState(prices*quantity);    //price
    const dispatch = useDispatch();

    const update =async (val) => {                         //called when the user click on '+' or '-'
        let newQuantity = initquantity;
        if (val === '+' && initquantity < 10) {
            newQuantity = initquantity + 1
        } else if (val === '+' && initquantity === 10) {
            alert("Quantity exceeded");
            return;
        } else if (val === '-' && initquantity > 1) {
            newQuantity = initquantity - 1;
        }
        setprices(prices * newQuantity);
        setquantity(newQuantity);
        const token = Cookies.get('token');
        if (token) {
            console.log('Token:', token);
        }
        else {
            console.log('No token found');
            navigate('/');
        }
        const updateData = {
            productId: props.product._id,
            quantity: newQuantity,
            userId: props.items.userId
        };
        try {
            const response = await axios.post("https://ecommerce-application-owt9.onrender.com/api/v1/cart", updateData);              //adding to the cart
            console.log(response.data);
            dispatch(setprice({productId:props.product._id,userId:props.items.userId,subprice:prices*newQuantity}));    //updating CartReducer
        }
        catch (err) {
            console.log('Error is ', err);
        }

    };
    const removeProduct=async()=>{                                    //called then the Product is removed by user
        const token = Cookies.get('token');
        if (token) {
            console.log('Token:',token);
        }
        else {
            console.log('No token found');
            navigate('/');
        }
        const updateData = {
            "userid": props.items.userId,
            "productid": props.product._id
        };
        console.log(updateData);
        
        try {                                                   //deleted from the cart
            const response = await axios.delete(`https://ecommerce-application-owt9.onrender.com/api/v1/cart/${props.items.userId}/${props.product._id}`);
            console.log(response.data);
            dispatch(removeprice({productId:props.product._id,userId:props.items.userId}));
            window.location.reload();
        }
        catch (err) {
            console.log('Error is ', err);
        }     
    }
    //cart card 
    return (
        <>                       
            <div className="w-full md:w-auto md:h-44 md:flex items-center border-b-2 cursor-context-menu place-content-center pb-4 md:ml-3 md:mr-3 relative transform hover:scale-105 transition duration-300 ease-in-out hover:shadow-lg" key={props.items._id}>
                <div className="absolute top-0 right-0 mr-9 mt-5 transform hover:scale-125 transition duration-300 ease-in-out">
                    <img src={deletes} className="h-6 w-6" onClick={removeProduct}/>
                </div>
                <div className="md:h-full md:w-[169px] w-full h-[180px] pt-[20px] md:pl-[15px] mr-4 flex justify-center">
                    <img className="md:h-[129px] h-[145px] w-[129px] rounded-md" src={props.product.image} alt={props.product.name}/>
                </div>
                <div className="font-semibold text-2xl md:w-[26%] text-center text-red-500">
                    <p>{props.product.name}</p>
                    <p className="text-gray-500 text-lg lg:text-lg">Indian Ethnic</p> 
                </div>
                <span className="font-bold text-xl md:w-[15%] flex mt-3 md:mt-0 ml-9 md:ml-0">
                    <p className="md:hidden mb-3">Price:&nbsp;</p>
                    <p className="text-slate-600 font-semibold md:font-bold md:text-black">₹ {props.product.price}</p>
                </span>
                <div className="font-semibold text-2xl md:w-[22%] flex bg-white rounded-md ml-9 md:ml-0 h-9">
                    <p className="md:hidden font-bold text-xl mb-10">Quantity:&nbsp;&nbsp;</p>
                    <p className="w-9 text-center border-2 border-gray-300 rounded-l-md " onClick={() => update('-')}>-</p>
                    <p className="w-9 text-center text-lg pt-1 border-t-2 border-b-2 border-gray-300">{initquantity}</p>
                    <p className="w-9 text-center border-2 border-gray-300 rounded-r-md" onClick={() => update('+')}>+</p>
                </div>
                <div className="font-bold text-xl md:w-[15%] flex mt-3 md:mt-0 ml-9 md:ml-0">
                    <p className="md:hidden ">SubPrice:&nbsp;</p>
                    <p className="text-slate-600 font-semibold md:font-bold md:text-black">₹ {initprice}</p>
                </div>
            </div>
        </>
    );
};

Cardcart.propTypes = {
    product: PropTypes.object,
    items: PropTypes.object,
};

export default Cardcart;
