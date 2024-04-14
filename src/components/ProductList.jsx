import axios from "axios";
import { Table } from "react-bootstrap";

const ProductList = ({ products, setProducts, getProducts }) => {
  let subTotal = 0;
  let tax = 0;
  let shipping = 30

  const handleAmount = async (item) => {
    try {
      await axios.put(
        `https://6615610db8b8e32ffc7ac40a.mockapi.io/products/${item.id}`,
        item
      );
    } catch (error) {
      console.log(error);
    }
    getProducts();
  };

  const handleRemove = async (item) => {
    try {
      await axios.delete(
        `https://6615610db8b8e32ffc7ac40a.mockapi.io/products/${item.id}`
      );
    } catch (error) {
      console.log(error);
    }
    getProducts();
  };

  return (
    <div>
      {products.map((item) => {
        subTotal += item.amount * (item.price - (item.price / 100) * item.dampingRate);
        tax = subTotal / 5
        return (
          <div className="productContainer my-3" key={item.id}>
            <div className="img-container">
              <img src={item.image} alt={item.id} />
            </div>
            <div className="text-container">
              <h4>{item.name}</h4>
              <p className="text-success">
                {(item.price - (item.price / 100) * item.dampingRate).toFixed(2)}{" "}
                <span className="text-decoration-line-through text-danger">
                  {Number(item.price).toFixed(2)}
                </span>
              </p>
              <div className="w-100 border border-3 d-flex justify-content-center p-2 bg-white">
                <button
                  className="bg-danger text-white px-2 border-0"
                  onClick={() => {
                    item = { ...item, amount: item.amount - 1 };
                    handleAmount(item);
                  }}
                >
                  <i className="fa-solid fa-minus"></i>
                </button>
                <span className="px-2">{item.amount}</span>
                <button
                  className="bg-success text-white px-2 border-0"
                  onClick={() => {
                    item = { ...item, amount: Number(item.amount) + 1 };
                    handleAmount(item);
                  }}
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
              <button
                className="w-100 bg-danger text-white border-0 p-2"
                onClick={() => handleRemove(item)}
              >
                <i className="fa-solid fa-trash"></i> Remove
              </button>
              <p className="my-2">
                Product Total: $
                {(item.amount *
                  (item.price - (item.price / 100) * item.dampingRate)
                ).toFixed(2)}
              </p>
            </div>
          </div>
        );
      })}
      {subTotal ? 
      <div className="prices">
        <Table striped bordered hover>
          <tbody>
            <tr className=" text-end">
              <th className=" text-start">Subtotal</th>
              <td>
                $ <span>{subTotal.toFixed(2)}</span>{" "}
              </td>
            </tr>
            <tr className=" text-end">
              <th className=" text-start">Tax(20%)</th>
              <td>
                $ <span>{tax.toFixed(2)}</span>{" "}
              </td>
            </tr>
            <tr className=" text-end">
              <th className=" text-start">Shipping</th>
              <td>
                $ <span>{subTotal ? shipping.toFixed(2) : "0.00"}</span>{" "}
              </td>
            </tr>
            <tr className=" text-end">
              <th className=" text-start">Total</th>
              <td>
                $ <span>{subTotal ? (subTotal + tax + shipping).toFixed(2) : "0.00"}</span>{" "}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      : ""}
    </div>
  );
};

export default ProductList;
