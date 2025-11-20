import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setProduct } from "@/redux/features/productSlice";
import { Pointer } from "lucide-react";
import React from "react";

const InventoryComponent = () => {
  const { product } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  function generateSimpleSKU() {
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    dispatch(
      setProduct({
        ...product,
        skuCode: `SKU-${randomNumber}`,
      })
    );
  }

  return (
    <div className="p-4 flex flex-col gap-3">
      <div className="flex items-center">
        <div className="w-[150px]">
          <label htmlFor="sku" className="text-sm text-muted-foreground">
            SKU
          </label>
        </div>
        <div className="flex gap-2">
          <Input
            id="sku"
            type="text"
            className="h-9"
            placeholder="Unique code"
            value={product?.skuCode ?? ""}
            onChange={(e) =>
              dispatch(
                setProduct({
                  ...product,
                  skuCode: e.target.value,
                })
              )
            }
          />
          <Button onClick={generateSimpleSKU} className="size-9" type="button">
            <Pointer />
          </Button>
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-[150px]">
          <label
            htmlFor="stock_label"
            className="text-sm text-muted-foreground"
          >
            Manage Stock ?
          </label>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={product?.manageStock ? true : false}
              onCheckedChange={(e) => {
                dispatch(
                  setProduct({ ...product, manageStock: e ? true : false })
                );
              }}
              id="stock_label"
            />
            <label
              htmlFor="stock_label"
              className="text-sm font-medium text-slate-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Enable product management and stock label
            </label>
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <div className="w-[150px]">
          <label
            htmlFor="stock_quantity"
            className="text-sm text-muted-foreground"
          >
            Stock Quantity
          </label>
        </div>
        <div>
          <Input
            id="stock_quantity"
            type="number"
            className=" "
            placeholder="Stock quantity"
            value={product?.isStock ?? ""}
            onChange={(e) =>
              dispatch(
                setProduct({
                  ...product,
                  isStock: Number(e.target.value),
                })
              )
            }
          />
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-[150px]">
          <label
            htmlFor="min_stock"
            className="text-sm leading-3 text-muted-foreground"
          >
            Minimum Stock Quantity
          </label>
        </div>
        <div>
          <Input
            id="min_stock"
            type="number"
            className=""
            placeholder="Min stock for warning"
            value={product?.minStock ?? ""}
            onChange={(e) =>
              dispatch(
                setProduct({
                  ...product,
                  minStock: Number(e.target.value),
                })
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default InventoryComponent;
