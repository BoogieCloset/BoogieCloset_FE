import styles from "./topNavigationBar.module.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";

export const TopNavigationBar = ({ cart, products = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/">
          <h1 className={styles.logo}>
            <img src="/images/logo.png" alt="logo" />
          </h1>
        </Link>
        <div className={styles.input_wrap}>
          <input
            type="text"
            placeholder="상품을 검색"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyUp={(event) => event.key === "Enter" && handleSearch()}
          />
          <img
            src="/images/icon-search.svg"
            alt="search"
            onClick={handleSearch}
            style={{ cursor: "pointer" }}
          />
          {searchResults.length > 0 && (
            <div className={styles.searchResults}>
              {searchResults.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  onClick={() => setSearchResults([])}
                >
                  {product.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.menu}>
        <Link to="/cart">
          <div className={styles.shopping_cart}>
            <img src="/images/icon-shopping-cart.svg" alt="cart" />
            <span>장바구니</span>
            {cart.length >= 1 ? (
              <div className={styles.shopping_cart_count}>
                <p>{cart.length}</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </Link>
        <Link to="">
          <div className={styles.mypage}>
            <img src="/images/icon-user.svg" alt="user" />
            <span>고객센터</span>
          </div>
        </Link>
        <Link to="">
          <div className={styles.mypage}>
            <img src="/images/icon-user.svg" alt="user" />
            <span>로그인</span>
          </div>
        </Link>
      </div>
    </header>
  );
};