import styles from "./topNavigationBar.module.css";
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../../../service/axiosinstance";


export const TopNavigationBar = ({ cart, setCart, products = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const searchRef = useRef(null);
  const location = useLocation();

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
    axiosInstance.get('/carts/viewAll', {
      headers: {
        Authorization: `${token}`,
      }
    })
      .then(response => {
        const cartData = response.data.map(item => ({
          itemId: item.cartItemDTO.itemId,
          name: item.cartItemDTO.name,
          price: item.cartItemDTO.price,
          category: item.cartItemDTO.category,
          imageUrl: item.cartItemDTO.imageUrl,
          quantity: item.quantity,
        }));
        setCart(cartData);
      })
      .catch(error => {
        console.error(error);
      });
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/logout', {}, {
        withCredentials: true, 
      });

      localStorage.removeItem('token');
      setIsLoggedIn(false);
      window.location.href = '/';
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  const handleMyPageClick = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    } else {
      window.location.href = '/mypage';
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axiosInstance.get(`/items/search?keyword=${encodeURIComponent(searchTerm)}`);
      console.log(response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.error('검색 실패:', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef]);

  useEffect(() => {
    setSearchTerm(''); 
    setSearchResults([]); 
  }, [location.pathname]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}  ref={searchRef} >
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
        <div className={styles.mypage} onClick={handleMyPageClick} style={{ cursor: 'pointer' }}>
          <img src="/images/icon-user.svg" alt="user" />
          <span>내 정보</span>
        </div>
        {isLoggedIn ? (
          <div className={styles.mypage} onClick={handleLogout} style={{ cursor: 'pointer' }}>
            <img src="/images/icon-user.svg" alt="user" />
            <span>로그아웃</span>
          </div>
        ) : (
          <Link to="/login">
            <div className={styles.mypage}>
              <img src="/images/icon-user.svg" alt="user" />
              <span>로그인</span>
            </div>
          </Link>
        )}
      </div>
    </header>
  );
};