import { TOrderStatus } from "@/types/order.type";
import React from "react";

type Props = {
  status: TOrderStatus;
};
const OrderStatusSection = ({ status = "Pending" }: Props) => {
  const orderStatusArr = [
    {
      _id: "1",
      label: "Pending",
    },
    {
      _id: "2",
      label: "Processing",
    },
    {
      _id: "3",
      label: "Shipped",
    },
    {
      _id: "4",
      label: "Delivered",
    },
    {
      _id: "5",
      label: "Cancelled",
    },
  ];

  return (
    <>
      {orderStatusArr?.map((card, i) => {
        const index = orderStatusArr?.findIndex(
          (item) => item.label === status
        );
        return (
          <div
            key={i}
            className={`bg-white flex  rounded p-4 flex-col gap-2 items-center `}
          >
            <div
              className={`flex items-center justify-center w-9 h-9  rounded-full ${
                index >= i
                  ? "bg-gray-900 text-white"
                  : "bg-gray-200 text-gray-500"
              } `}
            >
              <p className="text-lg font-semibold ">{i + 1}</p>
            </div>
            <div className="flex-1">
              <p
                className={`text-sm text-center font-medium ${
                  index >= i ? "text-gray-900" : "text-gray-500"
                }`}
              >
                {card?.label}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default OrderStatusSection;
