import { Button } from "@/components/ui/button";
import { TSection } from "@/types/section.type";
import { Check, ChevronsUpDown, Edit, Pen, Plus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { getAllProducts } from "@/actions/productApi";

import { TProduct } from "@/types/product.type";
import Image from "next/image";
import { getAllSections, updateSection } from "@/actions/sectionApi";

type Props = {
  section: TSection;
  setSections: React.Dispatch<React.SetStateAction<TSection[]>>;
  selectedSection: (section: TSection) => void;
  openModal: () => void;
};
const SingleRow = ({
  section,
  setSections,
  selectedSection,
  openModal,
}: Props) => {
  const [open, setOpen] = React.useState(false);
  const [selectProduct, setSelectProduct] = React.useState("");
  const [searchProducts, setSearchProducts] = useState<TProduct[]>();

  const [searching, setSearching] = useState<string>("");

  useEffect(() => {
    if (searching.length < 1) {
      return;
    }

    const fetchingTimeout = setTimeout(async () => {
      const getProducts = await getAllProducts(`search=${searching}`);
      console.log({ getProducts });

      if (getProducts?.success) {
        setSearchProducts(getProducts?.payload?.products || []);
      }
    }, 600);

    return () => clearTimeout(fetchingTimeout);
  }, [searching]);

  const handleAddProduct = async (currentValue: string) => {
    setSelectProduct(currentValue === selectProduct ? "" : currentValue);
    setOpen(false);

    if (!section?._id) {
      return;
    }
    try {
      const data = {
        ...section,
        products: [...section.products, currentValue],
      };
      const response = await updateSection(section?._id, data);
      setSelectProduct("");
      if (response?.success) {
        const response = await getAllSections();
        if (response?.success) {
          setSections(response.payload?.sections || []);
        }
      }
    } catch (error) {}
  };

  const products = section.products as unknown as TProduct[];

  // handle remove product
  const handleRemoveProdduct = async (productId: string) => {
    if (!section?._id) {
      return;
    }
    const filteredProducts = products
      .filter((prodId) => prodId?._id !== productId)
      ?.map((prod) => prod._id as string);
    const data = {
      ...section,
      products: filteredProducts,
    };
    try {
      const response = await updateSection(section?._id, data);
      setSelectProduct("");
      if (response?.success) {
        const response = await getAllSections();
        if (response?.success) {
          setSections(response.payload?.sections || []);
        }
      }
    } catch (error) {}
  };

  return (
    <div className="border bg-white p-3 rounded">
      <div className="flex items-center justify-between">
        <p className="font-medium text-lg">{section.name}</p>
        <div className="flex gap-3">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {selectProduct
                  ? searchProducts?.find(
                      (framework) => framework._id === selectProduct
                    )?.name
                  : "Add product..."}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command key={searchProducts?.length}>
                <CommandInput
                  onValueChange={setSearching}
                  placeholder="Search product..."
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No product found.</CommandEmpty>
                  <CommandGroup>
                    {searchProducts?.map((product) => (
                      <CommandItem
                        key={product._id}
                        value={product._id}
                        onSelect={(currentValue) => {
                          handleAddProduct(currentValue);
                        }}
                      >
                        <Image
                          src={product?.featureImage?.image}
                          width={20}
                          height={20}
                          alt="Product"
                        />
                        {product.name}
                        <Check
                          className={cn(
                            "ml-auto",
                            selectProduct === product._id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Button
            type="button"
            onClick={() => {
              selectedSection(section);
              openModal();
            }}
            size="sm"
          >
            {" "}
            <Edit /> Update Section
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4 mt-4">
        {products?.map((prod, index) => {
          return (
            <div key={index}>
              <div className="relative">
                <Button
                  type="button"
                  size="icon"
                  className="absolute size-5 rounded-full top-0 left-0 z-10"
                  onClick={() => handleRemoveProdduct(prod?._id as string)}
                >
                  <X />
                </Button>
                <Image
                  src={prod?.featureImage?.image}
                  width={200}
                  height={200}
                  alt="Products"
                  className="max-h-32"
                />
              </div>
              <p className="text-sm line-clamp-1">{prod?.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SingleRow;
