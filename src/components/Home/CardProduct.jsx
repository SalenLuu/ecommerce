import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCartThunk } from "../../store/slices/cart.slice";
import config from "../../utils/getConfig";

const CardProduct = ({ product }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleBtnClick = (e) => {
    const url = "https://e-commerce-api-v2.academlo.tech/api/v1/cart";

    const data = {
      quantity: 1,
      productId: product.id,
    };

    axios
      .post(url, data, config)
      .then((res) => {
        console.log(res.data);
        dispatch(getCartThunk());
      })
      .catch((err) => {
        console.log(err.response);
      });
    e.stopPropagation();
  };

  return (
    <article className="card" onClick={handleClick}>
      <header className="card__img-container">
        <img className="card__img" src={product.images[0].url} alt="" />
      </header>
      <section className="card__body">
        <header className="card__product-info">
          <h3 className="card__product-brand">{product.brand}</h3>
          <h2 className="card__product-name">{product.title}</h2>
        </header>
        <div className="card__price-container">
          <div className="card__product-price-label">Price</div>
          <div className="card__product-price-value">{product.price}</div>
        </div>
        <button className="card__cart-button" onClick={handleBtnClick}>
          <i className="bx bx-cart"></i>
        </button>
      </section>
    </article>
  );
};

export default CardProduct;
