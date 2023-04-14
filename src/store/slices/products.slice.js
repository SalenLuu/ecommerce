import { createSlice } from "@reduxjs/toolkit";
import axios, { Axios } from "axios";

const productsSlice = createSlice({
  name: "products",
  initialState: null,
  reducers: {
    setProducts: (state, action) => action.payload,
  },
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;

export const getAllProductsThunk = () => (dispatch) => {
  const URL = "https://e-commerce-api-v2.academlo.tech/api/v1/products";
  axios
    .get(URL)
    .then((res) => dispatch(setProducts(res.data)))
    .catch((err) => console.log(err));
};

export const getProductsByName =
  (text = "", isCategory = false) =>
  (dispatch) => {
    let URL;
    if (isCategory) {
      URL = `https://e-commerce-api-v2.academlo.tech/api/v1/products?categoryId=${text}`;
    } else {
      URL = `https://e-commerce-api-v2.academlo.tech/api/v1/products?title=${text}`;
    }
    axios
      .get(URL)
      .then((res) => dispatch(setProducts(res.data)))
      .catch((err) => console.log(err));
  };
