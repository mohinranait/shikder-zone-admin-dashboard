"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bed, Bone, Car, Link, Tag } from "lucide-react";
import { TProductType, TProductTypeLists } from "@/types/product.type";
import GeneralComponent from "./GeneralComponent";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setProduct } from "@/redux/features/productSlice";
import InventoryComponent from "./InventoryComponent";
import ShippingComponent from "./ShippingComponent";
import LinkComponent from "./LinkComponent";
import AttributeComponent from "./AttributeComponent";
import dynamic from "next/dynamic";

// Lazy load VariationsComponent for better performance
const VariationsComponent = dynamic(
  () => import("@/components/pages/Product/VariationsComponent"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    ),
  }
);

/**
 * Tab configuration type for product variants
 */
type TVariantTabType = {
  id: string;
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

/**
 * Available product variants
 */
const PRODUCT_VARIANTS: TProductType[] = [
  "Single Product",
  "Variable Product",
  "Group Product",
  "Affiliate",
];

/**
 * Tab configuration for each product type
 */
const PRODUCT_TABS_CONFIG: { type: TProductType; tabs: TProductTypeLists[] }[] =
  [
    {
      type: "Single Product",
      tabs: ["General", "Inventory", "Shipping", "Link Product", "Attributes"],
    },
    {
      type: "Variable Product",
      tabs: ["Shipping", "Attributes", "Variations"],
    },
    {
      type: "Group Product",
      tabs: ["General", "Inventory", "Shipping"],
    },
    {
      type: "Affiliate",
      tabs: ["Inventory", "Shipping", "Attributes"],
    },
  ];

/**
 * ProductVarient Component
 * Manages product type selection and displays appropriate tabs
 *
 * @returns {JSX.Element} The product variant configuration component
 */
const ProductVarient: React.FC = () => {
  // Redux State
  const { product } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  // Local State
  const [variantTabs, setVariantTabs] = useState<TVariantTabType[]>([]);
  const [activeTab, setActiveTab] = useState<TVariantTabType | null>(null);

  /**
   * Memoized tab items configuration
   */
  const tabItems: TVariantTabType[] = useMemo(
    () => [
      {
        id: "general",
        label: "General",
        icon: <Bone size={16} aria-hidden="true" />,
        children: <GeneralComponent />,
      },
      {
        id: "inventory",
        label: "Inventory",
        icon: <Tag size={16} aria-hidden="true" />,
        children: <InventoryComponent />,
      },
      {
        id: "shipping",
        label: "Shipping",
        icon: <Car size={16} aria-hidden="true" />,
        children: <ShippingComponent />,
      },
      {
        id: "link-product",
        label: "Link Product",
        icon: <Link size={16} aria-hidden="true" />,
        children: <LinkComponent />,
      },
      {
        id: "attributes",
        label: "Attributes",
        icon: <Bed size={16} aria-hidden="true" />,
        children: <AttributeComponent />,
      },
      {
        id: "variations",
        label: "Variations",
        icon: <Bed size={16} aria-hidden="true" />,
        children: <VariationsComponent />,
      },
    ],
    []
  );

  /**
   * Filters tabs based on product type and updates state
   * @param {string} productType - The selected product type
   */
  const getAllVariantTabs = useCallback(
    (productType: string) => {
      const tabConfig = PRODUCT_TABS_CONFIG.find(
        (tab) => tab.type === productType
      );

      if (tabConfig) {
        const filteredTabs: TVariantTabType[] = tabItems.filter((item) =>
          tabConfig.tabs.includes(item.label as TProductTypeLists)
        );

        setVariantTabs(filteredTabs);
        setActiveTab(filteredTabs[0] || null);
      }
    },
    [tabItems]
  );

  /**
   * Handles product variant selection
   * @param {TProductType} value - The selected product type
   */
  const handleSelectVariant = useCallback(
    (value: TProductType) => {
      getAllVariantTabs(value);
      dispatch(setProduct({ ...product, variant: value }));
    },
    [getAllVariantTabs, dispatch, product]
  );

  /**
   * Handles tab click
   * @param {TVariantTabType} tab - The clicked tab
   */
  const handleTabClick = useCallback((tab: TVariantTabType) => {
    setActiveTab(tab);
  }, []);

  // Initialize tabs on component mount
  useEffect(() => {
    getAllVariantTabs(PRODUCT_VARIANTS[0]);
  }, [getAllVariantTabs]);

  // Update tabs when product variant changes
  useEffect(() => {
    const selectedVariant = product?.variant || PRODUCT_VARIANTS[0];
    getAllVariantTabs(selectedVariant);
  }, [product?.variant, getAllVariantTabs]);

  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-200">
      {/* Header Section */}
      <div className="flex items-center gap-3 border-b border-gray-200 p-4 py-3">
        <label
          htmlFor="product-variant-select"
          className="text-sm font-medium text-gray-700"
        >
          Product data
        </label>
        <Select
          value={product?.variant || PRODUCT_VARIANTS[0]}
          onValueChange={handleSelectVariant}
        >
          <SelectTrigger
            id="product-variant-select"
            className="w-[160px] h-8 text-sm"
            aria-label="Select product variant"
          >
            <SelectValue placeholder={PRODUCT_VARIANTS[0]} />
          </SelectTrigger>
          <SelectContent>
            {PRODUCT_VARIANTS.map((variant) => (
              <SelectItem
                key={variant}
                value={variant}
                className="cursor-pointer text-sm"
              >
                {variant}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Content Section */}
      <div className="flex min-h-[400px]">
        {/* Sidebar Navigation */}
        <div className="border-r border-gray-200">
          <nav
            className="bg-slate-50 w-[200px]"
            role="tablist"
            aria-label="Product configuration tabs"
          >
            {variantTabs.map((variant) => (
              <button
                type="button"
                key={variant.id}
                onClick={() => handleTabClick(variant)}
                className={`
                  w-full py-3 px-4 text-sm text-left border-l-4 flex items-center gap-2 
                  hover:bg-slate-100 focus:outline-none  
                  focus:ring-inset transition-colors duration-200
                  ${
                    variant.label === activeTab?.label
                      ? "bg-white border-blue-500 text-blue-700 font-medium"
                      : "bg-slate-50 border-transparent text-gray-700 hover:text-gray-900"
                  }
                `}
                role="tab"
                aria-selected={variant.label === activeTab?.label}
                aria-controls={`panel-${variant.id}`}
                id={`tab-${variant.id}`}
              >
                {variant.icon}
                <span>{variant.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div
          className="flex-1 min-w-0"
          role="tabpanel"
          id={`panel-${activeTab?.id}`}
          aria-labelledby={`tab-${activeTab?.id}`}
        >
          {activeTab?.children || (
            <div className="flex items-center justify-center h-32 text-gray-500">
              <p>No content available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductVarient;
