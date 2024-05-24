import { useParams, useNavigate } from "react-router-dom";
import styles from "./detail.module.css";
import { useEffect, useState } from "react";
import axiosInstance from "../../service/axiosinstance";
import axios from "axios";

export const Detail = ({ convertPrice, cart, setCart}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [count, setCount] = useState(1);
  const [isDirectPurchase, setIsDirectPurchase] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/items/get/${id}`);
        setProduct(response.data);
        console.log(product);
      } catch (error) {
        console.error('Error fetching product', error);
      }
    };
    fetchProduct();
  }, [id]);

  //장바구니 물건
  const handleCart = async () => {
    const cartItem = {
      itemId: product.id,
      quantity: count,
    };
    console.log("보내기 전 cartItem:", cartItem);
  
    if (product.stockQuantity === 0) {
      alert("품절된 상품입니다.");
      return;
    }
    else if (product.stockQuantity < count) {
      alert(`재고가 부족합니다. ${product.stockQuantity} 이하로 구매해주세요.`);
      return;
    }
    else {
    try {
      const result = await axiosInstance.post('/carts/add', cartItem, {
        headers: {
          Authorization: `${localStorage.getItem('token')}`, 
        }
      });
      if(result.status === 200){
        setCart(prevCart => [...prevCart, cartItem]); 
        alert('장바구니에 추가되었습니다.');
      } else {
        console.error('Unexpected status code:', result.status);
      }
    } catch (error) {
      // 오류 처리
      console.error('Error adding item to cart', error);
      alert('장바구니에 이미 존재하는 물건입니다.');
    }
  }
  };

    //product_detail 수량 관리
  const handleQuantity = (type) => {
    if (type === "plus") {
      setCount(count + 1);
    } else {
      if (count === 1) return;
      setCount(count - 1);
    }
  };

  const handleBuyNow = () => {
    if (product.stockQuantity === 0) {
      alert("품절된 상품입니다.");
      return;
    }
    else if (product.stockQuantity < count) {
      alert(`재고가 부족합니다. ${product.stockQuantity} 이하로 구매해주세요.`);
      return;
    }
    else {
    const orderItem = [product].map(item => ({
      itemId: product.id,
      quantity: count,
      price: product.price,
      name: product.name,
      imageUrl: product.imagePath
    }));
    console.log(product);
    setIsDirectPurchase(true);
    navigate('/order', { state: { orderItem, isDirectPurchase: true } });
  }
  };

  function importLocalImage(imageName) {
    return require(`../../../public/images/${imageName}`);
  }
  

  return (
    product && (
      <>
        <main className={styles.main}>
          <section className={styles.product}>
            <div className={styles.product_img}>
              {product.imagePath && <img src={importLocalImage(product.imagePath)} alt="product" />}
            </div>
          </section>
          <section className={styles.product}>
            <div className={styles.product_info}>
              <p className={styles.seller_store}>{product.provider}</p>
              <p className={styles.product_name}>{product.name}</p>
              <span className={styles.price}>
                {convertPrice(product.price + "")}
                <span className={styles.unit}>원</span>
              </span>
            </div>

            <div className={styles.delivery}>
              <p>택배배송 / 무료배송</p>
            </div>

            <div className={styles.line}></div>

            <div className={styles.amount}>
              <img
                className={styles.minus}
                src="/images/icon-minus-line.svg"
                alt="minus"
                onClick={() => handleQuantity("minus")}
              />

              <div className={styles.count}>
                <span>{count}</span>
              </div>

              <img
                className={styles.plus}
                src="/images/icon-plus-line.svg"
                alt="plus"
                onClick={() => handleQuantity("plus")}
              />
            </div>

            <div className={styles.line}></div>

            <div className={styles.sum}>
              <div>
                <span className={styles.sum_price}>총 상품 금액</span>
              </div>

              <div className={styles.total_info}>
                <span className={styles.total}>
                  총 수량 <span className={styles.total_count}>{count}개</span>
                </span>
                <span className={styles.total_price}>
                  {convertPrice(product.price * count)}
                  <span className={styles.total_unit}>원</span>
                </span>
              </div>
            </div>

            <div className={styles.btn}>
              <button className={styles.btn_buy} onClick={handleBuyNow}>바로 구매</button>
              <button className={styles.btn_cart} onClick={() => {handleCart();}}>장바구니</button>
            </div>
          </section>
        </main>
      </>
    )
  );
};
