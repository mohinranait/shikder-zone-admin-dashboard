"use client";
import { CalendarIcon, Check, Clock, Edit, Eye, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { format, isWithinInterval, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/hooks/useRedux";
import { TOrder, TOrderStatus, TPaymentStatus } from "@/types/order.type";
import Link from "next/link";
import OrderStatus from "./OrderStatus";
import { Badge } from "@/components/ui/badge";
import { getPaymentStatusConfig } from "@/components/shared/order-status-badge";
import { currency } from "@/utils/helpers";

type Props = {
  statusName:
    | "Pending"
    | "Processing"
    | "Shipped"
    | "Delivered"
    | "Cancelled"
    | "all";
};

const OrderTables = ({ statusName }: Props) => {
  // Redux state
  const { orders } = useAppSelector((state) => state.order);

  // filter state
  const [allOrders, setAllOrders] = useState<TOrder[]>([]);
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  // Paginations
  const [paginations, setPaginations] = useState<TOrder[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [parPage, setParPage] = useState(10);
  const totalPages = Math.ceil(allOrders?.length / parPage);

  // Pagination
  useEffect(() => {
    const arr = [...allOrders];
    const startIndex = (currentPage - 1) * parPage;
    const res = arr.slice(startIndex, startIndex + parPage);
    setPaginations(res);
  }, [allOrders, currentPage, parPage]);

  // Handle date filtering
  const handleDateFilter = (order: TOrder) => {
    const orderDate = parseISO(order.createdAt);

    // If only a single date is selected, filter by that date
    if (date?.from && !date?.to) {
      return (
        format(orderDate, "yyyy-MM-dd") === format(date?.from, "yyyy-MM-dd")
      );
    }

    // If date range is selected, filter by that range
    if (date?.from && date?.to) {
      return isWithinInterval(orderDate, {
        start: date.from,
        end: date.to,
      });
    }

    return true; // No date filter
  };

  // handle search and filters
  const handleSearchFilter = (data: TOrder[]): TOrder[] => {
    const searchAll = data.filter((order) => {
      const matchesSearch = search
        ? order.uid.toLowerCase().includes(search.toLowerCase())
        : order;
      // order.uid.toLowerCase().includes(search.toLowerCase()) ||
      // order.uid.toLowerCase().includes(search.toLowerCase())

      // Date Range Filtering
      const matchesDate = handleDateFilter(order);

      // Status Filtering
      const matchesStatus = status
        ? status === "all"
          ? order
          : order.status === status
        : order;

      return matchesSearch && matchesStatus && matchesDate;
    });
    return searchAll;
  };

  useEffect(() => {
    let filterOrders: TOrder[] = [];
    if (statusName === "all") {
      filterOrders = handleSearchFilter(orders);
    } else if (statusName === "Pending") {
      const pOrders = orders?.filter((order) => order?.status === "Pending");
      filterOrders = handleSearchFilter(pOrders);
    } else if (statusName === "Processing") {
      const procOrder = orders?.filter(
        (order) => order?.status === "Processing"
      );
      filterOrders = handleSearchFilter(procOrder);
    } else if (statusName === "Shipped") {
      const shippendOrder = orders?.filter(
        (order) => order?.status === "Shipped"
      );
      filterOrders = handleSearchFilter(shippendOrder);
    } else if (statusName === "Delivered") {
      const dOrder = orders?.filter((order) => order?.status === "Delivered");
      filterOrders = handleSearchFilter(dOrder);
    } else if (statusName === "Cancelled") {
      const cancelOrder = orders?.filter(
        (order) => order?.status === "Cancelled"
      );
      filterOrders = handleSearchFilter(cancelOrder);
    } else {
    }

    setAllOrders(filterOrders);
  }, [search, status, orders, date, statusName]);

  return (
    <div className="w-full mt-4 rounded-lg border-0 bg-card text-card-foreground  shadow">
      <div className="p-6 ">
        <div className=" flex flex-wrap items-center gap-4">
          <div>
            <div className="relative">
              <Search
                size={17}
                className="absolute z-0 text-gray-600 left-2 top-2/4 -translate-y-2/4"
              />
              <input
                type="text"
                placeholder="Search orders"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                className="flex h-9   pl-7 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors   placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0   disabled:opacity-50 md:text-sm"
              />
            </div>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[240px] h-9 justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          {statusName === "all" && (
            <Select onValueChange={(e: TOrderStatus) => setStatus(e)}>
              <SelectTrigger className="w-[140px] focus:outline-none focus:ring-0 h-9">
                <SelectValue
                  className={cn("text-gray-500")}
                  placeholder="All Status"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="all" className="cursor-pointer">
                    All
                  </SelectItem>
                  <SelectItem value="Pending" className="cursor-pointer">
                    Pending
                  </SelectItem>
                  <SelectItem value="Processing" className="cursor-pointer">
                    Processing
                  </SelectItem>
                  <SelectItem value="Shipped" className="cursor-pointer">
                    Shipped
                  </SelectItem>
                  <SelectItem value="Delivered" className="cursor-pointer">
                    Delivered
                  </SelectItem>
                  <SelectItem value="Cancelled" className="cursor-pointer">
                    Cancelled
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      <div className=" px-6 overflow-y-auto">
        <div className="min-w-[550px] ">
          <Table className="w-full border  border-slate-200">
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[60px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginations?.map((order, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <p className="text-gray-500">#ORD-{order?.uid}</p>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-500">
                        <p>{format(order?.createdAt, "MMM dd, yyyy")}</p>
                        <p className="text-xs">
                          {format(order?.createdAt, "hh:mm:ss aa")}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-gray-500">
                          {" "}
                          {order?.userId ? (
                            <>
                              {order?.shippingAddressId?.firstName}{" "}
                              {order?.shippingAddressId?.lastName}
                            </>
                          ) : (
                            `${order?.shippingAddress?.firstName} ${order?.shippingAddress?.lastName}`
                          )}
                        </p>
                        <p className="text-[10px] text-gray-500">
                          {order?.userId ? "User" : "Guest"}{" "}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={`${
                          getPaymentStatusConfig(
                            order?.paymentStatus as TPaymentStatus
                          ).color
                        } font-semibold  `}
                      >
                        {order?.paymentStatus === "Pending" ? (
                          <>
                            <Clock size={14} /> Un-Paid
                          </>
                        ) : (
                          <>
                            <Check size={16} /> Paid
                          </>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="text-gray-500">
                        {currency}
                        {order?.totalAmount?.toFixed(2)}{" "}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="text-gray-500">
                        {order?.items?.length} items
                      </p>
                    </TableCell>
                    <TableCell>
                      {<OrderStatus status={order?.status} />}
                    </TableCell>
                    <TableCell className="flex justify-end gap-2">
                      <Link href={`/admin/order/${order?._id}?mode=edit`}>
                        <Button className="w-8 h-8" size={"icon"}>
                          <Edit size={20} />
                        </Button>
                      </Link>
                      <Link href={`/admin/order/${order?._id}`}>
                        <Button className="w-8 h-8" size={"icon"}>
                          <Eye size={22} />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>{" "}
        </div>
      </div>
      <div className="pb-6 flex items-center justify-between mt-4 px-6">
        <p className="text-gray-600">
          {currentPage}-{totalPages} <span className="text-gray-400">of</span>{" "}
          {allOrders?.length}{" "}
        </p>
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: totalPages })?.map((_, i) => {
            return (
              <Button
                onClick={() => setCurrentPage(i + 1)}
                key={i}
                type="button"
                className="w-9 h-9"
                variant={currentPage == i + 1 ? "default" : "outline"}
              >
                {i + 1}
              </Button>
            );
          })}
        </div>
        <div className="text-gray-600">
          Show per page{" "}
          <select
            name=""
            onChange={(e) => {
              setParPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            id=""
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// const OrderStatus = ({
//   status,
// }: {
//   status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
// }) => {
//   const statusColors = {
//     Pending: {
//       text: "text-yellow-500",
//       bg: "bg-yellow-50",
//       border: "border-yellow-500",
//       circle: "bg-yellow-500",
//     },
//     Processing: {
//       text: "text-blue-500",
//       bg: "bg-blue-50",
//       border: "border-blue-500",
//       circle: "bg-blue-500",
//     },
//     Shipped: {
//       text: "text-indigo-500",
//       bg: "bg-indigo-50",
//       border: "border-indigo-500",
//       circle: "bg-indigo-500",
//     },
//     Delivered: {
//       text: "text-green-500",
//       bg: "bg-green-50",
//       border: "border-green-500",
//       circle: "bg-green-500",
//     },
//     Cancelled: {
//       text: "text-red-500",
//       bg: "bg-red-50",
//       border: "border-red-500",
//       circle: "bg-red-500",
//     },
//   };

//   const color = statusColors[status];

//   return (
//     <span
//       className={`text-xs px-[6px] py-[2px] rounded-3xl inline-flex gap-1 items-center border ${color.border} ${color.bg} ${color.text}`}
//     >
//       <span className={`w-2 h-2 rounded-full ${color.circle}`}></span> {status}
//     </span>
//   );
// };

export default OrderTables;
