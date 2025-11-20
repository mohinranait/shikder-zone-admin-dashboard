"use client";
import { getSingleAttributes } from "@/actions/attributeApi";
import { getAllAttributeConfigs } from "@/actions/attributeConfigApi";
import AttributeConfigForm from "@/components/forms/AttributeConfigForm";
import AttributeConfigTable from "@/components/tables/AttributeConfigTable";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { addAttributeConfig } from "@/redux/features/attributeConfigSlice";
import { TAttributeConfigType } from "@/types/attributeConfig.type";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AttributeConfigureComponent = () => {
  const attributeId: string = useParams()?.attrId as string;

  const { selectedAttributeConfig } = useAppSelector(
    (state) => state.attributeConfig
  );
  const router = useRouter();

  const [attribute, setAttribute] = useState<TAttributeConfigType | null>(null);

  useEffect(() => {
    if (!attributeId) return;
    (async function () {
      try {
        // Call API for load all attributes
        const data = await getSingleAttributes(attributeId);
        if (data?.success) {
          setAttribute(data?.payload);
        }
      } catch (error: unknown) {
        toast.error(`${error}`);
      }
    })();
  }, [attributeId]);

  return (
    <div>
      <div>
        <div className="flex pl-6 flex-col ">
          <div className="font-semibold items-center tracking-tight flex gap-1 text-xl">
            <span onClick={() => router.back()} className=" cursor-pointer">
              <ArrowLeft
                size={18}
                className="text-slate-700 hover:text-slate-900"
              />
            </span>{" "}
            {attribute?.name}
          </div>
          <div className="text-sm text-muted-foreground">
            {attribute?.name} and update all attribute information
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className=" lg:min-w-[350px]  ">
          <div className="">
            <div className="flex flex-col  p-6">
              <div className="font-semibold tracking-tight text-xl">
                {selectedAttributeConfig ? "Update " : "Configure "}{" "}
                {attribute?.name} Attribute
              </div>
              <div className="text-sm text-muted-foreground">
                {selectedAttributeConfig ? "Update " : "Create "} and update all
                attribute information
              </div>
            </div>
            <div className="p-6 pt-0">
              <AttributeConfigForm attributeId={attributeId} />
            </div>
          </div>
        </div>
        <div className=" lg:w-full">
          <AttributeConfigTable />
        </div>
      </div>
    </div>
  );
};

export default AttributeConfigureComponent;
