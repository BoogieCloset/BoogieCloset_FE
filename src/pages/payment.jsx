import { Order } from "../components/order/order";

const Payment = ({ convertPrice }) => {
  return (
    <Order
      convertPrice={convertPrice}
    />
  );
};

export default Payment;
