"use client";
import { UploadCloudIcon } from "lucide-react";
import React, { FC, useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { createNewBrand, updateBrand } from "@/actions/brandApi";
import { addBrand, setSelectedBrand } from "@/redux/features/brandSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addVariant, setIsModal } from "@/redux/features/mediaSlice";
import SelectImageFromModal from "../shared/SelectImageFromModal";
import { TMediaType } from "@/types/media.type";

// brand schema validation
const brandSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Minimum length 2 characters")
    .max(60, "Maximum length 60 characters")
    .required("Name field is required"),
  brandBanner: Yup.string().notRequired(),
  brandThumbnail: Yup.mixed().notRequired(),
  status: Yup.string().notRequired().default("Active"),
});

type Props = {
  closeModal?: React.Dispatch<React.SetStateAction<boolean>>;
};

const BrandForm: FC<Props> = ({ closeModal }) => {
  // Redux state
  const { selectedBrand } = useAppSelector((state) => state.brand);
  const dispatch = useAppDispatch();
  const { images } = useAppSelector((state) => state.media);

  // Local State
  const [slug, setSlug] = useState<string>(selectedBrand?.slug || "");
  const [file, setFile] = useState<TMediaType | null>(null);
  // const [images, setImages] = useState<TMediaType[]>([]);

  const formik = useFormik({
    initialValues: {
      name: selectedBrand?.name || "",
      slug: selectedBrand?.slug || "",
      brandBanner: selectedBrand?.brandBanner || "",
      brandThumbnail: selectedBrand?.brandThumbnail || "",
      status: selectedBrand?.status || "Active",
    },
    enableReinitialize: true,
    validationSchema: brandSchema,
    onSubmit: async (values, { resetForm }) => {
      if (selectedBrand?._id) {
        try {
          // Call API for update brand
          const data = await updateBrand(selectedBrand?._id, {
            ...values,
            slug: slug ? slug : values?.name,
            brandThumbnail: file?.fileUrl || values?.brandThumbnail,
          });
          setFile(null);
          if (data.success) {
            dispatch(addBrand({ data: data?.payload, type: "Update" }));
            toast.success("Brand is Updated");
            if (closeModal) {
              closeModal(false);
            }

            dispatch(setSelectedBrand(null));
            resetForm();
          }
        } catch (error) {}
      } else {
        try {
          // Call API for CREATE new Brand
          const data = await createNewBrand({
            ...values,
            status: "Active",
            slug: slug ? slug : values?.name,
            brandThumbnail: file?.fileUrl || "",
          });
          if (data.success) {
            dispatch(addBrand({ data: data?.payload, type: "AddNew" }));
            if (closeModal) {
              closeModal(false);
            }
            dispatch(setSelectedBrand(null));
            toast.success("Brand is created");
            resetForm();
            setFile(null);
          }
        } catch (error) {}
      }
    },
  });

  useEffect(() => {
    if (selectedBrand) {
      const allImages: TMediaType[] = [...images];
      const findImg = allImages?.find(
        (item) => item?.fileUrl === selectedBrand?.brandThumbnail
      );
      if (findImg) {
        setFile(findImg);
      }
    } else {
      setFile(null);
    }
  }, [selectedBrand, images]);

  return (
    <form onSubmit={formik.handleSubmit} className=" grid gap-5">
      <div className="grid gap-2">
        <label
          htmlFor="name"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Brand Name
        </label>
        <input
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          id="name"
          name="name"
          placeholder="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        {formik.errors.name && formik.touched.name && (
          <p className="text-red-500 text-sm">{formik.errors.name}</p>
        )}
      </div>
      <div className="grid gap-2">
        <label
          htmlFor="slug"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Brand Slug
        </label>
        <input
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          id="slug"
          name="slug"
          placeholder="Slug"
          value={slug || formik.values.name?.split(" ").join("-")}
          onChange={(e) => setSlug(e.target.value)}
        />
      </div>

      {selectedBrand && (
        <div className="grid gap-2">
          <label
            htmlFor="status"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Status
          </label>

          <Select
            onValueChange={(value) => formik.setFieldValue("status", value)}
            value={formik.values.status}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Parent not select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={`Active`} className="cursor-pointer">
                Active
              </SelectItem>
              <SelectItem value={`Inactive`} className="cursor-pointer">
                Inactive
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
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
                backgroundImage: `url('${file?.fileUrl}')`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              className="w-[80px] h-[80px] cursor-pointer hover:bg-slate-200 flex items-center justify-center border-slate-200 rounded border border-dashed "
            >
              <UploadCloudIcon />
            </div>
          </SelectImageFromModal>
        </div>
      </div>
      {/* <div className="grid gap-2">
        <label
          htmlFor="thumbnail"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Thumbnails
        </label>
        <div className="flex flex-wrap gap-4">
          {images?.length > 0 &&
            images?.map((file, i) => (
              <div
                key={i}
                style={{
                  backgroundImage: `url('${file?.fileUrl}')`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                className="w-[80px] h-[80px] cursor-pointer hover:bg-slate-200 flex items-center justify-center border-slate-200 rounded border border-dashed "
              ></div>
            ))}
          <SelectImageFromModal multiFiles={setImages}>
            <div
              onClick={() => {
                dispatch(setIsModal(true));
                dispatch(addVariant("Multiple"));
              }}
              className="w-[80px] h-[80px] cursor-pointer hover:bg-slate-200 flex items-center justify-center border-slate-200 rounded border border-dashed "
            >
              <UploadCloudIcon />
            </div>
          </SelectImageFromModal>
        </div>
      </div> */}

      <div className="flex items-center  pt-0">
        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full">
          {selectedBrand ? "Update" : "Save"}
        </button>
      </div>
    </form>
  );
};

export default BrandForm;
