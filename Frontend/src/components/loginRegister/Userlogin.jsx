import { useRef} from "react"
import { NavLink, useNavigate } from "react-router-dom"
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { setid, setisLoggedin } from "../../Reducers/UserSlice";
import axios from "axios";

const Userlogin = () => {
  const dispatch = useDispatch();
  const emailRef =useRef();
  const pwdRef =useRef();
  const navigate= useNavigate();
  const doLogin= async()=>{
      const userInfo={
        'email':emailRef.current.value,
        'password':pwdRef.current.value
      }
      try {
        const response = await axios.post("https://ecommerce-application-owt9.onrender.com/api/v1/users/login", userInfo);    //checking data of user
        if (response.data.success === true) {
          const data = response.data.message;
          console.log(data);
          const token=response.data.token;
          Cookies.set('token', token, { expires: 7 });
          dispatch(setid(data._id));
          dispatch(setisLoggedin(true));
          navigate('/products');
        } 
        else {
          toast.error("Password or Email Incorrect", {
            position: "bottom-center",
          });
        }      
      } 
      catch (err) {
          toast.error("Password or Email Incorrect", {
            position: "bottom-center",
          });
          console.log('Error is ', err);
      }
  }
  return (
    <>
        <div className="h-full md:w-[50%] w-full text-center flex flex-col justify-center items-center ">
            <h1 className=" font-extrabold md:text-5xl text-3xl pb-20">LOGIN</h1>
            <input  className="h-8 w-48 border-b-2 outline-none" type="email" placeholder="Email" ref={emailRef}></input><br/><br/>
            <input className="h-8 w-48 border-b-2 outline-none" type="password" placeholder="Password" ref={pwdRef}></input><br/><br/>
            <button className="h-10 w-48 bg-red-500 text-white rounded-md" type="submit" onClick={doLogin}>LOGIN</button><br/>
            <NavLink to="/register"><p className="hover:text-red-500 underline">or Get Registered</p></NavLink>
            <ToastContainer/>
        </div>
    </>
  )
}

export default Userlogin
