"use client";
import { BookPlus, Pen, Save, UploadCloudIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { compareAsc, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { TagsInput } from "react-tag-input-component";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import ProductVarient from "../pages/Product/ProductVarient";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  setProduct,
  setProductErrors,
  updateProducts,
  updateSingleProduct,
} from "@/redux/features/productSlice";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import SelectImageFromModal from "../shared/SelectImageFromModal";
import { addVariant, setIsModal } from "@/redux/features/mediaSlice";
import { TMediaType } from "@/types/media.type";
import ManageCategory from "../pages/Product/ManageCategory";
import ManageBrand from "../pages/Product/ManageBrand";
import {
  createNewProduct,
  getSingleProductBySlug,
  updateProduct,
} from "@/actions/productApi";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { generateSlug } from "@/utils/helpers";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import { FRONTEND_URL } from "@/accessEnv";
import { productValidation } from "@/validations/product.validation";
import { TProduct } from "@/types/product.type";
import ThumbnailComponent from "./thumbnail-component";

const ProductForm = () => {
  // Redux state
  const { product, errors } = useAppSelector((state) => state.product);
  const { images } = useAppSelector((state) => state.media);
  const dispatch = useAppDispatch();

  // Hooks
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  // Local State
  const [gallarys, setGallarys] = useState<TMediaType[]>([]);
  const [isOpenSlug, setIsOpenSlug] = useState<boolean>(false);
  const [slug, setSlug] = useState<string>("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [freeShipping, setFreeShipping] = useState<"no" | "yes">("no");

  // Submit product form for SAVE Product in DB
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errorss = productValidation(product);
    if (Object.keys(errorss)?.length > 0) {
      dispatch(setProductErrors(errorss));
      return;
    }

    // Price Validation
    if (!product?.price?.discountValue && product?.price?.discountValue != 0) {
      if (product?.price?.discountValue < product?.price?.productPrice) {
        return toast.error("Sell Price is less than Product Price");
      }
    }

    // Date Validation
    if (product?.offerDate?.end_date) {
      // If end date is selected then start date is required
      if (!product?.offerDate?.start_date) {
        return toast.error("Start date is required");
      }

      // Start date less than end date
      if (
        compareAsc(
          product?.offerDate?.start_date,
          product?.offerDate?.end_date
        ) === 1
      ) {
        return toast.error("End date is less than start date");
      }
    }
    const formate = {
      ...product,
      // featureImage: {
      //   image: file?.fileUrl || "",
      // },
      publish_date: product?.publish_date ? product?.publish_date : new Date(),
      imageGallery: gallarys?.map((img) => img?.fileUrl),
      slug: product?.slug ? generateSlug(product?.slug) : generateSlug(slug),
      seo_keyword: keywords,
      details: content,
    };

    if (editId) {
      if (!product?._id) return;
      try {
        const data = await updateProduct(product?._id, formate);

        if (data?.success) {
          dispatch(updateSingleProduct(data?.payload));
          router.push(`/admin/product?edit=${data?.payload?.slug}`);
          toast.success("Product updated");
        } else {
          toast.error("Somthing wrong");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const data = await createNewProduct(formate);

        if (data?.success) {
          dispatch(updateProducts(product));
          router.push(`/admin/product?edit=${data?.payload?.slug}`);
          toast.success("Product created");
        } else {
          toast.error("Somthing wrong");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // handle delete Product by ID
  useEffect(() => {
    dispatch(setProductErrors({}));
    if (!editId) {
      setContent("");
      setGallarys([]);
      setSlug("");
      // setFile(null);
      dispatch(setProduct({ variant: "Single Product" } as TProduct));
      return;
    }
    (async function () {
      setLoading(true);
      try {
        const data = await getSingleProductBySlug(editId);
        if (data?.success) {
          dispatch(setProduct(data?.payload));
          // const featureImg = images?.find(
          //   (d) => d.fileUrl === data?.payload?.featureImage?.image
          // );
          // if (featureImg) {
          //   setFile(featureImg);
          // }

          const gallarysImg = images?.filter((d) =>
            data?.payload?.imageGallery?.includes(d?.fileUrl)
          );
          setGallarys(gallarysImg);
          setSlug(data?.payload?.slug);
          setContent(data?.payload?.details);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {}
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editId]);

  if (loading) return <div>Data Fetching</div>;

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-between items-center ">
        <p className="text-xl font-medium text-slate-950">Add New Product</p>
        <div className="space-x-4">
          <Button type="button" variant={"outline"}>
            <BookPlus />
            Save and Published
          </Button>
          <Button>
            <Save />
            {editId ? "Update" : "Save"}
          </Button>
        </div>
      </div>
      <hr className="my-3" />
      <div className="flex gap-4 mt-2">
        <div className="flex-grow  ">
          <div className="flex flex-col gap-4 2xl:max-w-[1400px] mx-auto">
            <div>
              <div className="mb-2">
                <input
                  type="text"
                  className="py-2   px-3 rounded-md focus-visible:outline-primary w-full"
                  placeholder="Product name"
                  value={product.productName || ""}
                  onChange={(e) => {
                    dispatch(
                      setProduct({ ...product, productName: e.target.value })
                    );
                  }}
                />
                {errors?.productName && (
                  <p className="text-red-500 text-sm">{errors?.productName}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  className="py-2 text-lg  px-3 rounded-md focus-visible:outline-primary w-full"
                  placeholder="Add title"
                  value={product.name || ""}
                  onChange={(e) => {
                    dispatch(setProduct({ ...product, name: e.target.value }));
                    const sl = generateSlug(e.target.value);
                    setSlug(sl);
                  }}
                />
                {errors?.name && (
                  <p className="text-red-500 text-sm">{errors?.name}</p>
                )}
              </div>
              <div className="flex gap-1 mt-3 items-center">
                <p>Permalink: </p>
                {!isOpenSlug ? (
                  <Link
                    target="_blank"
                    href={`${FRONTEND_URL}/product/${
                      product?.slug ? product?.slug : slug
                    }`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {FRONTEND_URL}/product/
                    {product?.slug ? product?.slug : slug}
                  </Link>
                ) : (
                  <div className="flex gap-1 items-center">
                    <span className="text-sm text-blue-600 hover:underline">
                      {FRONTEND_URL}/product/
                    </span>
                    <input
                      id="slug"
                      type="text"
                      value={product?.slug || ""}
                      onChange={(e) =>
                        dispatch(
                          setProduct({
                            ...product,
                            slug: generateSlug(e.target.value),
                          })
                        )
                      }
                      className="flex h-6 w-max rounded-md border border-input bg-transparent px-1 py-1 text-base shadow-sm transition-colors  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      placeholder="Slug"
                    />
                  </div>
                )}
                {isOpenSlug ? (
                  <span
                    onClick={() => setIsOpenSlug(false)}
                    className="py-[2px] text-white text-xs items-center gap-[2px] px-[6px] cursor-pointer inline-flex rounded border border-slate-400 bg-primary"
                  >
                    OK
                  </span>
                ) : (
                  <span
                    onClick={() => {
                      setIsOpenSlug(true);
                      dispatch(
                        setProduct({
                          ...product,
                          slug: slug,
                        })
                      );
                    }}
                    className="py-[2px] text-xs items-center gap-[2px] px-[6px] cursor-pointer inline-flex rounded border border-slate-400 bg-white"
                  >
                    <Pen size={10} /> Edit
                  </span>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="short-desc">
                Short Description for product view
              </Label>
              <Textarea
                id="short-desc"
                onChange={(e) => {
                  dispatch(
                    setProduct({ ...product, productShortDesc: e.target.value })
                  );
                }}
                value={product?.productShortDesc || ""}
                className="min-h-[60px] w-full"
                placeholder="Short overview of this product"
                maxLength={200}
              />
              <div>
                <p className="text-xs text-gray-600">
                  Maximum charecters limit 200
                </p>
              </div>
            </div>

            <div className="p-2 bg-white rounded-md">
              <RichTextEditor
                content={content || ""}
                onChange={(e) => setContent(e)}
              />
            </div>
            <ProductVarient />
            <div className=" bg-white rounded-md">
              <div className="flex items-center gap-2 border-b p-4 py-3">
                <p>SEO</p>
              </div>
              <div className="px-4 py-2 space-y-3">
                <div>
                  <label htmlFor="regularPrice">Meta Title</label>
                  <input
                    id="regularPrice"
                    type="text"
                    className="flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    placeholder="Regular Price"
                    value={product?.seo_title ?? ""}
                    onChange={(e) =>
                      dispatch(
                        setProduct({
                          ...product,
                          seo_title: e?.target?.value,
                        })
                      )
                    }
                  />
                </div>
                <div>
                  <label htmlFor="meta_desc">Meta Description</label>
                  <textarea
                    name=""
                    id="meta_desc"
                    rows={3}
                    className="flex  w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    placeholder="Meta description"
                    value={product?.seo_desc ?? ""}
                    onChange={(e) =>
                      dispatch(
                        setProduct({
                          ...product,
                          seo_desc: e?.target?.value,
                        })
                      )
                    }
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="">Meta Keyword</label>
                  <TagsInput
                    value={keywords}
                    onChange={setKeywords}
                    name="keywords"
                    placeHolder="Seo Keywords"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="w-[300px] flex flex-col gap-4 ">
            <div className=" g-white rounded border border-l-slate-100 bg-card text-card-foreground">
              <div className="py-2 px-4 border-b border-l-slate-200">
                <p className="text-base font-semibold">Shipping & Tax</p>
              </div>
              <div className="px-4  py-4 space-y-4">
                <div className="flex gap-3">
                  <Label
                    htmlFor="fshiopping-two"
                    className="text-nowrap cursor-pointer"
                  >
                    Free Shipping
                  </Label>
                  <RadioGroup
                    className="flex flex-col gap-2"
                    defaultValue={"yes"}
                    value={freeShipping}
                    onValueChange={(e: "no" | "yes") => {
                      setFreeShipping(e);
                      dispatch(
                        setProduct({
                          ...product,
                          shippingCharge: e === "no" ? 60 : 0,
                          freeShipping: e,
                        })
                      );
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="no"
                        // checked={product?.status === "Active"}
                        id="free-no"
                      />
                      <Label htmlFor="free-no" className="cursor-pointer">
                        No
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="yes"
                        // checked={product?.status === "Inactive"}
                        id="free-yes"
                      />
                      <Label htmlFor="free-yes" className="cursor-pointer">
                        Yes
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                {freeShipping === "no" && (
                  <div className="flex justify-between items-center">
                    <Label
                      htmlFor="scharge"
                      className="text-nowrap cursor-pointer"
                    >
                      Shipping Charge (৳)
                    </Label>
                    <input
                      id="scharge"
                      type="number"
                      className="flex h-8 w-[100px] rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      value={product?.shippingCharge || 60}
                      onChange={(e) => {
                        dispatch(
                          setProduct({
                            ...product,
                            shippingCharge: e?.target?.value
                              ? +e?.target?.value
                              : 60,
                          })
                        );
                      }}
                    />
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <Label htmlFor="tax" className="text-nowrap cursor-pointer">
                    Tax (৳)
                  </Label>
                  <input
                    id="tax"
                    type="number"
                    className="flex h-8 w-[100px] rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    placeholder="Tax"
                    value={product?.tax || ""}
                    onChange={(e) =>
                      dispatch(
                        setProduct({
                          ...product,
                          tax: e?.target?.value ? +e?.target?.value : 0,
                        })
                      )
                    }
                  />
                </div>

                <div className="flex justify-between items-center">
                  <Label
                    htmlFor="return-day"
                    className="text-nowrap cursor-pointer"
                  >
                    Return Day
                  </Label>
                  <input
                    id="return-day"
                    type="number"
                    className="flex h-8 w-[100px] rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    placeholder="Return Day"
                    value={product?.returnTime || 5}
                    onChange={(e) =>
                      dispatch(
                        setProduct({
                          ...product,
                          tax: e?.target?.value ? +e?.target?.value : 5,
                        })
                      )
                    }
                  />
                </div>
              </div>
            </div>

            <ManageCategory />
            <ManageBrand />
            <div className=" bg-white rounded border border-l-slate-100 bg-card text-card-foreground ">
              <div className="py-2 px-4 border-b border-l-slate-200">
                <p className="text-base font-semibold">Product Image</p>
              </div>
              <div className="px-4 py-4 space-y-4">
                <ThumbnailComponent />
                <div className="grid gap-2">
                  <label
                    htmlFor="thumbnail"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Image Gallary
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {gallarys?.length > 0 &&
                      gallarys?.map((file, i) => (
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
              </div>
            </div>
            <div className=" g-white rounded border border-l-slate-100 bg-card text-card-foreground">
              <div className="py-2 px-4 border-b border-l-slate-200">
                <p className="text-base font-semibold">Visibility</p>
              </div>
              <div className="px-4 py-4 space-y-4">
                <div>
                  <RadioGroup
                    className="flex flex-row gap-2"
                    defaultValue={"Active"}
                    value={product?.status}
                    onValueChange={(e: "Active" | "Inactive") =>
                      dispatch(
                        setProduct({
                          ...product,
                          status: e,
                        })
                      )
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="Active"
                        // checked={product?.status === "Active"}
                        id="option-one"
                      />
                      <Label htmlFor="option-one" className="cursor-pointer">
                        Published
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="Inactive"
                        // checked={product?.status === "Inactive"}
                        id="option-two"
                      />
                      <Label htmlFor="option-two" className="cursor-pointer">
                        Hidden
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <Label htmlFor="calender">Publish Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full h-9 justify-start text-left font-normal",
                          !product?.publish_date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {product?.publish_date ? (
                          format(product?.publish_date, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={product?.publish_date}
                        onSelect={(e) => {
                          // setDate(e);
                          dispatch(
                            setProduct({
                              ...product,
                              publish_date: e ? e : new Date(),
                            })
                          );
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
            <div className=" g-white rounded border border-l-slate-100 bg-card text-card-foreground">
              <div className="py-2 px-4 border-b border-l-slate-200">
                <p className="text-base font-semibold">Features</p>
              </div>
              <div className="px-4 py-4 space-y-4">
                <div>
                  <RadioGroup
                    className="flex flex-row gap-2"
                    defaultValue={"Inactive"}
                    value={product?.isFeature}
                    onValueChange={(e: "Active" | "Inactive") =>
                      dispatch(
                        setProduct({
                          ...product,
                          isFeature: e,
                        })
                      )
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="Active"
                        // checked={product?.status === "Active"}
                        id="feature-active"
                      />
                      <Label
                        htmlFor="feature-active"
                        className="cursor-pointer"
                      >
                        Feature
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="Inactive"
                        // checked={product?.status === "Inactive"}
                        id="feature-inActive"
                      />
                      <Label
                        htmlFor="feature-inActive"
                        className="cursor-pointer"
                      >
                        No Feature
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
