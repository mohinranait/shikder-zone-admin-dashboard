import SelectImageFromModal from "@/components/shared/SelectImageFromModal";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { addVariant, setIsModal } from "@/redux/features/mediaSlice";
import { setProduct } from "@/redux/features/productSlice";
import { TMediaType } from "@/types/media.type";
import { UploadCloudIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const UploadImage = () => {
  // Redux state
  const { product } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  // Local state
  const [file, setFile] = useState<TMediaType | null>(null);
  const [gallarys, setGallarys] = useState<TMediaType[]>([]);

  useEffect(() => {
    if (file) {
      const singleProduct = { ...product };

      dispatch(
        setProduct({
          ...singleProduct,
          featureImage: {
            image: file.fileUrl || "",
          },
        })
      );
    } else {
    }
  }, [file]);

  // update product gallary
  useEffect(() => {
    if (gallarys.length > 0) {
      const singleProduct = { ...product };

      dispatch(
        setProduct({
          ...singleProduct,
          imageGallery: gallarys?.map((img) => img?.fileUrl),
        })
      );
    } else {
    }
  }, [gallarys]);

  return (
    <>
      <div className="grid gap-2">
        <label
          htmlFor="thumbnail"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Thumbnail
        </label>
        <div className="flex gap-4">
          <SelectImageFromModal singleFile={setFile}>
            <div
              onClick={() => {
                dispatch(setIsModal(true));
                dispatch(addVariant("Single"));
              }}
              style={{
                backgroundImage: `url('${product?.featureImage?.image}')`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              className=" h-[120px] w-full cursor-pointer hover:bg-slate-200 flex items-center justify-center border-slate-200 rounded border border-dashed "
            >
              <UploadCloudIcon />
            </div>
          </SelectImageFromModal>
        </div>
      </div>
      <div className="grid gap-2">
        <label
          htmlFor="thumbnail"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Image Gallary
        </label>
        <div className="grid grid-cols-3 gap-2">
          {product?.imageGallery &&
            product?.imageGallery?.length > 0 &&
            product?.imageGallery?.map((file, i) => (
              <div
                key={i}
                style={{
                  backgroundImage: `url('${file}')`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                className="w-[80px] h-[80px] cursor-pointer hover:bg-slate-200 flex items-center justify-center border-slate-200 rounded border border-dashed "
              ></div>
            ))}
          <SelectImageFromModal multiFiles={setGallarys}>
            <div
              onClick={() => {
                dispatch(setIsModal(true));
                dispatch(addVariant("Multiple"));
              }}
              className="  h-[80px]  cursor-pointer hover:bg-slate-200 flex items-center justify-center border-slate-200 rounded border border-dashed "
            >
              <UploadCloudIcon />
            </div>
          </SelectImageFromModal>
        </div>
      </div>
    </>
  );
};

export default UploadImage;
