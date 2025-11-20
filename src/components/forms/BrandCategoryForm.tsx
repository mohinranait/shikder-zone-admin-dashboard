import React, { useEffect, useState } from "react";
import GlobalModal from "../modals/global-modal";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { Checkbox } from "../ui/checkbox";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { updateBrand } from "@/actions/brandApi";
import { addBrand, setSelectedBrand } from "@/redux/features/brandSlice";

type Props = {
  open: boolean;
  onClose: () => void;
};

const BrandCategoryForm = ({ open, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.category);
  const { selectedBrand } = useAppSelector((state) => state.brand);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const handleSubmit = async () => {
    if (!selectedBrand?._id) return;
    try {
      const data = await updateBrand(selectedBrand?._id, {
        ...selectedBrand,
        categoryIds: selectedCategoryIds,
      });

      if (data?.success) {
        onClose();
        dispatch(setSelectedBrand(null));
        setSelectedCategoryIds([]);
        dispatch(addBrand({ data: data?.payload, type: "Update" }));
      }
    } catch (error) {}
  };

  // handle config categories
  const handleConfigCategory = (categoryId: string) => {
    if (!categoryId) return;
    const list = selectedCategoryIds ?? [];

    if (list.includes(categoryId)) {
      setSelectedCategoryIds(list.filter((p) => p !== categoryId));
    } else {
      setSelectedCategoryIds([...list, categoryId]);
    }
  };

  useEffect(() => {
    if (selectedBrand?._id) {
      setSelectedCategoryIds(selectedBrand?.categoryIds);
    }
  }, [selectedBrand]);

  return (
    <GlobalModal
      modalTile="Configure category on the brand"
      open={open}
      onClose={() => {
        onClose();
        setSelectedCategoryIds([]);
        dispatch(setSelectedBrand(null));
      }}
      footers={
        <div className="flex items-center  pt-0">
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50  bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full"
          >
            Save Configuration
          </button>
        </div>
      }
    >
      <div className="space-y-3">
        <div className="flex gap-2 ">
          <div>
            <div className="w-16">
              <Image
                src={selectedBrand?.brandThumbnail || "/images/image.png"}
                width={100}
                height={100}
                alt="Image"
                className="w-12 h-12 rounded"
              />
            </div>
          </div>
          <div>
            <p className="font-semibold text-black">{selectedBrand?.name}</p>
            <ul className="flex gap-1 flex-wrap mt-1 max-h-[200px] overflow-y-auto">
              {selectedCategoryIds?.map((catId, i) => (
                <Badge
                  variant={"outline"}
                  key={i}
                  className="py-0.5 font-normal text-xs inline-flex items-center gap-1 px-1 rounded-md border"
                >
                  {categories?.find((cat) => cat?._id === catId)?.name}
                </Badge>
              ))}
            </ul>
          </div>
        </div>
        <ul className="flex gap-1 flex-wrap max-h-[200px] overflow-y-auto">
          {categories?.map((cat, i) => (
            <li
              key={i}
              className="py-1 inline-flex items-center gap-1 px-2 rounded-md border"
            >
              {cat?.name}{" "}
              <Checkbox
                checked={selectedCategoryIds?.includes(cat?._id as string)}
                onCheckedChange={() => handleConfigCategory(cat?._id as string)}
              />
            </li>
          ))}
        </ul>
      </div>
    </GlobalModal>
  );
};

export default BrandCategoryForm;
