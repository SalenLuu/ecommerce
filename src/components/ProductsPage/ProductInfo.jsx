import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getCartThunk } from "../../store/slices/cart.slice";
import config from "../../utils/getConfig";

const ProductInfo = ({ product }) => {
  const [counter, setCounter] = useState(1);

  const dispatch = useDispatch();

  const handleAdd = () => {
    setCounter(counter + 1);
  };

  const handleMinus = () => {
    if (counter - 1 >= 1) {
      setCounter(counter - 1);
    }
  };

  const handleAddCart = () => {
    const URL = "https://e-commerce-api-v2.academlo.tech/api/v1/cart";
    axios.post(URL, data, config);

    const data = {
      quantity: counter,
      productId: product.id,
    }

      .then((res) => {
        console.log(res.data);
        dispatch(getCartThunk());
        setCounter(1);
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <article>
      <h3>{product?.brand}</h3>
      <h2>{product?.title}</h2>
      <p>{product?.description}</p>
      <footer>
        <section>
          <h4>Price</h4>
          <span>{product?.price}</span>
        </section>
        <section>
          <h4>Quantity</h4>
          <div>
            <div onClick={handleMinus}>-</div>
            <div>{counter}</div>
            <div onClick={handleAdd}>+</div>
          </div>
        </section>
        <button onClick={handleAddCart}>
          Add to cart <i className="bx bx-cart"></i>
        </button>
      </footer>
    </article>
  );
};

export default ProductInfo;
