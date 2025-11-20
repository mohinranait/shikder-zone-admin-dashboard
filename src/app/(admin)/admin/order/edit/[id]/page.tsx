"use client";
import { Button } from "@/components/ui/button";
import { Home, Undo2, User } from "lucide-react";
import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { TFormType, TOrderStatus, TPaymentStatus } from "@/types/order.type";
import { updateOrderById } from "@/actions/orderApi";
import toast from "react-hot-toast";
import OrderItemTable from "@/components/tables/OrderItemTable";
import { useAppSelector } from "@/hooks/useRedux";
import OrderStatusSection from "@/components/pages/Order/OrderStatusSection";

const UpdateORderPage = ({ params }: { params: { id: string } }) => {
  const id = params?.id;
  const { orders } = useAppSelector((state) => state.order);
  const order = orders?.find((order) => order?._id === id);

  const router = useRouter();
  const [form, setForm] = useState<TFormType>({
    status: "Pending",
    paymentStatus: "Pending",
  });

  // Update order by ID
  const handleUpdateOrder = async () => {
    try {
      const data = await updateOrderById({ formData: form, id });
      console.log({ data });
      if (data.success) {
        toast.success("Order Updated");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            <p className="text-2xl font-semibold text-black">Update Order</p>
            <p className="text-sm text-gray-500 font-medium">
              Order history / Order Details - Apr 2, 2025{" "}
            </p>
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <Button type="button" onClick={handleUpdateOrder} size={"sm"}>
            Update Order
          </Button>
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
          <form className="p-4 bg-white rounded-md shadow">
            <div className="flex pb-3 justify-between items-center">
              <div>
                <p className="text-base font-semibold text-black">
                  Manage Order
                </p>
                <p className="text-sm font-medium text-gray-500">
                  Manage order status
                </p>
              </div>
            </div>
            <div className=" bg-gray-100 p-2 space-y-2 rounded gap-2 ">
              <div className="flex items-cener">
                <label
                  htmlFor="OrderStatus"
                  className="min-w-[110px] inline-block text-gray-600 text-sm"
                >
                  Order Status
                </label>
                <select
                  name=""
                  id=""
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev!,
                      status: e.target.value as TOrderStatus,
                    }))
                  }
                  className="py-2 px-2 w-full rounded text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex items-cener">
                <label
                  htmlFor="OrderStatus"
                  className="min-w-[110px] inline-block text-gray-600 text-sm"
                >
                  Payment Status
                </label>
                <select
                  name="paymentStatus"
                  id=""
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev!,
                      paymentStatus: e.target.value as TPaymentStatus,
                    }))
                  }
                  className="py-2 px-2 w-full rounded text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Failed">Failed</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>
            </div>
          </form>

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
                <p className="text-sm font-semibold text-black">$10</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-gray-500">Discount</p>
                <p className="text-sm font-semibold text-black">5%</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-gray-500">Tax</p>
                <p className="text-sm font-semibold text-black">$80</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-gray-500">Shipping</p>
                <p className="text-sm font-semibold text-black">$10</p>
              </div>
              <span className="h-[1px] w-full bg-gray-300 inline-block"></span>
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold text-black">Total</p>
                <p className="text-sm font-semibold text-black">$100</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold text-black">Due</p>
                <p className="text-sm font-semibold text-black">$0</p>
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
                  <ul className="list-disc mt-1 space-y-1 list-inside text-sm text-gray-500">
                    <li>Mahir Shikder</li>
                    <li>01246787445</li>
                    <li>Barguna, Barishal, Dhaka</li>
                    <li>Zip: 44545</li>
                  </ul>
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

export default UpdateORderPage;
