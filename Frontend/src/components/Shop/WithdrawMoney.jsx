import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import { getAllOrdersShopFun } from "../../redux/actions/order";

const WithdrawMoney = () => {
  const dispatch = useDispatch();
  const { shopOrders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const [deliveredOrders, setDeliveredOrders] = useState(null);

  useEffect(() => {
    dispatch(getAllOrdersShopFun(seller._id));
  }, [dispatch]);

  useEffect(() => {
    if (shopOrders) {
      const delivered = shopOrders.filter(
        (order) => order.status === "Delivered"
      );
      setDeliveredOrders(delivered);
    }
  }, [shopOrders]);

  const totalEarningsWithoutTax =
    deliveredOrders &&
    deliveredOrders.reduce((acc, order) => acc + order.totalPrice, 0);
  const serviceCharge = totalEarningsWithoutTax * 0.1;
  const availableBalance = totalEarningsWithoutTax - serviceCharge;

  return (
    <div className="w-full h-[90vh] p-8">
      <div className="w-full bg-white h-full rounded flex items-center justify-center flex-col">
        <h5 className="text-[20px] pb-4">
          Available Balance: ${availableBalance}
        </h5>
        <div className={`${styles.button} text-white !h-[42px] rounded`}>
          Withdraw
        </div>
      </div>
    </div>
  );
};

export default WithdrawMoney;
