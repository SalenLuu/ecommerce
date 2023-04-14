import axios from "axios";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import CardProduct from "../components/Home/CardProduct";
import {
  getAllProductsThunk,
  getProductsByName,
} from "../store/slices/products.slice";

const Home = () => {
  const [categories, setCategories] = useState();
  const [fromTo, setFromTo] = useState({ from: 0, to: Infinity });
  const [hiddePrice, setHiddePrice] = useState(false);
  const [hiddeCategory, setHiddeCategory] = useState(false);
  const { products } = useSelector((state) => state);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      getProductsByName(e.target.inputSearch.value.trim().toLowerCase(), false)
    );
  };

  useEffect(() => {
    const URL = `https://e-commerce-api-v2.academlo.tech/api/v1/categories`;
    axios
      .get(URL)
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err.response));
  }, []);

  const handleClickCategory = (id) => {
    dispatch(getProductsByName(id, true));
  };

  const handleSubmitPrice = (e) => {
    e.preventDefault();
    const from = Number(e.target.from.value.trim());
    const to = +e.target.to.value.trim();

    if (from && to) {
      setFromTo({ from, to });
    } else if (from && !to) {
      setFromTo({ from, to: Infinity });
    } else if (!from && to) {
      setFromTo({ from: 0, to });
    } else {
      setFromTo({ from: 0, to: Infinity });
    }
  };

  const handdleHiddePrice = () => {
    setHiddePrice(!hiddePrice);
  };

  const handdleHiddeCategory = () => {
    setHiddeCategory(!hiddeCategory);
  };

  return (
    <div className="home">
      <aside className="aside">
        <div className="aside__price-container">
          <header className="aside__header">
            <h3 className="aside__header-title">Price</h3>
            <i onClick={handdleHiddePrice} className="bx bx-chevron-down"></i>
          </header>
          <form
            className={`${
              hiddePrice ? "aside__form-filter" : "aside__form-filter-hidde"
            }`}
            onSubmit={handleSubmit}
          >
            {/* aside__form-filter */}
            <div className="aside__input-from-container">
              <label className="aside__input-from-label" htmlFor="from">
                From
              </label>
              <input className="aside__input-from" type="number" id="from" />
            </div>
            <div className="aside__input-to-container">
              <label className="aside__input-to-label" htmlFor="to">
                To
              </label>
              <input className="aside__input-to" type="number" id="to" />
            </div>
            <button className="aside__form-btn">Filter Price</button>
          </form>
        </div>
        <article className="category__container">
          <header className="category__header">
            <h3 className="category__header-title">Category</h3>
            <i
              onClick={handdleHiddeCategory}
              className="bx bx-chevron-down"
            ></i>
          </header>
          <ul
            className={`${
              hiddeCategory ? "category__list" : "category__list-hidde"
            }`}
          >
            <li
              className="category__element"
              onClick={() => {
                dispatch(getAllProductsThunk());
              }}
            >
              All Products
            </li>
            {categories?.map((category) => (
              <li
                className="category__element"
                key={category.id}
                onClick={() => handleClickCategory(category.id)}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </article>
      </aside>
      <div className="home__form-container">
        <form className="home__form" onSubmit={handleSubmit}>
          <input className="home__form-input" type="text" id="inputSearch" />
          <button className="home__form-btn">
            <i className="bx bx-search-alt"></i>
          </button>
        </form>
        <div className="home__products-container"></div>
        {products?.length === 0 ? (
          <h2>This product doesn't exist</h2>
        ) : (
          products
            ?.filter(
              (product) =>
                +product.price >= fromTo.from && +product.price <= fromTo.to
            )
            .map((product) => (
              <CardProduct key={product.id} product={product} />
            ))
        )}
      </div>
    </div>
  );
};

export default Home;
