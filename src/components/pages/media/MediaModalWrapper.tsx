"use client";
import React from "react";

import ProciveComponent from "./ProciveComponent";

const MediaModalWrapper = () => {
  return (
    <div className="h-full">
      <div className="md:flex  w-full ">
        <div>
          <div className="md:w-[160px]">
            <ul className="flex flex-row md:flex-col gap-3 md:gap-0">
              <li className="py-2 cursor-pointer px-3  rounded-l hover:bg-slate-200 text-sm text-primary">
                Choose image
              </li>
              <li className="py-2 cursor-pointer px-3  rounded-l hover:bg-slate-200 text-sm text-primary">
                Insert URL
              </li>
            </ul>
          </div>
        </div>
        <div className="md:flex-grow">
          <ProciveComponent />
        </div>
      </div>
    </div>
  );
};

export default MediaModalWrapper;
