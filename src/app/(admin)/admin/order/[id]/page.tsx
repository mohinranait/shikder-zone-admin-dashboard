import OrderComponent from "@/components/pages/Order/order-component";
import React from "react";

const OrderDetailsPage = ({ params }: { params: { id: string } }) => {
  const id = params?.id;
  return <OrderComponent orderId={id} />;
};

export default OrderDetailsPage;
