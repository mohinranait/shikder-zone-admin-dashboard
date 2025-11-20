import React from "react";

import { PlusIcon } from "lucide-react";
import Link from "next/link";
import ProductTable from "@/components/tables/ProductTable";

const AllProducts = () => {
  return (
    <div>
      <div className="w-full rounded-lg border bg-card text-card-foreground shadow">
        <div className="p-6 flex justify-between">
          <div>
            <p className="font-semibold tracking-tight text-xl">All Products</p>
            <p className="text-sm text-muted-foreground">Manage your product</p>
          </div>
          <div>
            <Link
              href={"/admin/product"}
              className="border border-slate-100 gap-1 bg-primary text-white rounded-[60px] inline-flex items-center justify-center py-1 text-sm  px-1 pl-2"
            >
              Add New
              <span className="inline-flex items-center justify-center p-2 rounded-full w-[30px] h-[30px] bg-white text-slate-900">
                <PlusIcon />
              </span>
            </Link>
          </div>
        </div>
        <ProductTable />
      </div>
    </div>
  );
};

export default AllProducts;
