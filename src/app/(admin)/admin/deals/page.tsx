"use client";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import DealForm from "@/components/forms/deal-form";
import { TDels } from "@/types/deal.type";
import { getAllDelas } from "@/actions/dealApi";
import { useAppSelector } from "@/hooks/useRedux";
import DealTabs from "@/components/tabs/deal-tabs";

const DealsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [deals, setDeals] = useState<TDels[]>([]);

  useEffect(() => {
    (async function () {
      try {
        const res = await getAllDelas();
        if (res.success) {
          setDeals(res?.payload?.deals);
        }
      } catch (error) {
        console.log({ error });
      }
    })();
  }, []);
  return (
    <div>
      <Button
        type="button"
        onClick={() => setIsOpen(true)}
        className="border border-slate-100 gap-1 bg-primary text-white rounded-[60px] inline-flex items-center justify-center py-1 text-sm  px-1 pl-2"
      >
        Add New Section
        <span className="inline-flex items-center justify-center p-2 rounded-full w-[30px] h-[30px] bg-white text-slate-900">
          <PlusIcon />
        </span>
      </Button>
      {deals?.map((deal, index) => (
        <div key={index} className="w-full bg-white p-2 rounded-lg border  ">
          <div className="grid grid-cols-5 gap-2">
            <div className="col-span-2">
              <DealTabs />
            </div>
            <div className="col-span-3 pt-0">
              <div className="flex mb-2 items-center justify-between">
                <div className="">
                  <p className="font-semibold tracking-tight text-xl">
                    All Brands
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Manage your brands
                  </p>
                </div>

                <Button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="border border-slate-100 gap-1 bg-primary text-white rounded-[60px] inline-flex items-center justify-center py-1 text-sm  px-1 pl-2"
                >
                  Add New Section
                  <span className="inline-flex items-center justify-center p-2 rounded-full w-[30px] h-[30px] bg-white text-slate-900">
                    <PlusIcon />
                  </span>
                </Button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                <div className="w-full border h-full">a</div>
                <div className="w-full border h-full">b</div>
                <div className="w-full border h-full">c</div>
                <div className="w-full border h-full">d</div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <DealForm closeModal={setIsOpen} open={isOpen} />
    </div>
  );
};

export default DealsPage;
