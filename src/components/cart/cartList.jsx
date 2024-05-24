import styles from "./cart.module.css";

export const CartList = ({
  cart,
  convertPrice,
  checkLists,
  handleQuantity,
  handleRemove,
  handleCheckList,
}) => {

    function importLocalImage(imageName) {
    return require(`../../../public/images/${imageName}`);
  }
  
  return (
    <section className={styles.cart_product_list}>
      <input
        type="checkbox"
        id={cart.id}
        onChange={(e) => {
          handleCheckList(e.currentTarget.checked, `${cart.itemId}`);
        }}
        checked={checkLists.includes(`${cart.itemId}`) ? true : false}
      />
      <div className={styles.cart_product_wrap}>
        <div className={styles.cart_product_image}>
          {cart.imageUrl && <img src={importLocalImage(cart.imageUrl)} alt="cart" />}
        </div>

        <div className={styles.cart_product_info}>
          <p className={styles.seller_store}>{cart.provider}</p>
          <p className={styles.product_name}>{cart.name}</p>
          <p className={styles.price}>{convertPrice(cart.price)}원</p>
          <p className={styles.delivery}>택배배송 / 무료배송</p>
        </div>
      </div>

      <div className={styles.cart_product_count}>
        <img
          className={styles.minus}
          src="/images/icon-minus-line.svg"
          alt="minus"
          onClick={() => {
            handleQuantity("minus", cart.itemId, cart.quantity - 1);
          }}
        />

        <div className={styles.count}>
          <span>{cart.quantity}</span>
        </div>
        <img
          className={styles.plus}
          src="/images/icon-plus-line.svg"
          alt="plus"
          onClick={() => handleQuantity("plus", cart.itemId, cart.quantity + 1)}
        />
      </div>

      <div className={styles.cart_product_price}>
        <span>
          {convertPrice(cart.price * cart.quantity)}
          <span className={styles.total_unit}>원</span>
        </span>
      </div>

      <div
        className={styles.product_remove}
        onClick={() => handleRemove(cart.itemId)}
      >
        <img src="/images/icon-delete.svg" alt="delete" />
      </div>
    </section>
  );
};
