"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setProduct } from "@/redux/features/productSlice";
import React, { useState } from "react";
import { format, compareAsc } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

const GeneralComponent = () => {
  // Redux state
  const { product, errors } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  // Local State
  const [isDiscount, setIsDiscount] = useState<boolean>(false);
  const [isOfferDateShow, setIsOfferDateShow] = useState<boolean>(false);

  return (
    <div className="p-4 flex flex-col gap-3">
      <div className="flex items-center">
        <div className="w-[150px]">
          <label
            htmlFor="regularPrice"
            className="text-sm text-muted-foreground"
          >
            Regular Price (৳){" "}
          </label>
        </div>
        <div>
          <div className="relative">
            <span className="absolute left-0 h-9 top-0 rounded-l w-8 bottom-0 bg-black/10 flex items-center justify-center">
              $
            </span>
            <Input
              id="regularPrice"
              type="number"
              min={0}
              className=" pr-3 pl-10 h-9 "
              // placeholder="Regular Price"
              value={product?.price?.productPrice ?? ""}
              onChange={(e) => {
                dispatch(
                  setProduct({
                    ...product,
                    price: {
                      ...product?.price,
                      productPrice: parseFloat(e.target.value) || 0,
                    },
                  })
                );
              }}
            />
          </div>
          {errors.productPrice && (
            <p className="text-red-500 text-sm">{errors.productPrice}</p>
          )}
        </div>
      </div>

      <div className="flex items-center">
        <div className="w-[150px]">
          <label
            htmlFor="discount-mode"
            className="text-sm text-muted-foreground"
          >
            If you want to add discount
          </label>
        </div>
        <div>
          <div className="relative">
            <Switch
              checked={isDiscount}
              onCheckedChange={(e) => {
                setIsDiscount(e);
                if (!e) {
                  dispatch(
                    setProduct({
                      ...product,
                      price: {
                        ...product?.price,
                        discountValue: 0,
                      },
                    })
                  );
                }
              }}
              id="discount-mode"
            />
          </div>
        </div>
      </div>
      {isDiscount && (
        <>
          <div className="flex items-center">
            <div className="w-[150px]">
              <label
                htmlFor="discount-mode"
                className="text-sm text-muted-foreground"
              >
                Discount type
              </label>
            </div>
            <div className="">
              <div className="relative">
                <Select
                  value={product?.price?.discountType}
                  onValueChange={(e: "fixed" | "percent") => {
                    dispatch(
                      setProduct({
                        ...product,
                        price: {
                          ...product?.price,
                          discountType: e,
                        },
                      })
                    );
                  }}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="fixed">Fixed</SelectItem>
                      <SelectItem value="percent">Percent</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-[150px]">
              <label
                htmlFor="sale_price"
                className="text-sm text-muted-foreground"
              >
                Discofunt Value
              </label>
            </div>
            <div className="flex gap-2 items-center">
              <div>
                <div className="relative">
                  <span className="absolute left-0 h-9 top-0 rounded-l w-8 bottom-0 bg-black/10 flex items-center justify-center">
                    {product?.price?.discountType == "fixed" ? "$" : "%"}
                  </span>
                  <Input
                    id="sale_price"
                    type="number"
                    min={0}
                    className=" h-9 pl-10 "
                    // placeholder="Sale Price"
                    value={product?.price?.discountValue ?? ""}
                    onChange={(e) =>
                      dispatch(
                        setProduct({
                          ...product,
                          price: {
                            ...product?.price,
                            discountValue: parseFloat(e.target.value) || 0,
                          },
                        })
                      )
                    }
                  />
                </div>
              </div>
              {!isOfferDateShow && (
                <span
                  onClick={() => setIsOfferDateShow(!isOfferDateShow)}
                  className="text-primary underline cursor-pointer text-sm"
                >
                  Schedule
                </span>
              )}
            </div>
          </div>
          {isOfferDateShow && (
            <>
              <div className="flex items-center">
                <div className="w-[150px]">
                  <label
                    htmlFor="sale_price"
                    className="text-sm text-muted-foreground"
                  >
                    Start Date
                  </label>
                </div>
                <div className="flex gap-2 items-center">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full min-w-[200px] h-9 justify-start text-left font-normal",
                          !product?.offerDate?.start_date &&
                            "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {product?.offerDate?.start_date ? (
                          format(product?.offerDate?.start_date, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={product?.offerDate?.start_date}
                        onSelect={(e) => {
                          dispatch(
                            setProduct({
                              ...product,
                              offerDate: {
                                ...product?.offerDate,
                                start_date: e || undefined,
                                offerPrice: product?.offerDate?.offerPrice ?? 0,
                              },
                            })
                          );
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <span
                    onClick={() => {
                      dispatch(
                        setProduct({
                          ...product,
                          offerDate: {
                            ...product?.offerDate,
                            start_date: undefined,
                            end_date: undefined,
                            offerPrice: product?.offerDate?.offerPrice ?? 0,
                          },
                        })
                      );
                      setIsOfferDateShow(false);
                    }}
                    className="text-primary underline cursor-pointer text-sm"
                  >
                    Cancel
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-[150px]">
                  <label
                    htmlFor="sale_price"
                    className="text-sm text-muted-foreground"
                  >
                    End Date
                  </label>
                </div>
                <div className="flex gap-2 items-center">
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full min-w-[200px] h-9 justify-start text-left font-normal",
                            !product?.offerDate?.end_date &&
                              "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {product?.offerDate?.end_date ? (
                            format(product?.offerDate?.end_date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={product?.offerDate?.end_date}
                          onSelect={(e) => {
                            dispatch(
                              setProduct({
                                ...product,
                                offerDate: {
                                  ...product?.offerDate,
                                  end_date: e || undefined,
                                  offerPrice:
                                    product?.offerDate?.offerPrice ?? 0,
                                },
                              })
                            );
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {product?.offerDate?.start_date &&
                      product?.offerDate?.end_date &&
                      compareAsc(
                        product?.offerDate?.start_date,
                        product?.offerDate?.end_date
                      ) === 1 && (
                        <p className="text-red-500 text-xs">
                          End Date must be greater than Start Date
                        </p>
                      )}
                  </div>
                  {product?.offerDate?.end_date && (
                    <span
                      onClick={() =>
                        dispatch(
                          setProduct({
                            ...product,
                            offerDate: {
                              ...product?.offerDate,
                              end_date: undefined,
                              offerPrice: product?.offerDate?.offerPrice ?? 0,
                            },
                          })
                        )
                      }
                      className="text-primary underline cursor-pointer text-sm"
                    >
                      Cancel
                    </span>
                  )}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default GeneralComponent;
