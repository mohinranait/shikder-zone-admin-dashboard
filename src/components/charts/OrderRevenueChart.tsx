"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", orders: 1200, revenue: 2400 },
  { name: "Feb", orders: 2100, revenue: 3200 },
  { name: "Mar", orders: 800, revenue: 1600 },
  { name: "Apr", orders: 1600, revenue: 2900 },
  { name: "May", orders: 900, revenue: 1400 },
  { name: "Jun", orders: 100, revenue: 310 },
  { name: "Jul", orders: 1700, revenue: 3100 },
  { name: "Aug", orders: 700, revenue: 2510 },
  { name: "Sep", orders: 100, revenue: 3100 },
  { name: "Oct", orders: 2000, revenue: 2000 },
  { name: "Nov", orders: 2500, revenue: 3100 },
  { name: "Des", orders: 3100, revenue: 2200 },
];

export default function OrderRevenueChart() {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#34AE85" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#34AE85" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "#555", fontWeight: "bold" }}
          />
          <YAxis tick={{ fontSize: 12, fill: "#555", fontWeight: "bold" }} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="orders"
            stroke="#8884d8"
            fill="url(#colorOrders)"
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#82ca9d"
            fill="url(#colorRevenue)"
          />
          {/* <Legend /> */}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
