import { Main } from "../components/main/main";

const Home = ({ products, setProducts, cart, setCart, convertPrice }) => {
  return (
    <Main
      products={products}
      setProducts={setProducts}
      convertPrice={convertPrice}
      cart={cart}
      setCart={setCart}
    />
  );
};

export default Home;
