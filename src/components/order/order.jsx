import { useLocation, useNavigate } from "react-router-dom";
import styles from "./order.module.css";
import { useState } from "react";
import axiosInstance from "../../service/axiosinstance";

export const Order = ({ convertPrice }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const { orderItem, isDirectPurchase } = location.state;

  const totalPrice = orderItem.reduce((accumulator, item) => {
    console.log(isDirectPurchase);
    return accumulator + (item.price * item.quantity);
  }, 0);

  const handleOrder = () => {
      const cartAddDTOS = orderItem
        .filter((item) => item.length !== 0)
        .map((item) => ({
          itemId: item.itemId,
          quantity: item.quantity,
        }));

        const requestData = {
          cartAddDTOS: cartAddDTOS, 
          cardnum: cardNumber,
        };

        console.log(requestData);
      axiosInstance.post('/orders/addselectcart', requestData, {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
        }
      })
        .then(response => {
          if (!isDirectPurchase) {
            cartAddDTOS.map(item => 
            axiosInstance.delete(`/carts/delete/${item.itemId}`, {
              headers: {
                Authorization: `${localStorage.getItem('token')}`,
              }
            })
          );
          alert("결제 완료!");
          navigate('/');
        }})
        .catch(error => {
          console.error('Error adding order:', error);
        });
  };

  if (!orderItem) {
    return <div>주문 항목이 없습니다.</div>;
  }

  function importLocalImage(imageName) {
    return require(`/public/images/${imageName}`);
  }

  return (
    <div className={styles.checkout_container}>
    <h1>결제 페이지</h1>
    <h2>상품 정보</h2>
    <table className={styles.checkoutTable}>
  <thead>
    <tr>
      <th>상품정보</th>
      <th>상품명</th>
      <th>가격</th>
      <th>수량</th>
      <th>합계</th>
    </tr>
  </thead>
  <tbody>
    {orderItem.map((item) => (
      <tr key={item.id}>
        <td><img src={item.image} alt="product-img" className={styles.itemImage} /></td>
        <td>{item.name}</td>
        <td>{convertPrice(item.price)}원</td>
        <td>{item.quantity}</td>
        <td>{convertPrice(item.price * item.quantity)}원</td>
      </tr>
    ))}
  </tbody>
</table>
    <div className={styles.total}>
      <div className={styles.payment}>
        <p className={styles.cart_prouct_payment}>총 결제 금액</p>
        <p className={styles.cart_prouct_payment_price}>{convertPrice(totalPrice)}원</p>
      </div>
    </div>
    <div className={styles.order_info}>
      <h2>주문자 정보</h2>
      <div className={styles.form_group}>
            <label htmlFor="name">이름</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="address">주소</label>
            <input type="text" id="address" name="address" required />
          </div>
    </div>
    <div className={styles.payment_info}>
      <h2>결제 정보</h2>
        <div>
          <div className={styles.form_group}>
            <label htmlFor="cardNumber">카드 번호</label>
            <input type="text" id="cardNumber" name="cardNumber"  onChange={(e) => setCardNumber(e.target.value)} required />
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
          <button className={styles.submit_button} onClick={() => {handleOrder();}}> 
            결제하기
          </button>
          </div>
      </div>
    </div>
  );
};
