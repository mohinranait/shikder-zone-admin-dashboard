"use client";
import React, { FC, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createNewAttribute, updateAttribute } from "@/actions/attributeApi";
import {
  addAttribute,
  setSelectedAttribute,
} from "@/redux/features/attributeSlice";

// Attribute schema validation
const attributeSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Minimum length 2 characters")
    .max(60, "Maximum length 60 characters")
    .required("Name field is required"),
  status: Yup.string().notRequired().default("Active"),
});

type Props = {
  closeUpdateModal?: React.Dispatch<React.SetStateAction<boolean>>;
};

const AttributeForm: FC<Props> = ({ closeUpdateModal }) => {
  // Redux state
  const { selectedAttribute } = useAppSelector((state) => state.attribute);
  const dispatch = useAppDispatch();

  // Local State
  const [slug, setSlug] = useState<string>(selectedAttribute?.slug || "");

  const formik = useFormik({
    initialValues: {
      name: selectedAttribute?.name || "",
      slug: selectedAttribute?.slug || "",
      status: selectedAttribute?.status || "Active",
    },
    enableReinitialize: true,
    validationSchema: attributeSchema,
    onSubmit: async (values, { resetForm }) => {
      if (selectedAttribute?._id) {
        try {
          // Call API for update attribute
          const data = await updateAttribute(selectedAttribute?._id, {
            ...values,
            slug: slug ? slug : values?.name,
          });

          if (data.success) {
            dispatch(addAttribute({ data: data?.payload, type: "Update" }));
            toast.success("Attribute is Updated");
            if (closeUpdateModal) {
              closeUpdateModal(false);
            }

            dispatch(setSelectedAttribute(null));
            resetForm();
          }
        } catch (error) {}
      } else {
        try {
          // Call API for CREATE new attribute
          const data = await createNewAttribute({
            ...values,
            status: "Active",
            slug: slug ? slug : values?.name,
          });
          if (data.success) {
            dispatch(addAttribute({ data: data?.payload, type: "AddNew" }));
            dispatch(setSelectedAttribute(null));
            toast.success("Attribute is created");
            resetForm();
          }
        } catch (error) {}
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className=" grid gap-5">
      <div className="grid gap-2">
        <label
          htmlFor="name"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Attribute Name
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
          Attribute Slug
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

      {selectedAttribute && (
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

      <div className="flex items-center  pt-0">
        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full">
          {selectedAttribute ? "Update" : "Save"}
        </button>
      </div>
    </form>
  );
};

export default AttributeForm;
