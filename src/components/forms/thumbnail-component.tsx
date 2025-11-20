import React from "react";
import SelectImageFromModal from "../shared/SelectImageFromModal";
import { UploadCloudIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setProduct } from "@/redux/features/productSlice";
import {
  addUnicName,
  addVariant,
  setIsModal,
} from "@/redux/features/mediaSlice";

const ThumbnailComponent = () => {
  const { product } = useAppSelector((state) => state.product);
  const uniqueNameForUploadImage = useAppSelector(
    (state) => state.media.imgUnicName
  );
  const dispatch = useAppDispatch();
  return (
    <div className="grid gap-2">
      <label
        htmlFor="thumbnail"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Thumbnail
      </label>
      <div className="flex gap-4">
        <SelectImageFromModal
          singleFile={(imgFile) => {
            if (uniqueNameForUploadImage === "productThumbanil") {
              dispatch(
                setProduct({
                  ...product,
                  featureImage: {
                    ...product.featureImage,
                    image: imgFile.fileUrl || "",
                  },
                })
              );
            }
          }}
        >
          <div
            onClick={() => {
              dispatch(setIsModal(true));
              dispatch(addVariant("Single"));
              dispatch(addUnicName("productThumbanil"));
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
  );
};

export default ThumbnailComponent;
