import React, { useState } from "react";
import { Container, Form, Button, InputGroup } from "react-bootstrap";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import axios from "axios";

const ProductBar = ({ getProducts }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProducts = { name, price, amount, image };
    postProduct(newProducts);
    setName("");
    setPrice("");
    setAmount("");
    setImage("");
  };

  const postProduct = async (newProducts) => {
    try {
      await axios.post(
        "https://6615610db8b8e32ffc7ac40a.mockapi.io/products/",
        newProducts
      );
    } catch (error) {
      console.log(error);
    }
    getProducts();
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit} className="w-75 m-auto">
        <Form.Group className="mb-3" controlId="productName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="productPrice">
          <Form.Label>Product Price</Form.Label>
          <Form.Control
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="productQuantity">
          <Form.Label>Product Quantity</Form.Label>
          <Form.Control
            type="number"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            required
          />
        </Form.Group>

        <Form.Label htmlFor="basic-url">Product Image</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon3">
            https://example.com/
          </InputGroup.Text>
          <Form.Control
            type="url"
            id="basic-url"
            aria-describedby="basic-addon3"
            onChange={(e) => setImage(e.target.value)}
            value={image}
            required
          />
        </InputGroup>
        <Button variant="success" type="submit">
          <MdOutlineAddShoppingCart />
          Add to Cart
        </Button>
      </Form>
    </Container>
  );
};

export default ProductBar;
