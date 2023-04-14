import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../utils/getConfig";

const cartSlice = createSlice({
  name: "cart",
  initialState: null,
  reducers: {
    setCart: (state, action) => action.payload,
  },
});

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;

export const getCartThunk = () => (dispatch) => {
  const URL = "https://e-commerce-api-v2.academlo.tech/api/v1/cart";

  axios
    .get(URL, config)
    .then((res) => dispatch(setCart(res.data)))
    .catch((err) => console.log(err));
};
