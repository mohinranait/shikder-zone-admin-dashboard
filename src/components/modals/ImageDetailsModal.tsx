"use client";
import React, { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAppSelector } from "@/hooks/useRedux";
import { defaultImage } from "@/utils/exportImages";
import { TMediaType } from "@/types/media.type";
import { Button } from "../ui/button";
import Link from "next/link";
import { formatFileSize } from "@/utils/helpers";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  imageIndex: number | null;
  indexCallback: (idx: number | null) => void;
};

const ImageDetailsModal: FC<Props> = ({
  isOpen,
  setIsOpen,
  imageIndex,
  indexCallback,
}) => {
  const { images } = useAppSelector((state) => state.media);
  const [viewImage, setViewImage] = useState<TMediaType | null>(null);

  useEffect(() => {
    if (imageIndex !== null && images[imageIndex]) {
      setViewImage(images[imageIndex]);
    }
  }, [imageIndex, images]);

  const handleNavigateImage = (direction: "next" | "prev") => {
    if (imageIndex === null || images.length === 0) return;

    let newIndex = direction === "next" ? imageIndex + 1 : imageIndex - 1;

    // Handle loop navigation
    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;

    // Update the image index
    indexCallback(newIndex);
  };

  return (
    <Dialog
      onOpenChange={() => {
        setIsOpen(false);
        indexCallback(null);
        setViewImage(null);
      }}
      open={isOpen}
    >
      <DialogContent className="p-0 ">
        <DialogHeader className="px-3 pt-3 pb-2">
          <DialogTitle>View single media </DialogTitle>
          <DialogDescription>You want to update this data?</DialogDescription>
        </DialogHeader>
        <DialogDescription className="flex flex-col gap-3 max-h-[380px] overflow-y-auto ">
          <div className="flex  px-3 gap-2">
            <div>
              <Image
                src={viewImage?.fileUrl || defaultImage}
                width={400}
                height={400}
                alt="image"
                className="h-full object-contain"
              />
            </div>
            <div className="w-[200px]">
              <p className="text-slate-700 text-lg font-medium">
                {/* {viewImage?.fileName || "image.png"} */}
              </p>
              <ul>
                <li className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">Size:</span>
                  <span className="text-sm text-slate-700">
                    {formatFileSize(viewImage?.size || 0)}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">Width:</span>
                  <span className="text-sm text-slate-700">
                    {viewImage?.width}px
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">Height:</span>
                  <span className="text-sm text-slate-700">
                    {viewImage?.height}px
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">Extension:</span>
                  <span className="text-sm text-slate-700">
                    .{viewImage?.extension}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex bg-slate-200 rounded-b-lg justify-between items-center">
            <div className="flex pl-3 gap-2">
              <p className="cursor-pointer hover:text-pretty text-slate-800 text-sm">
                Download
              </p>
              <Link
                target="_blank"
                href={viewImage?.fileUrl || "#"}
                className="cursor-pointer hover:underline text-slate-800 text-sm"
              >
                View link
              </Link>
            </div>
            <div className="flex  pr-3">
              <Button
                type="button"
                onClick={() => handleNavigateImage("prev")}
                className="py-2 w-28 border-l bg-slate-500 text-white hover:bg-slate-600 px-2 cursor-pointer border-r border-slate-100"
              >
                <ChevronLeft /> Previous
              </Button>
              <Button
                type="button"
                onClick={() => handleNavigateImage("next")}
                className="py-2 w-28 bg-slate-500 text-white hover:bg-slate-600 px-2 cursor-pointer"
              >
                {" "}
                Next
                <ChevronRight />
              </Button>
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default ImageDetailsModal;
