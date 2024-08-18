import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import Products from "../../pages/Products";
import Cart from "../../pages/Cart";
import ProtectedRoute from "./ProtectedRoute";
import { useSelector } from "react-redux";
 
const Header = () => {
  const isloggedin = useSelector((state) => state.user.isloggedin);
  return (
    <>
      <Routes>{
        isloggedin ? <Route element={<ProtectedRoute />}>
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Navigate to="/products" />} />
      </Route> :
        
        <Route path="/" element={<Login />} />
        }
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default Header;
