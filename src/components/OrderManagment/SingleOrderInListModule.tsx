import React, { useEffect, useState } from "react";
import { Descriptions, Badge, Divider, Button } from "antd";
import Request from "@DATA/api.controller";
import AddPaymentModal from "./AddPayment.Modal";
import { logisticStatusIndicator } from "@SRC/utils/utilFuncs";

const SingleOrderInListModule = ({ order, getOrderByIdandSetdata }: any) => {
  const [showPaymentModal, setShowpaymentModal] = useState(false);

  // const [order, setOrder] = useState({
  //   client: {
  //     name: "",
  //     email: "",
  //     mobile: "0412345678",
  //     vip: false,
  //     address: "",
  //     postcode: "",
  //   },
  //   shipping: {
  //     address: "",
  //     postcode: "",
  //     shippingFee: 0,
  //   },
  //   products: [],
  //   price: {
  //     itemPrice: 0,
  //     pcPrice: 0,
  //     installPrice: 0,
  //     totalAmount: 0,
  //   },
  //   orderDescription: "",
  //   orderStatus: "",
  //   orderPayed: 0,
  //   orderDeposit: 0,
  //   paymentDetail: [],
  //   balanceDue: 0,
  //   id: 0,
  // });

  // const getOrder = () => {
  //   Request.get("http://localhost:3001/orders").then((response: any) => {
  //     setOrder(response[0]);
  //   });
  // };

  // useEffect(() => {
  //   getOrder();
  // }, []);

  return (
    <>
      <Descriptions title="Client Info" column={2} labelStyle={{ width: "8rem" }} contentStyle={{ width: "20rem" }}>
        <Descriptions.Item label="Client Name">{order.clientName}</Descriptions.Item>
        <Descriptions.Item label="Client Email">{order.clientEmail}</Descriptions.Item>
        <Descriptions.Item label="Client Mobile">{order.clientMobile}</Descriptions.Item>
        <Descriptions.Item label="Client Status">{order.clientVip ? "VIP" : "Normal"}</Descriptions.Item>
        {/* <Descriptions.Item label="Created Time" span={2}>
          2019-04-24 18:00:00
        </Descriptions.Item> */}
      </Descriptions>
      <Divider />
      <Descriptions title="Shipping Info" column={2} labelStyle={{ width: "8rem" }} contentStyle={{ width: "20rem" }}>
        <Descriptions.Item label="Address">{order.shippingAddress}</Descriptions.Item>
        <Descriptions.Item label="Postcode">{order.shippingPostcode}</Descriptions.Item>
        <Descriptions.Item label="Shipping Fee">{order.shippingShippingFee}</Descriptions.Item>
        <Descriptions.Item label="Status" span={2}>
          <Badge status={logisticStatusIndicator(order.logisticStatus)} text={order.logisticStatus} />
        </Descriptions.Item>
        {/* <Descriptions.Item label="Pickup At">{order.}</Descriptions.Item> */}
      </Descriptions>
      <Divider />
      {order.products.map((item: { sku: string; name: string; size: string; price: number; pcPrice: number; installPrice: number; currentInStock: number }, index: any) => {
        return (
          <Descriptions title={`Products: ${index + 1}`} column={2} key={index} labelStyle={{ width: "8rem" }} contentStyle={{ width: "20rem" }}>
            <Descriptions.Item label="SKU">{item.sku}</Descriptions.Item>
            <Descriptions.Item label="Name">{item.name}</Descriptions.Item>
            <Descriptions.Item label="Size">{item.size}</Descriptions.Item>
            <Descriptions.Item label="price">{item.price}</Descriptions.Item>
            <Descriptions.Item label="PowderCoating">{item.pcPrice}</Descriptions.Item>
            <Descriptions.Item label="Installation">{item.installPrice}</Descriptions.Item>
            <Descriptions.Item label="Stock">{item.currentInStock}</Descriptions.Item>
          </Descriptions>
        );
      })}
      <Divider />
      <Descriptions title="Price" column={1}>
        <Descriptions.Item label="Item Price">{order.priceItemPrice}</Descriptions.Item>
        <Descriptions.Item label="Powder Coating fee">{order.pricepcPrice}</Descriptions.Item>
        <Descriptions.Item label="Installation">{order.priceinstallPrice}</Descriptions.Item>
        <Descriptions.Item label="Total Amount">{order.pricetotalAmount}</Descriptions.Item>
        <Descriptions.Item>
          <Button
            type="primary"
            onClick={() => {
              setShowpaymentModal(true);
            }}>
            Add Payment
          </Button>
        </Descriptions.Item>
      </Descriptions>
      <AddPaymentModal showPaymentModal={showPaymentModal} setShowPaymentModal={setShowpaymentModal} orderDetail={order} getOrderByIdandSetdata={getOrderByIdandSetdata} />
    </>
  );
};

export default SingleOrderInListModule;
