"use client";

import { useEffect, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import type { TAttributeType } from "@/types/attribute.type";
import { UploadIcon, RefreshCw, Trash, Trash2 } from "lucide-react";
import type { TAttributeConfigType } from "@/types/attributeConfig.type";
import { setProduct } from "@/redux/features/productSlice";
import type { TProduct, TVariation } from "@/types/product.type";
import SelectImageFromModal from "@/components/shared/SelectImageFromModal";
import type { TMediaType } from "@/types/media.type";
import {
  addUnicName,
  addVariant,
  setIsModal,
} from "@/redux/features/mediaSlice";
import { Input } from "@/components/ui/input";

const AttributeComponent = () => {
  // Redux state
  const dispatch = useAppDispatch();
  const imgUnicName = useAppSelector((state) => state.media.imgUnicName);
  const { attributes } = useAppSelector((state) => state.attribute);
  const { attributeConfigs } = useAppSelector((state) => state.attributeConfig);
  const { product } = useAppSelector((state) => state.product);

  // Local state
  const [existsAttributes, setExistsAttributes] = useState<TAttributeType[]>(
    []
  );
  const [existsConfigs, setExistsConfigs] = useState<TAttributeConfigType[]>(
    []
  );
  const [files, setFiles] = useState<TMediaType | null>(null);
  const [varIndex, setVarIndex] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Calculate all possible variations using Cartesian product
  const calculateAllVariations = (): TVariation[] => {
    if (!existsAttributes.length || !existsConfigs.length) return [];

    // Group configs by attribute
    const attributeGroups: { [key: string]: TAttributeConfigType[] } = {};
    existsAttributes.forEach((attr, index) => {
      attributeGroups[index] = existsConfigs.filter(
        (config) => config?.attribute === attr?._id
      );
    });

    // Generate Cartesian product
    const generateCombinations = (
      groups: TAttributeConfigType[][]
    ): TAttributeConfigType[][] => {
      if (groups.length === 0) return [[]];
      if (groups.length === 1) return groups[0].map((item) => [item]);

      const result: TAttributeConfigType[][] = [];
      const firstGroup = groups[0];
      const restCombinations = generateCombinations(groups.slice(1));

      firstGroup.forEach((item) => {
        restCombinations.forEach((combination) => {
          result.push([item, ...combination]);
        });
      });

      return result;
    };

    const groupsArray = Object.values(attributeGroups);
    const combinations = generateCombinations(groupsArray);

    // Convert combinations to variations
    const variations: TVariation[] = combinations.map((combination, index) => {
      const variantId = `VAR-${Date.now()}${index}`.slice(-6);

      // Create attribute configs for this variation
      const attributeConfigs = combination.map((config, attrIndex) => ({
        attrIndex,
        value: config._id as string,
      }));

      // Generate SKU based on combination
      const skuParts = combination.map(
        (config) => config.name?.toUpperCase().slice(0, 3) || "XXX"
      );
      const generatedSku = `${
        product?.name?.toUpperCase().slice(0, 3) || "PRD"
      }-${skuParts.join("-")}`;

      return {
        variantId,
        attributes: existsAttributes
          .map((attr) => attr._id)
          .filter(Boolean) as string[],
        attributeConfigs,
        offerPirce: 0,
        productPrice: 0,
        description: `Variation: ${combination.map((c) => c.name).join(", ")}`,
        image: "",
        sku: generatedSku,
        shipping: {
          weight: 0,
          length: 0,
          width: 0,
          height: 0,
        },
      };
    });

    return variations;
  };

  // Auto-generate variations when attributes change
  const handleAutoGenerateVariations = () => {
    setIsGenerating(true);

    setTimeout(() => {
      const newVariations = calculateAllVariations();
      const singleProduct: TProduct = { ...product };

      dispatch(
        setProduct({
          ...singleProduct,
          variations: newVariations,
        })
      );

      setIsGenerating(false);
    }, 500);
  };

  // Manual add single variation (keeping original functionality)
  const handleAddVariation = (type: "default" | "custom" = "default") => {
    const singleProduct: TProduct = { ...product };
    const variantId = new Date().getTime().toString().slice(-2);

    if (type === "default") {
      const attrIds: string[] =
        singleProduct?.attributes
          ?.map((attr) => attr?.attribute)
          .filter((attr): attr is string => !!attr) ?? [];

      dispatch(
        setProduct({
          ...singleProduct,
          variations: [
            ...(singleProduct.variations || []),
            {
              variantId: variantId.toString(),
              attributes: attrIds,
              attributeConfigs: [],
              offerPirce: 0,
              productPrice: 0,
              description: "",
              image: "",
              sku: "",
              shipping: {
                weight: 0,
                length: 0,
                width: 0,
                height: 0,
              },
            },
          ],
        })
      );
    }
  };

  // Clear all variations
  const handleClearVariations = () => {
    const singleProduct: TProduct = { ...product };
    dispatch(
      setProduct({
        ...singleProduct,
        variations: [],
      })
    );
  };

  useEffect(() => {
    const configsIds: string[] = [];
    const prodAttributes = [...(product?.attributes || [])];
    const existsAttributes = attributes?.filter((attr) =>
      prodAttributes?.map((pAttr) => pAttr?.attribute).includes(attr?._id)
    );

    prodAttributes?.forEach((item) => {
      item.attributeConfig?.forEach((d) => configsIds.push(d));
    });

    const existsAttributess = attributeConfigs?.filter(
      (attr) => attr?._id && configsIds?.includes(attr?._id)
    );

    setExistsAttributes(existsAttributes);
    setExistsConfigs(existsAttributess);
  }, [product, attributes, attributeConfigs]);

  // Auto-generate variations when attributes or configs change
  useEffect(() => {
    if (existsAttributes.length > 0 && existsConfigs.length > 0) {
      // Only auto-generate if no variations exist
      if (!product?.variations?.length) {
        handleAutoGenerateVariations();
      }
    }
  }, [existsAttributes, existsConfigs]);

  // handle remove variation
  const handleRemoveVariation = (index: number) => {
    const singleProduct = { ...product };
    const variations = [...singleProduct?.variations];
    variations.splice(index, 1);

    dispatch(
      setProduct({
        ...singleProduct,
        variations: [...variations],
      })
    );
  };

  // handle update variant
  const handleUpdateVariant = (
    value: string | number,
    index: number,
    parentKey: keyof TVariation | "shipping",
    childKey?: keyof TVariation["shipping"]
  ) => {
    const singleProduct = { ...product };
    const variations = [...singleProduct.variations];

    if (parentKey === "shipping" && childKey) {
      variations[index] = {
        ...variations[index],
        shipping: {
          ...variations[index].shipping,
          [childKey]: Number(value),
        },
      };
    } else {
      variations[index] = {
        ...variations[index],
        [parentKey]: value,
      };
    }

    dispatch(
      setProduct({
        ...singleProduct,
        variations,
      })
    );
  };

  // update image
  const handleUpdateImage = (url: string, index: number) => {
    const singleProduct = { ...product };
    const variations = [...singleProduct.variations];
    variations[index] = {
      ...variations[index],
      image: url,
    };

    dispatch(
      setProduct({
        ...product,
        variations,
      })
    );
  };

  useEffect(() => {
    if (files && varIndex !== null) {
      handleUpdateImage(files.fileUrl, varIndex);
    } else {
      setFiles(null);
      setVarIndex(null);
    }
  }, [files]);

  // Get variation display name
  const getVariationDisplayName = (variant: TVariation) => {
    const configNames = variant.attributeConfigs
      .map((config) => {
        const foundConfig = existsConfigs.find((c) => c._id === config.value);
        return foundConfig?.name || "Unknown";
      })
      .join(" + ");

    return configNames || `Variant #${variant.variantId}`;
  };

  return (
    <div className="p-4 flex flex-col gap-3">
      {/* Control Buttons */}
      <div className="flex gap-2 items-center">
        <Button
          type="button"
          disabled={existsAttributes?.length === 0 || isGenerating}
          onClick={handleAutoGenerateVariations}
          className="h-8 px-3"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            "Auto Generate All"
          )}
        </Button>

        <Button
          type="button"
          variant="outline"
          disabled={existsAttributes?.length === 0}
          onClick={() => handleAddVariation("default")}
          className="h-8 px-3"
        >
          Add Manual
        </Button>

        <Button
          type="button"
          variant="destructive"
          disabled={!product?.variations?.length}
          onClick={handleClearVariations}
          className="h-8 px-3"
        >
          Clear All
        </Button>
      </div>

      {/* Info Messages */}
      {existsAttributes?.length === 0 && (
        <div className="p-3 rounded bg-red-100 text-red-500">
          Please select at least one attribute before adding product variations.
        </div>
      )}

      {existsAttributes?.length > 0 && existsConfigs?.length > 0 && (
        <div className="p-3 rounded bg-blue-100 text-blue-600">
          <div className="font-medium">Available Combinations:</div>
          <div className="text-sm mt-1">
            {existsAttributes
              .map((attr) => {
                const configs = existsConfigs.filter(
                  (c) => c.attribute === attr._id
                );
                return `${attr.name}: ${configs.map((c) => c.name).join(", ")}`;
              })
              .join(" | ")}
          </div>
          <div className="text-sm font-medium mt-1">
            Total Possible Variations: {calculateAllVariations().length}
          </div>
        </div>
      )}

      {/* Variations List */}
      <Accordion
        type="single"
        className="w-full flex flex-col gap-3"
        collapsible
      >
        {product?.variations?.length > 0 &&
          product?.variations?.map((variant, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-slate-100 overflow-auto px-3 border-b-0"
            >
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center justify-between w-full pr-6">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">#{variant?.variantId}</span>
                    <span className="text-sm text-gray-600">
                      ({getVariationDisplayName(variant)})
                    </span>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveVariation(i);
                      }}
                      className="text-red-600 text-sm hover:text-red-800"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="py-3 w-full gap-5 min-h-[200px]">
                <div className="w-full">
                  <div className="space-y-3 px-1">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-3">
                        <SelectImageFromModal
                          singleFile={(e) => {
                            if (imgUnicName === "productVarImg") {
                              setFiles(e);
                            }
                          }}
                        >
                          <div
                            onClick={() => {
                              dispatch(setIsModal(true));
                              dispatch(addVariant("Single"));
                              dispatch(addUnicName("productVarImg"));
                              setVarIndex(i);
                            }}
                            style={{
                              backgroundImage: `url('${variant?.image}')`,
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                            }}
                            className="flex items-center justify-center w-[50px] h-[50px] border border-slate-300 cursor-pointer border-dashed rounded"
                          >
                            <UploadIcon />
                          </div>
                        </SelectImageFromModal>
                        <div className="flex items-center justify-center w-[50px] h-[50px] border border-dashed rounded">
                          <UploadIcon />
                        </div>
                      </div>
                      <div className="w-full">
                        <label htmlFor="" className="text-sm text-gray-600">
                          SKU (unique)
                        </label>
                        <Input
                          id="SKU"
                          type="text"
                          min={0}
                          className="h-8"
                          value={variant?.sku}
                          onChange={(e) =>
                            handleUpdateVariant(e.target.value, i, "sku")
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="" className="text-sm text-gray-600">
                          Regular Price
                        </label>
                        <Input
                          id="productPrice"
                          type="text"
                          min={0}
                          className="h-8"
                          value={variant?.productPrice}
                          onChange={(e) =>
                            handleUpdateVariant(
                              Number(e.target.value),
                              i,
                              "productPrice"
                            )
                          }
                        />
                      </div>
                      <div>
                        <label htmlFor="" className="text-sm text-gray-600">
                          Offer Price
                        </label>
                        <Input
                          id="offerPrice"
                          type="text"
                          min={0}
                          className="h-8"
                          value={variant?.offerPirce}
                          onChange={(e) =>
                            handleUpdateVariant(
                              Number(e.target.value),
                              i,
                              "offerPirce"
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="" className="text-sm text-gray-600">
                          Weight (g)
                        </label>
                        <Input
                          id="weight"
                          type="number"
                          min={0}
                          className="h-8"
                          value={variant?.shipping?.weight}
                          onChange={(e) =>
                            handleUpdateVariant(
                              e.target.value,
                              i,
                              "shipping",
                              "weight"
                            )
                          }
                        />
                      </div>
                      <div className="">
                        <div>
                          <label htmlFor="" className="text-sm text-gray-600">
                            Dimensions (L,W,H) (cm)
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            <Input
                              id="length"
                              type="number"
                              min={0}
                              placeholder="Length"
                              className="h-8"
                              value={variant?.shipping?.length}
                              onChange={(e) =>
                                handleUpdateVariant(
                                  e.target.value,
                                  i,
                                  "shipping",
                                  "length"
                                )
                              }
                            />
                            <Input
                              id="width"
                              type="number"
                              min={0}
                              placeholder="Width"
                              className="h-8"
                              value={variant?.shipping?.width}
                              onChange={(e) =>
                                handleUpdateVariant(
                                  e.target.value,
                                  i,
                                  "shipping",
                                  "width"
                                )
                              }
                            />
                            <Input
                              id="height"
                              type="number"
                              min={0}
                              placeholder="Height"
                              className="h-8"
                              value={variant?.shipping?.height}
                              onChange={(e) =>
                                handleUpdateVariant(
                                  e.target.value,
                                  i,
                                  "shipping",
                                  "height"
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="3">
                      <label htmlFor="" className="text-sm text-gray-600">
                        Description
                      </label>
                      <textarea
                        name=""
                        className="flex h-8 w-full bg-white rounded-md border border-input bg-transparent pr-3 pl-2 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        rows={2}
                        onChange={(e) =>
                          handleUpdateVariant(e.target.value, i, "description")
                        }
                        value={variant?.description}
                        id=""
                      ></textarea>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  );
};

export default AttributeComponent;
