import OrderRevenueChart from "@/components/charts/OrderRevenueChart";
import PieChartComponent from "@/components/charts/PieChartComponent";
import OrderTables from "@/components/pages/Order/OrderTables";
import {
  ArrowUp,
  CircleDollarSign,
  Package,
  Percent,
  UsersRound,
} from "lucide-react";
import React from "react";

const AdminDashboard = () => {
  return (
    <div>
      <div className="space-y-4">
        <div className="grid sm:grid-cols-2  lg:grid-cols-4 gap-4 ">
          <div className="bg-white rounded  border-slate-100 flex justify-between p-4">
            <div className="h-[80px]">
              <p className="font-medium text-gray-500">Sales</p>
              <p className="text-xl font-extrabold text-[#0084D1]">1.6K</p>
              <p className="flex items-center gap-1 mt-3 text-sm font-semibold text-[#4FB995]">
                <ArrowUp size={16} />
                2.5%
              </p>
            </div>
            <div>
              <span className="bg-[#E6F0F7] text-[#0084D1] w-[50px] h-[50px] flex items-center justify-center rounded-lg">
                <Percent size={30} />
              </span>
            </div>
          </div>
          <div className="bg-white rounded  border-slate-100 flex justify-between p-4">
            <div className="h-[80px]">
              <p className="font-medium text-gray-500">Customers</p>
              <p className="text-xl font-extrabold text-[#F9BF6A]">1.6K</p>
              <p className="flex items-center gap-1 mt-3 text-sm font-semibold text-[#4FB995]">
                <ArrowUp size={16} />
                2.5%
              </p>
            </div>
            <div>
              <span className="bg-[#FBF1E5] text-[#F9BF6A] w-[50px] h-[50px] flex items-center justify-center rounded-lg">
                <UsersRound size={30} />
              </span>
            </div>
          </div>
          <div className="bg-white rounded  border-slate-100 flex justify-between p-4">
            <div className="h-[80px]">
              <p className="font-medium text-gray-500">Products</p>
              <p className="text-xl font-extrabold text-[#34AE85]">1.6K</p>
              <p className="flex items-center gap-1 mt-3 text-sm font-semibold text-[#4FB995]">
                <ArrowUp size={16} />
                2.5%
              </p>
            </div>
            <div>
              <span className="bg-[#E6F2EF] text-[#34AE85] w-[50px] h-[50px] flex items-center justify-center rounded-lg">
                <Package size={30} />
              </span>
            </div>
          </div>
          <div className="bg-white rounded  border-slate-100 flex justify-between p-4">
            <div className="h-[80px]">
              <p className="font-medium text-gray-500">Revenue</p>
              <p className="text-xl font-extrabold text-[#E52CBB]">1.6K</p>
              <p className="flex items-center gap-1 mt-3 text-sm font-semibold text-[#4FB995]">
                <ArrowUp size={16} />
                2.5%
              </p>
            </div>
            <div>
              <span className="bg-[#F8E6F4] text-[#E52CBB] w-[50px] h-[50px] flex items-center justify-center rounded-lg">
                <CircleDollarSign size={30} />
              </span>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-6 gap-4">
          <div className="lg:col-span-4 bg-white rounded ">
            <div className="px-6 pt-4 pb-2 flex items-center justify-between">
              <p className="text-sm text-gray-600 font-semibold">
                Order and Revenue
              </p>
              <div className="flex justify-end items-center">
                <div className="border rounded border-gray-200 ">
                  <button
                    type="button"
                    className="px-2 py-1 text-sm bg-gray-100 rounded"
                  >
                    Month
                  </button>
                  <button
                    type="button"
                    className="px-2 py-1 text-sm hover:bg-gray-100 rounded-0 border-x border-gray-200"
                  >
                    Week
                  </button>
                  <button
                    type="button"
                    className="px-2 py-1 text-sm hover:bg-gray-100 rounded"
                  >
                    Day
                  </button>
                </div>
              </div>
            </div>
            <div className="pb-3 ">
              <OrderRevenueChart />
            </div>
          </div>
          <div className="lg:col-span-2 bg-white rounded ">
            <div className="px-3 pt-3 pb-2 flex items-center justify-between">
              <p className="text-sm text-gray-600 font-semibold">Orders</p>
            </div>
            <div>
              <PieChartComponent />
            </div>
          </div>
        </div>
        <div className=" ">
          <div className=" bg-white rounded ">
            <div className="px-6 pt-4  flex items-center justify-between">
              <p className="text-sm text-gray-600 font-semibold">
                Order and Revenue
              </p>
            </div>
            <div className="-mt-6">
              <OrderTables statusName="Pending" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
