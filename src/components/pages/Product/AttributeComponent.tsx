import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Accordion } from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useRedux";
import { TAttributeType } from "@/types/attribute.type";
import AttributeLine from "./AttributeLine";

const AttributeComponent = () => {
  // Redux state
  const { attributes } = useAppSelector((state) => state.attribute);
  const { product } = useAppSelector((state) => state.product);

  // Local state
  const [selectAttribute, setSelectAttribute] = useState<string>("");
  const [selectedAttributes, setSelectedAttributes] = useState<
    TAttributeType[]
  >([]);

  const handleSelectAttribute = () => {
    const find = attributes?.find((attr) => attr?._id === selectAttribute);
    if (find) {
      setSelectedAttributes((prev) => [...prev, find]);
      setSelectAttribute("");
    }
  };

  useEffect(() => {
    const configs = [...(product?.attributes || [])];

    const attr = attributes?.filter((attr) =>
      configs?.map((d) => d?.attribute)?.includes(attr?._id)
    );

    if (attr?.length > 0) {
      setSelectedAttributes(attr);
    }
  }, [product]);

  const availableAttributes = [...attributes]?.filter((attribute) => {
    return !selectedAttributes?.some(
      (selected) => selected?._id === attribute?._id
    );
  });

  return (
    <div className="p-4 flex  flex-col gap-3">
      <div className="flex gap-2">
        <Select
          value={selectAttribute}
          onValueChange={(e) => setSelectAttribute(e)}
        >
          <SelectTrigger className="w-[200px] h-8">
            <SelectValue placeholder="Product Attribute" />
          </SelectTrigger>
          <SelectContent>
            {availableAttributes?.map((attr, index) => (
              <SelectItem
                key={index}
                value={`${attr?._id}`}
                className="cursor-pointer"
              >
                {attr?.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          type="button"
          onClick={handleSelectAttribute}
          className="h-8 px-3"
        >
          Add
        </Button>
      </div>
      <Accordion
        type="single"
        className="w-full flex flex-col gap-3"
        collapsible
      >
        {selectedAttributes?.map((attribute, index) => (
          <AttributeLine
            key={index}
            attribute={attribute}
            onDelete={(id: string) => {
              setSelectedAttributes((prev) =>
                prev.filter((atr) => atr._id !== id)
              );
            }}
          />
        ))}
      </Accordion>
    </div>
  );
};

export default AttributeComponent;
