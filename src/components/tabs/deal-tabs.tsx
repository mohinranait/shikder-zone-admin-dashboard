import React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppSelector } from "@/hooks/useRedux";
import Image from "next/image";

const DealTabs = () => {
  const { categories } = useAppSelector((state) => state.category);
  const { products } = useAppSelector((state) => state.product);

  return (
    <Command>
      <CommandInput placeholder="Type product name..." />
      <CommandList className="max-h-[150px]">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestion products">
          {products?.map((product, index) => (
            <CommandItem key={index}>
              <Image
                src={product?.featureImage?.image}
                width={40}
                height={40}
                alt="products"
                className="w-6 h-6"
              />{" "}
              {product?.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default DealTabs;
