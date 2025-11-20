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

import {
  createNewAttributeConfig,
  updateAttributeConfig,
} from "@/actions/attributeConfigApi";
import {
  addAttributeConfig,
  setSelectedAttributeConfig,
} from "@/redux/features/attributeConfigSlice";

// Attribute config schema validation
const attributeConfigSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, "Minimum length 2 characters")
    .max(60, "Maximum length 60 characters")
    .required("Name field is required"),
  status: Yup.string().notRequired().default("Active"),
});

type Props = {
  attributeId: string;
};

const AttributeConfigForm: FC<Props> = ({ attributeId }) => {
  // Redux state
  const { selectedAttributeConfig } = useAppSelector(
    (state) => state.attributeConfig
  );
  const dispatch = useAppDispatch();

  // Local State
  const [slug, setSlug] = useState<string>(selectedAttributeConfig?.slug || "");

  const formik = useFormik({
    initialValues: {
      name: selectedAttributeConfig?.name || "",
      slug: selectedAttributeConfig?.slug || "",
      status: selectedAttributeConfig?.status || "Active",
    },
    enableReinitialize: true,
    validationSchema: attributeConfigSchema,
    onSubmit: async (values, { resetForm }) => {
      if (selectedAttributeConfig?._id) {
        try {
          // Call API for update attribute config
          const data = await updateAttributeConfig(
            selectedAttributeConfig?._id,
            {
              ...values,
              attribute: attributeId,
              slug: slug ? slug : values?.name,
            }
          );

          if (data.success) {
            dispatch(
              addAttributeConfig({ data: data?.payload, type: "Update" })
            );
            toast.success("Attribute configuration is Updated");

            dispatch(setSelectedAttributeConfig(null));
            resetForm();
          }
        } catch (error) {}
      } else {
        try {
          // Call API for CREATE new attribute
          const data = await createNewAttributeConfig({
            ...values,
            status: "Active",
            attribute: attributeId,
            slug: slug ? slug : values?.name,
          });
          if (data.success) {
            dispatch(
              addAttributeConfig({ data: data?.payload, type: "AddNew" })
            );
            dispatch(setSelectedAttributeConfig(null));
            toast.success("Attribute configuration is created");
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
          Property Name
        </label>
        <input
          className="flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
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
          className="flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          id="slug"
          name="slug"
          placeholder="Slug"
          value={slug || formik.values.name?.split(" ").join("-")}
          onChange={(e) => setSlug(e.target.value)}
        />
      </div>

      {selectedAttributeConfig && (
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
          {selectedAttributeConfig ? "Update" : "Save"}
        </button>
      </div>
    </form>
  );
};

export default AttributeConfigForm;
