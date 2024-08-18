import { useEffect, useState } from "react";
import axios from "axios";
import Productcard from "./Productcard";

const ShowProduct = () => {
  const [productsDetails, setProductsDetails] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://ecommerce-application-owt9.onrender.com/api/v1/products");   //getting product
        setProductsDetails(response.data.message);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <div className="grid gap-4 pt-10 p-4 w-full place-items-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
        {productsDetails.map((item, key) => (
          <Productcard key={key} {...item} />
        ))}
      </div>
    </>
  );
};

export default ShowProduct;
