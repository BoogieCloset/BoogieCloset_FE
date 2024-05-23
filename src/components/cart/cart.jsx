import styles from "./cart.module.css";
import { useState,useEffect } from "react";
import { CartHeader } from "./cartHeader";
import { CartList } from "./cartList";
import { TotalCart } from "./totalCart";
import axiosInstance from "../../service/axiosinstance";

export const Cart = ({ cart, setCart, convertPrice}) => {
  const [total, setTotal] = useState(0);
  const [checkLists, setCheckLists] = useState([]);
  const isAllChecked =
    cart.length === checkLists.length && checkLists.length !== 0;

    useEffect(() => {
      axiosInstance.get('/carts/viewAll', {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
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
    }, []);
  
    const handleQuantity = (type, itemId, quantity) => {    
      if (quantity <= 0) {
        console.error("Quantity cannot be less than zero");
        return;
      }
      const cartItem = {
        itemId: itemId,
        quantity: quantity
      };
    
      console.log("보내기 전 cartItem:", cartItem);
      axiosInstance.put('/carts/quantity', cartItem, {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
        }
      })
      .then(response => {
        setCart(currentCart => {
          return currentCart.map((el) =>
            el.itemId === itemId ? { ...el, quantity: quantity } : el
          );
        });
      })
        .catch(error => {
          console.error("Error updating cart:", error);
        });
    };

  const handleRemove = (itemId) => {
    axiosInstance.delete(`/carts/delete/${itemId}`, {
      headers: {
        Authorization: `${localStorage.getItem('token')}`,
      }
    })
      .then(response => {
        setCart(cart.filter(item => item.itemId !== itemId));
        setCheckLists(checkLists.filter(check => check !== itemId));
      })
      .catch(error => {
        console.error(error);
      });
  };

  const found = checkLists.map((checkList) =>
    cart.filter((el) => el.itemId === parseInt(checkList))
  );

  const handleCheckList = (checked, id) => {
    if (checked) {
      setCheckLists([...checkLists, id]);
      console.log(checkLists);
    } else {
      setCheckLists(checkLists.filter((check) => check !== id));
    }
  };

  const handleCheckAll = (checked) => {
    if (checked) {
      const checkItems = [];
      cart.map((cart) => checkItems.push(`${cart.itemId}`));
      setCheckLists(checkItems);
    } else {
      setCheckLists([]);
    }
  };

  return (
    <>
      <CartHeader isAllChecked={isAllChecked} handleCheckAll={handleCheckAll} />
      {cart.length !== 0 ? (
        cart.map((cart) => {
          return (
            <CartList
              key={`key-${cart.itemId}`}
              cart={cart}
              setCart={setCart}
              convertPrice={convertPrice}
              handleQuantity={handleQuantity}
              handleRemove={handleRemove}
              handleCheckList={handleCheckList}
              checkLists={checkLists}
            />
          );
        })
      ) : (
        <div className={styles.not}>
          <h2>장바구니에 담긴 상품이 없습니다.</h2>
        </div>
      )}
      {cart.length !== 0 ? (
        <TotalCart
          cart={cart}
          total={total}
          setTotal={setTotal}
          convertPrice={convertPrice}
          found={found}
        />
      ) : (
        ""
      )}
    </>
  );
};