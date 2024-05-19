import styles from "./main.module.css";
import { EventBanner } from "../eventBanner/eventBanner";
import { Product } from "../products/product";
import { Sidebar } from "../sidebar/sidebar";
import { useEffect, useState } from "react";
import { getProducts } from "../../service/fetcher";
import axios from "axios";

const categories = ["전체", "top", "outer", "pants", "skirt", "onepiece", "shoes", "accessory"];

export const Main = ({ products, setProducts, convertPrice }) => {
  const sortProduct = (type) => {
    if (type === "recent") {
      const newProduct = [...products];
      newProduct.sort((a, b) => a.id - b.id);
      setProducts(newProduct);
    } else if (type === "row") {
      const newProduct = [...products];
      newProduct.sort((a, b) => a.price - b.price);
      setProducts(newProduct);
    } else if (type === "high") {
      const newProduct = [...products];
      newProduct.sort((a, b) => b.price - a.price);
      setProducts(newProduct);
    }
  };
  const [selectedCategory, setSelectedCategory] = useState("전체");

  useEffect(() => {
    axios.get('/items/list')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products", error);
      });
  }, []);

  const filteredProducts = selectedCategory === "전체" 
    ? products 
    : products.filter((product) => product.category === selectedCategory);

  return (
    <div className={styles.mainContent}>
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className={styles.mainContent}>
      <div className={styles.filter}>
        <p onClick={() => sortProduct("recent")}>최신순</p>
        <p onClick={() => sortProduct("row")}>낮은 가격</p>
        <p onClick={() => sortProduct("high")}>높은 가격</p>
      </div>
        <main className={styles.flex_wrap}>
          {filteredProducts.map((product) => {
            return (
              <Product
                key={`key-${product.id}`}
                product={product}
                convertPrice={convertPrice}
              />
            );
          })}
        </main>
      </div>
    </div>
  );
};