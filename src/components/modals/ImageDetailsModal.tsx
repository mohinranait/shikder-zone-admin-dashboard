"use client";
import React, { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const ImageDetailsModal: FC<Props> = ({ isOpen, setIsOpen }) => {
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent className="p-0 overflow-hidden">
        <DialogHeader className="px-3 pt-3 pb-2">
          <DialogTitle>Category update </DialogTitle>
          <DialogDescription>You want to update this data?</DialogDescription>
        </DialogHeader>
        <DialogDescription className="flex  flex-col gap-3">
          <div className="flex max-h-[400px] px-3 gap-2">
            <div>
              <Image
                src={"/images/avater.jpg"}
                width={400}
                height={400}
                alt="image"
                className="h-full object-contain"
              />
            </div>
            <div className="w-[200px]">
              <p className="text-slate-700 text-lg font-medium ">abater.png</p>
              <ul>
                <li className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">Size:</span>
                  <span className="text-sm text-slate-700">10MB</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">Width:</span>
                  <span className="text-sm text-slate-700">400px</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">height:</span>
                  <span className="text-sm text-slate-700">400px</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex bg-slate-200  justify-between items-center">
            <div className="flex pl-3 gap-2 ">
              <p className="cursor-pointer hover:text-pretty text-slate-800 text-sm">
                Download
              </p>
              <p className="cursor-pointer hover:underline text-slate-800 text-sm">
                View link
              </p>
            </div>
            <div className="flex border pr-3 border-slate-100">
              <span className="py-2 border-l  bg-slate-500 text-white hover:bg-slate-600 px-2 cursor-pointer border-r border-slate-100">
                <ChevronLeft />
              </span>
              <span className="py-2 bg-slate-500 text-white hover:bg-slate-600 px-2 cursor-pointer">
                <ChevronRight />
              </span>
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default ImageDetailsModal;
