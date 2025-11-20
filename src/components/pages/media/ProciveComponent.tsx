"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { TMediaType } from "@/types/media.type";
import Image from "next/image";
import React, { useState } from "react";
import UploadImageComponent from "./UploadImageComponent";
import { Button } from "@/components/ui/button";
import { setIsModal, setSelectedImage } from "@/redux/features/mediaSlice";

const ProciveComponent = () => {
  // Redux state
  const { images, uploadVariant } = useAppSelector((state) => state.media);
  const dispatch = useAppDispatch();

  // Local state
  const [singleImage, setSingleImage] = useState<TMediaType | null>(null);
  const [multipleImages, setMultipleImages] = useState<TMediaType[]>([]);
  // Tabs state
  const [tabs, setTabs] = useState<"Media" | "Upload">("Media");

  // Insert selected image or images
  const handleInsertSelectedImage = () => {
    if (uploadVariant === "Multiple") {
      dispatch(setSelectedImage(multipleImages));
    } else {
      dispatch(setSelectedImage(singleImage as TMediaType));
    }

    // dispatch(setIsModal(false));
  };

  // handle select image
  const handleSelectImage = (img: TMediaType) => {
    if (uploadVariant === "Multiple") {
      setMultipleImages((prev) => [...prev, img]);
    } else {
      setSingleImage(img);
    }
  };
  return (
    <div className="flex flex-col z-[99999] gap-4">
      <div>
        <div className="flex ">
          <button
            onClick={() => setTabs("Media")}
            className={`py-2 px-2 text-sm  border ${
              tabs === "Media"
                ? "bg-primary text-slate-200"
                : "text-slate-800 bg-white"
            }   `}
          >
            Media library
          </button>
          <button
            onClick={() => setTabs("Upload")}
            className={`py-2 px-2 text-sm  border border-l-0 ${
              tabs === "Upload"
                ? "bg-primary text-slate-200"
                : "text-slate-800 bg-white"
            } `}
          >
            Upload file
          </button>
        </div>
      </div>
      {tabs === "Media" ? (
        <div className="flex gap-4">
          <div className="w-full grid items-start rounded-md  gap-3 grid-cols-3 sm:grid-cols-3 md:grid-cols-3  lg:grid-cols-5 2xl:grid-cols-7 ">
            {images?.map((img, index) => (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectImage(img);
                }}
                key={index}
                className="border h-[130px] cursor-pointer bg-slate-200 border-slate-200"
              >
                <Image
                  src={img?.fileUrl || "/images/avater.jpg"}
                  width={100}
                  height={100}
                  alt="image"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="w-[300px]">
            {uploadVariant === "Multiple" ? (
              <div>
                <div className="grid grid-cols-2">
                  {multipleImages?.length > 0 ? (
                    multipleImages?.map((img, i) => (
                      <Image
                        key={i}
                        src={img?.fileUrl}
                        width={100}
                        height={100}
                        alt="image"
                      />
                    ))
                  ) : (
                    <div>Images not selected</div>
                  )}
                </div>
                <div>
                  <Button
                    type="button"
                    className="w-full bg-primary text-white"
                    onClick={handleInsertSelectedImage}
                    disabled={multipleImages?.length == 0 ? true : false}
                  >
                    Insert
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex w-full gap-5">
                {singleImage && (
                  <div className="w-[350px] p-4 bg-white rounded ">
                    <div className="flex gap-2 flex-col">
                      <div className="w-full max-h-[200px]">
                        <Image
                          src={singleImage?.fileUrl}
                          width={200}
                          height={200}
                          alt="a"
                          className="h-[200px] object-cover overflow-hidden w-full"
                        />
                      </div>
                      <ul className="flex flex-col gap-2">
                        <li className="flex gap-2 items-start justify-between">
                          <span className="text-base text-slate-800">Size</span>
                          <span className="text-base text-slate-600">
                            {singleImage?.size}
                          </span>
                        </li>
                        <li className="flex gap-2 items-start justify-between">
                          <span className="text-base text-slate-800">
                            Width
                          </span>
                          <span className="text-base text-slate-600">
                            {singleImage?.width}px
                          </span>
                        </li>
                        <li className="flex gap-2 items-start justify-between">
                          <span className="text-base text-slate-800">
                            Height
                          </span>
                          <span className="text-base text-slate-600">
                            {singleImage?.height}px
                          </span>
                        </li>
                        <li className="flex gap-2 items-start justify-between">
                          <span className="text-base text-slate-800">
                            Extension
                          </span>
                          <span className="text-base text-slate-600">
                            {singleImage?.extension}
                          </span>
                        </li>
                      </ul>
                      <div>
                        <Button
                          type="button"
                          className="w-full bg-primary text-white"
                          onClick={handleInsertSelectedImage}
                        >
                          Insert
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <UploadImageComponent />
        </div>
      )}
    </div>
  );
};

export default ProciveComponent;
