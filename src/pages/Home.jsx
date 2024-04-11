import ProductBar from "../components/ProductBar";
import ProductList from "../components/ProductList";
import { useState, useEffect } from "react";
import axios from "axios";


const Home = () => {
  const [showProductBar, setShowProductBar] = useState(true);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await axios(
        "https://6615610db8b8e32ffc7ac40a.mockapi.io/products/"
      );
      console.log(res.data);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(products)

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div>
        <h1>Checkout Page</h1>
        <button
          className="btn btn-warning"
          onClick={() => setShowProductBar(!showProductBar)}
        >
          {showProductBar ? "Hide Product Bar" : "Show Product Bar"}
        </button>
      </div>
      <div>
        {showProductBar && <ProductBar getProducts={getProducts} />}
      <ProductList products={products} setProducts={setProducts} getProducts={getProducts}/>
      </div>
    </>
  );
};

export default Home;
