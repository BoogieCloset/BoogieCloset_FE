import styles from "./cart.module.css";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const TotalCart = ({ total, setTotal, cart, convertPrice, found }) => {
  const navigate = useNavigate(); 

  useEffect(() => {
    if (found) {
      const temp = found.filter((item) => item.length !== 0);
      const sum = temp.map((item) => item[0].price * item[0].quantity);
      const reducer = (acc, cur) => acc + cur;
      if (sum.length === 0) {
        setTotal(0);
        return;
      }
      const itemTotal = sum.reduce(reducer);
      setTotal(itemTotal);
    } else {
      setTotal(0);
    }
  }, [cart, total, found, setTotal]);

  const handleBuyCart = () => {
    const orderItem = found.map(item => ({
      itemId: item[0].itemId,
      quantity: item[0].quantity,
      price: item[0].price,
      name: item[0].name,
      imageUrl: item[0].imageUrl
    }));
    console.log(orderItem);
    if (orderItem.length === 0) {
      alert("선택된 물건이 없습니다.");
      return;
    }
    navigate('/order', { state: { orderItem } });
  };

  return (
    <div className={styles.total}>
      <div className={styles.total_price}>
        <p className={styles.cart_product_total_price}>총 상품금액</p>
        <p className={styles.cart_product_price}>{convertPrice(total)}</p>
      </div>
      <div className={styles.pay_minus}>
        <img src="/images/icon-minus-line.svg" alt="minus" />
      </div>
      <div className={styles.sale}>
        <p className={styles.cart_product_sale}>상품 할인</p>
        <p className={styles.cart_product_sale_price}>0원</p>
      </div>
      <div className={styles.pay_plus}>
        <img src="/images/icon-plus-line.svg" alt="plus" />
      </div>
      <div className={styles.delivery}>
        <p className={styles.cart_product_delivery}>배송비</p>
        <p className={styles.cart_product_delivery_price}>0원</p>
      </div>

      <div className={styles.payment}>
        <p className={styles.cart_prouct_payment}>결제 예정 금액</p>
        <p className={styles.cart_prouct_payment_price}>
          {convertPrice(total)}
        </p>
      </div>
      <div></div>
      <div></div>
      <div className={styles.cart_product_price}>
        <button className={styles.btn_submit} onClick={handleBuyCart}> 주문하기</button>
      </div>
    </div>
  );
};
