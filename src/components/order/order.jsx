import { useLocation } from "react-router-dom";
import styles from "./order.module.css";

export const Order = () => {
  const location = useLocation();
  const { selectedItems } = location.state;

  const convertPrice = (price) => {
    return price.toLocaleString();
  };

  return (
    <div className={styles.checkout_container}>
      <h1>결제 페이지</h1>
      <div className={styles.checkout_items}>
        {selectedItems.map((item) => (
          <div key={item.id} className={styles.checkout_item}>
            <img
              src={item.image}
              alt="product-img"
              className={styles.item_image}
            />
            <div className={styles.item_info}>
              <p className={styles.item_name}>{item.name}</p>
              <p className={styles.item_price}>{convertPrice(item.price)}원</p>
              <p className={styles.item_quantity}>수량: {item.quantity}</p>
              <p className={styles.item_total_price}>
                합계: {convertPrice(item.price * item.quantity)}원
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.payment_info}>
        <h2>결제 정보</h2>
        <form>
          <div className={styles.form_group}>
            <label htmlFor="name">이름</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="address">주소</label>
            <input type="text" id="address" name="address" required />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="cardNumber">카드 번호</label>
            <input type="text" id="cardNumber" name="cardNumber" required />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="expirationDate">유효기간</label>
            <input
              type="text"
              id="expirationDate"
              name="expirationDate"
              required
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="cvv">CVV</label>
            <input type="text" id="cvv" name="cvv" required />
          </div>
          <button type="submit" className={styles.submit_button}>
            결제하기
          </button>
        </form>
      </div>
    </div>
  );
};
