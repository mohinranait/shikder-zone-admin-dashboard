import BrandForm from "@/components/forms/BrandForm";
import BrandTable from "@/components/tables/BrandTable";
import React from "react";

const BrandPageComponent = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className=" lg:min-w-[350px]  ">
          <div className="rounded-lg border bg-card text-card-foreground shadow">
            <div className="flex flex-col  p-6">
              <div className="font-semibold tracking-tight text-xl">
                Create new Brand
              </div>
              <div className="text-sm text-muted-foreground">
                Create and update all brand information
              </div>
            </div>
            <div className="p-6 pt-0">
              <BrandForm />
            </div>
          </div>
        </div>
        <div className=" lg:w-full">
          <BrandTable />
        </div>
      </div>
    </div>
  );
};

export default BrandPageComponent;
