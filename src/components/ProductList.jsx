import axios from "axios";
import { useEffect } from "react";

const ProductList = ({products, setProducts, getProducts}) => {

  const handleAmount = async (item) => {
    try {
      await axios.put(`https://6615610db8b8e32ffc7ac40a.mockapi.io/products/${item.id}`, item);
    } catch (error) {
      console.log(error);
    }
    getProducts();
  };

  const handleRemove = async (item) => {
    try {
      await axios.delete(`https://6615610db8b8e32ffc7ac40a.mockapi.io/products/${item.id}`);
    } catch (error) {
      console.log(error);
    }
    getProducts();
  };
  

  return (
    <div>
      {products.map((item) => (
      <div className="productContainer" key={item.id}>
        <img src={item.image} alt={item.id}/>
        <h2>{item.name}</h2>
        <p>
          {(item.price - (item.price / 100 * item.dampingRate)).toFixed(2)} <span className="text-decoration-line-through">{Number(item.price).toFixed(2)}</span>
        </p>
        <div>
          <button onClick={() => { item = {...item, amount: item.amount - 1,}; handleAmount(item);}}>
          <i className="fa-solid fa-minus"></i>
          </button>
          <span>{item.amount}</span>
          <button onClick={() => { item = {...item, amount: Number(item.amount) + 1,}; handleAmount(item);}}>
          <i className="fa-solid fa-plus"></i>
          </button>
        </div>
        <button onClick={() => handleRemove(item)}>
          <i className="fa-solid fa-trash"></i> Remove
        </button>
        <p>Product Total: {(item.amount * (item.price - (item.price / 100 * item.dampingRate))).toFixed(2)}</p>
      </div>
      ))}
      

      <div className="total">
        <p>Subtotal</p>
        <p>Tax(20%)</p>
        <p>Shipping</p>
        <p>Total</p>
      </div>
    </div>
  );
};

export default ProductList;


