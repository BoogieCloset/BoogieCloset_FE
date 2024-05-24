import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { TopNavigationBar } from "./components/header/topNavigationBar/topNavigationBar";
import { Login } from "./components/login/login";
import { Register } from './components/register/register';
import Home from "./pages/home";
import Product from "./pages/product";
import Basket from "./pages/basket";
import MyInfo from "./pages/myinfo";
import { useState,useEffect } from "react";
import Payment from "./pages/payment";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const convertPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <BrowserRouter>
      <TopNavigationBar cart={cart} setCart={setCart} products={products} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              products={products}
              setProducts={setProducts}
              convertPrice={convertPrice}
            />
          }
        />
        <Route
          path="/product/:id"
          element={
            <Product
              convertPrice={convertPrice}
              cart={cart}
              setCart={setCart}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Basket cart={cart} setCart={setCart} convertPrice={convertPrice} />
          }
        />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/mypage" element={<MyInfo />} />
        <Route path="/order" element={<Payment convertPrice={convertPrice}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
