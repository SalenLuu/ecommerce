import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartPages/CartItem";
import { getCartThunk } from "../store/slices/cart.slice";
import config from "../utils/getConfig";

const CartPage = () => {
  const { cart } = useSelector((state) => state);

  const [totalPrice, setTotalPrice] = useState();
  const dispatch = useDispatch();
  console.log(cart);

  useEffect(() => {
    const result = cart?.reduce(
      (acc, cv) => acc + cv.quantity * Number(cv.product.price),
      0
    );
    setTotalPrice(result);
  }, [cart]);

  const handlePurchase = () => {
    const URL = "https://e-commerce-api-v2.academlo.tech/api/v1/purchases";
    axios
      .post(URL, {}, config)
      .then((res) => {
        console.log(res.data);
        dispatch(getCartThunk());
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
        {cart?.map((prodInfo) => (
          <CartItem key={prodInfo.id} prodInfo={prodInfo} />
        ))}
      </div>
      <footer>
        <h2>
          <span>Total: </span>
          {totalPrice}
        </h2>
        <button onClick={handlePurchase}>Buy this cart</button>
      </footer>
    </div>
  );
};

export default CartPage;
