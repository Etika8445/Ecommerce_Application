import { NavLink, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const UserRegister = () => {
  const emailRef = useRef();
  const pwdRef = useRef();
  const nameRef = useRef();
  const navigate= useNavigate();
  const doRegister = async () => {
    const userInfo = {
      'email': emailRef.current.value,
      'password': pwdRef.current.value,
      'name': nameRef.current.value,
    };
    console.log(userInfo);
    try { 
      const response = await axios.post("https://ecommerce-application-owt9.onrender.com/api/v1/users/register", userInfo);      //sending data 
      // console.log(response.data)
        if (response.data.success === true) {
          navigate("/");
        } 
        else {
          console.log("something wrong");
          toast.error("Please Try Again", {
            position: "bottom-center",
          });
        }
    } 
    catch (err) {
      console.log('Error is ', err);
      toast.error("Fill the Correct Details", {
        position: "bottom-center"
      });
    }
  };

  return (
    <div className="h-full md:w-[50%] w-full text-center flex flex-col justify-center items-center">
      <h1 className="font-extrabold md:text-5xl text-3xl pb-20">User Registration</h1>
      <input
        className="h-8 w-56 border-b-2 outline-none"
        type="name"
        placeholder="Name"
        ref={nameRef}
      /><br /><br />
      <input
        className="h-8 w-56 border-b-2 outline-none"
        type="email"
        placeholder="Email"
        ref={emailRef}
      /><br /><br />
      <input
        className="h-8 w-56 border-b-2 outline-none"
        type="password"
        placeholder="Password"
        ref={pwdRef}
      /><br /><br />
      <button onClick={doRegister} className="h-10 w-56 bg-red-500 text-white rounded-md">
        REGISTER
      </button><br />
      <NavLink to='/'><p className="hover:text-red-500 underline">Already have an account? Sign in</p></NavLink>
      <ToastContainer/>
    </div>
  );
};

export default UserRegister;
