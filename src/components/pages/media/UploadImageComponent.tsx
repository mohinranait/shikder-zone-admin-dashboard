"use client";

import { uploadImage } from "@/actions/mediaApi";
import { useAppDispatch } from "@/hooks/useRedux";
import { addFile } from "@/redux/features/mediaSlice";
import { useState } from "react";
import toast from "react-hot-toast";

const UploadImageComponent = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fl = e.target.files[0];

      const formData = new FormData();
      formData.append("file", fl);

      try {
        setIsLoading(true);
        const data = await uploadImage(formData);

        if (data?.success) {
          const file = data?.payload?.file;
          dispatch(addFile(file));
          toast.success("Uploaded");
          setIsLoading(false);
        }
      } catch (error) {
        toast.error("Somthing wrong");
        setIsLoading(false);
      }
    }
  };

  return (
    <label
      htmlFor="upload_files"
      className="border-2 bg-white  h-[150px] w-full flex items-center justify-center border-slate-300 border-dashed"
    >
      {isLoading ? (
        <div className="relative w-full max-w-lg h-5 bg-blue-200 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-bar-color bg-stripes text-white text-sm flex items-center justify-center">
            Uploading ...
          </div>
        </div>
      ) : (
        <div className="border border-primary rounded py-1 px-2 cursor-pointer">
          Select files
        </div>
      )}
      <input
        type="file"
        id="upload_files"
        hidden
        onChange={handleFileChange}
        disabled={isLoading}
      />
    </label>
  );
};

export default UploadImageComponent;
