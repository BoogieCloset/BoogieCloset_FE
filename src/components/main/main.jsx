import styles from "./main.module.css";
import { EventBanner } from "../eventBanner/eventBanner";
import { Product } from "../products/product";
import { Sidebar } from "../sidebar/sidebar";
import { useEffect, useState } from "react";
import { getProducts } from "../../service/fetcher";

const categories = ["전체", "top", "outer", "pants", "skirt", "shoes", "accessory"];

export const Main = ({ products, setProducts, convertPrice }) => {
  const [selectedCategory, setSelectedCategory] = useState("전체");

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data.data.products);
    });
  }, [setProducts]);

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