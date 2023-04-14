import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { getCartThunk } from "../../store/slices/cart.slice";
import config from "../../utils/getConfig";

const CartItem = ({ prodInfo }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    const URL = `https://e-commerce-api-v2.academlo.tech/api/v1/cart/${prodInfo.id}`;
    axios
      .delete(URL, config)
      .then((res) => {
        console.log(res.data);
        dispatch(getCartThunk());
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <article>
      <header>
        <img src={prodInfo.product.images[0].url} alt="" />
      </header>
      <div>
        <h4>{prodInfo.product.brand}</h4>
        <h3>{prodInfo.product.title}</h3>
        <ul>
          <li>
            <span>Unit Price</span>
            <span>{prodInfo.product.price}</span>
          </li>
          <li>
            <span>Quantity</span>
            <span>{prodInfo.quantity}</span>
          </li>
        </ul>
      </div>
      <button>
        <i onClick={handleDelete} className="bx bx-trash-alt"></i>
      </button>
    </article>
  );
};

export default CartItem;
