"use client";
import React, { useState } from "react";
import ImageCard from "./ImageCard";
import { X } from "lucide-react";
import ImageDetailsModal from "@/components/modals/ImageDetailsModal";
import UploadImageComponent from "./UploadImageComponent";
import { useAppSelector } from "@/hooks/useRedux";

const MediaWrapper = () => {
  const { images } = useAppSelector((state) => state.media);
  const [isUploadSection, setIsUploadSection] = useState<boolean>(false);
  const [imageIndex, setImageIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-3  items-center">
        <p className="text-xl font-medium">Media Library</p>
        <button
          onClick={() => setIsUploadSection(!isUploadSection)}
          className="py-1 px-2 text-sm rounded border border-primary text-primary"
        >
          Add new media file
        </button>
      </div>
      {isUploadSection && (
        <div className="relative h-[150px]">
          <span
            onClick={() => setIsUploadSection(false)}
            className="absolute h-[30px] w-[30px] top-3 right-3 cursor-pointer"
          >
            <X size={22} className="text-slate-700" />
          </span>
          <UploadImageComponent />
        </div>
      )}
      <div>
        <div className="grid gap-3 grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
          {images?.map((img, index) => (
            <ImageCard
              key={index}
              img={img}
              onCallBack={() => {
                setImageIndex(index);
                setIsOpen(true);
              }}
            />
          ))}
        </div>
      </div>

      <ImageDetailsModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        imageIndex={imageIndex}
        indexCallback={(idx: number | null) => setImageIndex(idx)}
      />
    </div>
  );
};

export default MediaWrapper;
