"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { TMediaType } from "@/types/media.type";
import Image from "next/image";
import React, { useState } from "react";
import UploadImageComponent from "./UploadImageComponent";
import { Button } from "@/components/ui/button";
import { setFiles, setSelectedImage } from "@/redux/features/mediaSlice";
import { LoaderCircle, Plus, Trash2, X } from "lucide-react";
import { instance } from "@/hooks/useAxios";
import { formatFileSize } from "@/utils/helpers";

const ProciveComponent = () => {
  // Redux state
  const { images, uploadVariant } = useAppSelector((state) => state.media);
  const dispatch = useAppDispatch();

  // Local state
  const [singleImage, setSingleImage] = useState<TMediaType | null>(null);
  const [multipleImages, setMultipleImages] = useState<TMediaType[]>([]);
  // Tabs state
  const [tabs, setTabs] = useState<"Media" | "Upload">("Media");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Insert selected image or images
  const handleInsertSelectedImage = () => {
    if (uploadVariant === "Multiple") {
      dispatch(setSelectedImage(multipleImages));
    } else {
      dispatch(setSelectedImage(singleImage as TMediaType));
    }
  };

  // handle select image
  const handleSelectImage = (img: TMediaType) => {
    if (uploadVariant === "Multiple") {
      setMultipleImages((prev) => [...prev, img]);
    } else {
      setSingleImage(img);
    }
  };

  // Delete media handler
  const handleDelete = async () => {
    if (!singleImage?._id) return;

    setIsDeleting(true);

    try {
      const res = await instance.delete(`/media/${singleImage._id}`);
      const resData = res.data;

      if (resData?.success) {
        const arr = [...images];
        const filteredArr = arr.filter((img) => img._id !== singleImage._id);
        dispatch(setFiles(filteredArr));
        setSingleImage(null);
      }
    } catch (error) {
      console.log({ error });
    }
    setIsDeleting(false);
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
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="order-2 sm:order-1 w-full md:max-h-[calc(80vh-110px)] overflow-y-auto grid items-start rounded-md  gap-3 grid-cols-3 sm:grid-cols-3 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-7 ">
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
          <div className="order-1 sm:order-2">
            <div className="w-[300px]">
              {uploadVariant === "Multiple" ? (
                <div>
                  <div className="grid pb-2 gap-2 grid-cols-2 xl:grid-cols-3">
                    {multipleImages?.length > 0 ? (
                      multipleImages?.map((img, i) => (
                        <div key={i} className="border relative p-1">
                          <button
                            onClick={() => {
                              const arr = [...multipleImages]?.filter(
                                (fImg) => fImg?._id !== img?._id
                              );
                              setMultipleImages(arr);
                            }}
                            type="button"
                            className="rounded-full bg-white shadow hover:bg-red-600 hover:text-white w-4 h-4 flex items-center justify-center absolute top-0 right-0"
                          >
                            <X className=" size-3" />
                          </button>
                          <Image
                            src={img?.fileUrl}
                            width={100}
                            height={100}
                            alt="image"
                            className=" w-full "
                          />
                        </div>
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
                    <div className="sm:w-[300px] p-4 bg-white rounded ">
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
                            <span className="text-base text-slate-800">
                              Size
                            </span>
                            <span className="text-base text-slate-600">
                              {formatFileSize(singleImage?.size || 0)}
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
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            className="w-full bg-primary text-white"
                            onClick={handleInsertSelectedImage}
                          >
                            <Plus />
                            Insert
                          </Button>
                          <Button
                            type="button"
                            variant={"destructive"}
                            className=""
                            onClick={handleDelete}
                          >
                            {isDeleting ? (
                              <LoaderCircle className="animate-spin" />
                            ) : (
                              <Trash2 />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
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
