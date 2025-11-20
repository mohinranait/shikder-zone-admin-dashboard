"use client";
import CategoryForm from "@/components/forms/CategoryForm";
import CategoryTable from "@/components/tables/CategoryTable";
import React from "react";

const CategoryPageComponent = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className=" lg:min-w-[350px]  ">
          <div className="rounded-lg border bg-card text-card-foreground shadow">
            <div className="flex flex-col  p-6">
              <div className="font-semibold tracking-tight text-xl">
                Create new category
              </div>
              <div className="text-sm text-muted-foreground">
                Create and update all category information
              </div>
            </div>
            <div className="p-6 pt-0">
              <CategoryForm />
            </div>
          </div>
        </div>
        <div className=" lg:w-full">
          <CategoryTable />
        </div>
      </div>
    </div>
  );
};

export default CategoryPageComponent;
