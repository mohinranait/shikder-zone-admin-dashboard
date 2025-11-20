import React from "react";

const OrderStatus = ({
  status,
}: {
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
}) => {
  const statusColors = {
    Pending: {
      text: "text-yellow-500",
      bg: "bg-yellow-50",
      border: "border-yellow-500",
      circle: "bg-yellow-500",
    },
    Processing: {
      text: "text-blue-500",
      bg: "bg-blue-50",
      border: "border-blue-500",
      circle: "bg-blue-500",
    },
    Shipped: {
      text: "text-indigo-500",
      bg: "bg-indigo-50",
      border: "border-indigo-500",
      circle: "bg-indigo-500",
    },
    Delivered: {
      text: "text-green-500",
      bg: "bg-green-50",
      border: "border-green-500",
      circle: "bg-green-500",
    },
    Cancelled: {
      text: "text-red-500",
      bg: "bg-red-50",
      border: "border-red-500",
      circle: "bg-red-500",
    },
  };

  const color = statusColors[status];

  return (
    <span
      className={`text-xs px-[6px] py-[2px] rounded-3xl inline-flex gap-1 items-center border ${color?.border} ${color?.bg} ${color?.text}`}
    >
      <span className={`w-2 h-2 rounded-full ${color?.circle}`}></span> {status}
    </span>
  );
};

export default OrderStatus;
