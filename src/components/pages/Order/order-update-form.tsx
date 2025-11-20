import { updateOrderById } from "@/actions/orderApi";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setAllOrders } from "@/redux/features/orderSlice";
import {
  TFormType,
  TOrder,
  TOrderStatus,
  TPaymentStatus,
} from "@/types/order.type";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type TOrderUpdateFormProps = {
  orderId: string;
  order?: TOrder;
};
const OrderUpdateForm = ({ orderId, order }: TOrderUpdateFormProps) => {
  const { orders } = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<TFormType>({
    status: "Pending",
    paymentStatus: "Pending",
  });

  useEffect(() => {
    if (order) {
      setForm({
        status: order?.status as TOrderStatus,
        paymentStatus: order?.paymentStatus as TPaymentStatus,
      });
    }
  }, [order, orderId]);

  // Update order by ID
  const handleUpdateOrder = async () => {
    try {
      const data = await updateOrderById({
        formData: { ...order, ...form },
        id: orderId,
      });
      console.log({ data });
      const responseOrder = data?.payload;
      if (responseOrder) {
        setForm({
          status: responseOrder?.status as TOrderStatus,
          paymentStatus: responseOrder?.paymentStatus as TPaymentStatus,
        });
      }
      const updateOrders = orders?.map((order) =>
        order._id === responseOrder?._id ? responseOrder : order
      );
      dispatch(setAllOrders(updateOrders));
      if (data.success) {
        toast.success("Order Updated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="p-4 bg-white rounded-md shadow">
      <div className="flex pb-3 justify-between items-center">
        <div>
          <p className="text-base font-semibold text-black">Manage Order</p>
          <p className="text-sm font-medium text-gray-500">
            Manage order status
          </p>
        </div>
        <Button type="button" onClick={handleUpdateOrder} size={"sm"}>
          Update Order
        </Button>
      </div>
      <div className=" bg-gray-100 p-2 space-y-2 rounded gap-2 ">
        <div className="flex items-cener">
          <label
            htmlFor="OrderStatus"
            className="min-w-[110px] inline-block text-gray-600 text-sm"
          >
            Order Status
          </label>

          <Select
            key={form?.status}
            value={form?.status}
            onValueChange={(e: TOrderStatus) =>
              setForm((prev) => ({
                ...prev!,
                status: e as TOrderStatus,
              }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Order Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Shipped">Shipped</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
              <SelectItem value="Returned">Returned</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-cener">
          <label
            htmlFor="OrderStatus"
            className="min-w-[110px] inline-block text-gray-600 text-sm"
          >
            Payment Status
          </label>

          <Select
            key={form?.paymentStatus}
            value={form?.paymentStatus}
            onValueChange={(e: TPaymentStatus) =>
              setForm((prev) => ({
                ...prev!,
                paymentStatus: e as TPaymentStatus,
              }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Payment Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Un Paid</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Failed">Failed</SelectItem>
              <SelectItem value="Refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </form>
  );
};

export default OrderUpdateForm;
