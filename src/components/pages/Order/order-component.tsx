"use client";
import { useAppSelector } from "@/hooks/useRedux";
import { Check, Clock, Home, Undo2, User } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import OrderStatus from "./OrderStatus";
import { TOrderStatus, TPaymentStatus } from "@/types/order.type";
import { Badge } from "@/components/ui/badge";

import OrderStatusSection from "./OrderStatusSection";
import OrderItemTable from "@/components/tables/OrderItemTable";
import OrderUpdateForm from "./order-update-form";
import { getPaymentStatusConfig } from "@/components/shared/order-status-badge";
import { currency } from "@/utils/helpers";
type Props = {
  orderId: string;
};

const OrderComponent = ({ orderId }: Props) => {
  const { orders } = useAppSelector((state) => state.order);
  const id = orderId;
  const searchParams = useSearchParams();
  const pageMode = searchParams.get("mode");

  const order = orders?.find((order) => order?._id === id);
  const totalTax =
    order?.items?.reduce((acc, item) => acc + (item?.tax || 0), 0) || 0;
  const totalShipping =
    order?.items?.reduce((acc, item) => acc + (item?.shippingCharge || 0), 0) ||
    0;
  const subTotal =
    order?.totalAmount &&
    order?.totalAmount - ((totalShipping || 0) + (totalTax || 0));

  const router = useRouter();

  return (
    <div>
      <div className="flex justify-between items-center gap-3 mb-3">
        <div className="flex gap-2 items-start">
          <button
            onClick={() => {
              router.back();
            }}
            className="p-1 border-gray-400 border rounded bg-gray-100 "
          >
            <Undo2 />
          </button>
          <div>
            <p className="text-2xl font-semibold text-black uppercase">
              #ORD-{order?.uid}
            </p>
            <p className="text-sm text-gray-500 font-medium">
              Order Date -{" "}
              {order &&
                format(new Date(order.createdAt), "MMM dd, yyyy hh:mm a")}
            </p>
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <Button
            size={"sm"}
            variant={"outline"}
            className="bg-red-50 hover:bg-red-50 border border-red-500 text-red-500 hover:text-red-500"
          >
            Delete Order
          </Button>
          <Button
            size={"sm"}
            variant={"outline"}
            className="bg-gray-50 hover:bg-gray-50 border border-black text-black hover:text-black"
          >
            Track Order
          </Button>
          <Link href={`/admin/order/${id}?mode=edit`}>
            <Button type="button" size={"sm"}>
              Edit Order
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex gap-3 mb-3 bg-white rounded-md shadow">
        <div className="p-4  ">
          <p className="text-gray-600 text-sm ">Order Status</p>
          <p className="text-center">
            <OrderStatus status={order?.status as TOrderStatus} />
          </p>
        </div>
        <div className="p-4  ">
          <p className="text-gray-600 text-sm "> Payment Status</p>
          <p className="text-center">
            {" "}
            <Badge
              variant="secondary"
              className={`${
                getPaymentStatusConfig(order?.paymentStatus as TPaymentStatus)
                  .color
              } font-semibold  `}
            >
              {order?.paymentStatus === "Pending" ? (
                <>
                  <Clock size={16} /> Un-Paid
                </>
              ) : (
                <>
                  <Check size={16} /> Paid
                </>
              )}
            </Badge>
          </p>
        </div>
        <div className="p-4  ">
          <p className="text-gray-600 text-sm "> Total Amount</p>
          <p className="text-center text-green-600 font-semibold">
            {currency}
            {order?.totalAmount?.toFixed(2)}
          </p>
        </div>
        <div className="p-4  ">
          <p className="text-gray-600 text-sm "> Payment Method</p>
          <p className="text-center">{order?.paymentMethod}</p>
        </div>

        <div className="p-4  ">
          <p className="text-gray-600 text-sm ">PickUp Point</p>
          <p className="text-center">
            {order?.userId
              ? order?.shippingAddressId?.type
              : order?.shippingAddress?.type}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3  lg:grid-cols-3">
        <div className="space-y-3 col-span-2">
          <div className="p-4 bg-white rounded-md shadow">
            <div className="flex pb-3 justify-between items-center">
              <div>
                <p className="text-base font-semibold text-black">Progress</p>
                <p className="text-sm font-medium text-gray-500">
                  Current order status
                </p>
              </div>
            </div>
            <div className="grid grid-cols-5 bg-gray-100 p-2 rounded gap-2 ">
              {<OrderStatusSection status={order?.status as TOrderStatus} />}
            </div>
          </div>
          {order && <OrderItemTable order={order} />}
        </div>
        <div className="col-span-1 space-y-3">
          {pageMode === "edit" && (
            <OrderUpdateForm orderId={order?._id as string} order={order} />
          )}
          <div className="p-4 bg-white  rounded-md shadow">
            <div className="flex pb-3 justify-between items-center">
              <div>
                <p className="text-base font-semibold text-black">Payment</p>
                <p className="text-sm font-medium text-gray-500">
                  Final payment information
                </p>
              </div>
            </div>
            <div className="bg-gray-100 p-4 space-y-2 rounded-md">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-gray-500">Subtotal</p>
                <p className="text-sm font-semibold text-black">
                  {currency}
                  {subTotal?.toFixed(2)}
                </p>
              </div>
              {totalTax > 0 && (
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-gray-500">Tax</p>
                  <p className="text-sm font-semibold text-black">
                    {currency}
                    {totalTax?.toFixed(2)}
                  </p>
                </div>
              )}

              {totalShipping > 0 && (
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-gray-500">Shipping</p>
                  <p className="text-sm font-semibold text-black">
                    {currency}
                    {totalShipping?.toFixed(2)}
                  </p>
                </div>
              )}

              <span className="h-[1px] w-full bg-gray-300 inline-block"></span>
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold text-black">Total</p>
                <p className="text-sm font-semibold text-black">
                  {currency}
                  {order?.totalAmount?.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white  rounded-md shadow">
            <div className="flex pb-3 justify-between items-center">
              <div>
                <p className="text-base font-semibold text-black">Customer</p>
                <p className="text-sm font-medium text-gray-500">
                  Customer information
                </p>
              </div>
            </div>
            <div className="bg-gray-100 p-2 space-y-3 rounded-md">
              <div className="flex p-3 rounded bg-white items-start gap-2">
                <div>
                  <Home size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-black">
                    Shipping Address
                  </p>
                  {order?.userId ? (
                    <ul className="list-disc mt-1 space-y-1 list-inside text-sm text-gray-500">
                      <li>
                        {order?.shippingAddressId?.firstName}{" "}
                        {order?.shippingAddressId?.lastName}
                      </li>
                      <li>{order?.phone}</li>
                      <li>
                        {order?.shippingAddressId?.address},{" "}
                        {order?.shippingAddressId?.subCity},{" "}
                        {order?.shippingAddressId?.city}
                      </li>
                      <li>Pickup From: {order?.shippingAddressId?.type}</li>
                    </ul>
                  ) : (
                    <ul className="list-disc mt-1 space-y-1 list-inside text-sm text-gray-500">
                      <li>
                        {" "}
                        {order?.shippingAddress?.firstName}{" "}
                        {order?.shippingAddress?.lastName}
                      </li>
                      <li>{order?.phone}</li>
                      <li>জেলা:{order?.shippingAddress?.city}</li>
                      <li>উপজেলা: {order?.shippingAddress?.subCity},</li>
                      <li>ঠিকানা: {order?.shippingAddress?.address},</li>
                      <li>Pickup From: {order?.shippingAddress?.type}</li>
                    </ul>
                  )}
                </div>
              </div>
              <div className="flex p-3 rounded bg-white items-start gap-2">
                <div>
                  <Home size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-black">
                    Biling Address
                  </p>
                  <ul className="list-disc mt-1 space-y-1 list-inside text-sm text-gray-500">
                    <li>Same as shipping address</li>
                  </ul>
                </div>
              </div>
              <div className="flex p-3 rounded bg-white items-start gap-2">
                <div>
                  <User size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-black">
                    General Information
                  </p>
                  <ul className="list-disc mt-1 space-y-1 list-inside text-sm text-gray-500">
                    <li>user@gmail.com</li>
                    <li>+54215411</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderComponent;
