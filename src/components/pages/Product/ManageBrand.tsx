import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TBrandType } from "@/types/brand.type";
import BrandForm from "@/components/forms/BrandForm";
import { setProduct } from "@/redux/features/productSlice";

const ManageBrand = () => {
  // Redux state
  const { brands } = useAppSelector((state) => state.brand);
  const { product } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  // Local State
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [showBrands, setShowBrands] = useState<TBrandType[]>([]);

  const handleChangeMethod = (key: string, value: string) => {
    const copyBrand = { ...product };
    const brandIds = copyBrand?.brand || [];
    const updateProduct = { ...copyBrand };

    if (!brandIds?.includes(value)) {
      // Add  New ID in Brand array
      updateProduct.brand = [...brandIds, value];
    } else {
      // Remove duplicate brand ID
      updateProduct.brand = brandIds?.filter((d) => d !== value);
    }
    dispatch(setProduct(updateProduct));
  };

  useEffect(() => {
    setShowBrands(brands);
  }, [brands]);

  console.log({ da: product?.brand });

  return (
    <React.Fragment>
      <div className=" bg-white rounded border border-l-slate-100 bg-card text-card-foreground ">
        <div className="py-2 px-4 border-b border-l-slate-200">
          <p className="text-base font-semibold">Brands</p>
        </div>
        <div className="px-4 py-2 space-y-4">
          <div className="max-h-[140px] overflow-y-auto  ">
            {showBrands?.length === 0 && (
              <div
                onClick={() => setOpenForm(!openForm)}
                className="py-4 cursor-pointer flex justify-center gap-1 items-center px-4 border border-slate-200 border-dashed"
              >
                <Plus /> Create New Brand
              </div>
            )}
            {showBrands?.length > 0 && (
              <ul className="space-y-2 border p-3 border-slate-200  ">
                {showBrands?.map((brand, index) => (
                  <li key={index} className={`flex  items-center space-x-2`}>
                    <Checkbox
                      value={brand?._id}
                      checked={
                        product?.brand?.includes(brand?._id || "")
                          ? true
                          : false
                      }
                      onCheckedChange={() =>
                        handleChangeMethod("brand", brand?._id as string)
                      }
                      id={`brand_${index}`}
                    />
                    <label
                      htmlFor={`brand_${index}`}
                      className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {brand.name}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="px-4 py-2 border-t border-slate-100">
          <Button
            type="button"
            variant={"secondary"}
            className="px-3 h-[30px] hover:underline rounded-xl flex "
            onClick={() => setOpenForm(!openForm)}
          >
            <Plus />
            Add Brand
          </Button>
        </div>
      </div>

      <Dialog onOpenChange={setOpenForm} open={openForm}>
        <DialogContent className="w-[350px]">
          <DialogHeader>
            <DialogTitle>Create new Brand </DialogTitle>
            <DialogDescription>You want to create a brand</DialogDescription>
          </DialogHeader>
          <DialogDescription>
            <BrandForm closeModal={setOpenForm} />
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default ManageBrand;
