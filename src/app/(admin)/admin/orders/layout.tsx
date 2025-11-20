"use client";
import { useAppSelector } from "@/hooks/useRedux";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const OrderLayout = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  const { orders } = useAppSelector((state) => state.order);
  const pendingOrders = orders?.filter((order) => order.status === "Pending");
  const processingOrders = orders?.filter(
    (order) => order.status === "Processing"
  );

  const pageLinks = [
    {
      link: "/admin/orders",
      label: "All",
    },
    {
      link: "/admin/orders/pending",
      label: `Pending (${pendingOrders?.length})`,
    },
    {
      link: "/admin/orders/processing",
      label: `Processing (${processingOrders?.length})`,
    },
    {
      link: "/admin/orders/delivered",
      label: "Complated",
    },
    {
      link: "/admin/orders/cancelled",
      label: "Cancel",
    },
  ];

  const pagelabelGenerate = (label: string) => {
    let title = "Orders";
    switch (label) {
      case "pending":
        title = "Orders Pending";
        break;

      case "processing":
        title = "Orders Processing";
        break;

      case "delivered":
        title = "Orders Completed";
        break;

      case "cancelled":
        title = "Orders Cancel";
        break;

      default:
        title = "Orders";
        break;
    }

    return title;
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xl font-medium">
            {pagelabelGenerate(path?.split("/").pop() || "")}
          </p>
          <p className="text-sm text-slate-500">Manage all orders</p>
        </div>
        <Link
          href={"/admin/product"}
          className="border border-slate-100 gap-1 bg-primary text-white rounded-[60px] inline-flex items-center justify-center py-1 text-sm  px-1 pl-2"
        >
          Custom Order
          <span className="inline-flex items-center justify-center p-2 rounded-full w-[30px] h-[30px] bg-white text-slate-900">
            <PlusIcon />
          </span>
        </Link>
      </div>
      <div className=" flex mt-2 justify-between items-center">
        <div className="space-x-3">
          {pageLinks?.map((link) => (
            <Link
              key={link.label}
              href={`${link?.link}`}
              className={`text-sm py-1  ${
                link?.link === path ? "text-gray-950" : "text-gray-500"
              } `}
            >
              {link?.label}
            </Link>
          ))}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default OrderLayout;
