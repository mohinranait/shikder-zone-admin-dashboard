import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setProduct } from "@/redux/features/productSlice";
import React from "react";

const ShippingComponent = () => {
  const { product } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  return (
    <div className="p-4 flex flex-col gap-3">
      <div className="flex items-center">
        <div>
          <div className="w-[150px]">
            <label htmlFor="weight" className="text-sm text-muted-foreground">
              Weight (g)
            </label>
          </div>
        </div>
        <div className="w-full">
          <Input
            id="weight"
            type="text"
            className="w-full"
            placeholder="Weight"
            value={product?.shipping?.weight ?? ""}
            onChange={(e) =>
              dispatch(
                setProduct({
                  ...product,
                  shipping: {
                    ...product?.shipping,
                    weight: e.target.value,
                  },
                })
              )
            }
          />
        </div>
      </div>
      <div className="flex items-center">
        <div>
          <div className="w-[150px]">
            <label
              htmlFor="stock_label"
              className="text-sm text-muted-foreground"
            >
              Dimentions (cm)
            </label>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex items-center space-x-2">
            <Input
              id="length"
              name="length"
              type="number"
              className=""
              placeholder="Length"
              value={product?.shipping?.length ?? ""}
              onChange={(e) =>
                dispatch(
                  setProduct({
                    ...product,
                    shipping: {
                      ...product?.shipping,
                      length: e.target.value,
                    },
                  })
                )
              }
            />
            <Input
              id="width"
              type="number"
              name="width"
              className=""
              placeholder="Width"
              value={product?.shipping?.width ?? ""}
              onChange={(e) =>
                dispatch(
                  setProduct({
                    ...product,
                    shipping: {
                      ...product?.shipping,
                      width: e.target.value,
                    },
                  })
                )
              }
            />
            <Input
              id="height"
              type="number"
              name="height"
              className=""
              placeholder="Height"
              value={product?.shipping?.height ?? ""}
              onChange={(e) =>
                dispatch(
                  setProduct({
                    ...product,
                    shipping: {
                      ...product?.shipping,
                      height: e.target.value,
                    },
                  })
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingComponent;
