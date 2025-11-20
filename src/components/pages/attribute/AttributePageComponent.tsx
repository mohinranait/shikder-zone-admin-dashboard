"use client";
import { getAllAttributes } from "@/actions/attributeApi";
import AttributeForm from "@/components/forms/AttributeForm";
import AttributeTable from "@/components/tables/AttributeTable";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { addAttribute } from "@/redux/features/attributeSlice";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const AttributePageComponent = () => {
  const { selectedAttribute } = useAppSelector((state) => state.attribute);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async function () {
      try {
        // Call API for load all attributes
        const data = await getAllAttributes();
        if (data?.success) {
          dispatch(addAttribute({ data: data?.payload, type: "Array" }));
        }
      } catch (error: unknown) {
        toast.error(`${error}`);
      }
    })();
  }, [dispatch]);
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className=" lg:min-w-[350px]  ">
          <div className="rounded-lg border bg-card text-card-foreground shadow">
            <div className="flex flex-col  p-6">
              <div className="font-semibold tracking-tight text-xl">
                {selectedAttribute ? "Update" : "Create new"} Attribute
              </div>
              <div className="text-sm text-muted-foreground">
                {selectedAttribute ? "Update" : "Create"} and update all
                attribute information
              </div>
            </div>
            <div className="p-6 pt-0">
              <AttributeForm />
            </div>
          </div>
        </div>
        <div className=" lg:w-full">
          <AttributeTable />
        </div>
      </div>
    </div>
  );
};

export default AttributePageComponent;
