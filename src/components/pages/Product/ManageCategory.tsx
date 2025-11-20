"use client";
import React, { useEffect, useState, useCallback, useMemo, JSX } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CategoryForm from "@/components/forms/CategoryForm";
import { setProduct } from "@/redux/features/productSlice";

/**
 * Base category structure for building tree
 */
type TBuildTree = {
  _id: string;
  name: string;
  parent: string;
};

/**
 * Extended tree node with children and optional timestamp
 */
export type TTreeNode = TBuildTree & {
  children?: TBuildTree[];
  createdAt?: string;
};

/**
 * Builds a hierarchical tree structure from flat category data
 * @param {TBuildTree[]} items - Flat array of category items
 * @returns {TTreeNode[]} - Hierarchical tree structure
 */
function buildTree(items: TBuildTree[]): TTreeNode[] {
  if (!items || items.length === 0) return [];

  const map = new Map<string, TTreeNode>();

  // Create map with all items
  items.forEach((item) => {
    map.set(item._id, { ...item, children: [] });
  });

  const result: TTreeNode[] = [];

  // Build parent-child relationships
  items.forEach((item) => {
    const currentNode = map.get(item._id);
    if (!currentNode) return;

    if (item.parent) {
      const parent = map.get(item.parent);
      if (parent) {
        parent.children?.push(currentNode);
      }
    } else {
      result.push(currentNode);
    }
  });

  return result;
}

/**
 * ManageCategory Component
 * Handles category selection with hierarchical structure
 *
 * @returns {JSX.Element} The category management component
 */
const ManageCategory: React.FC = () => {
  // Redux State
  const { categories } = useAppSelector((state) => state.category);
  const { product } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  // Local State
  const [catIds, setCatIds] = useState<string[]>([]);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [showCategories, setShowCategories] = useState<TTreeNode[]>([]);

  /**
   * Recursively selects parent categories when a child is selected
   * @param {string | null} id - Category ID to select
   * @param {string[]} catIds - Current selected category IDs
   * @returns {string[]} - Updated category IDs array
   */
  const selectedRecursion = useCallback(
    (id: string | null, catIds?: string[]): string[] => {
      const newCatIds: string[] = catIds ? [...catIds] : [];

      if (id && !catIds?.includes(id)) {
        newCatIds.push(id);
      }

      const findCat = categories?.find((cat) => cat?._id === id);
      if (findCat?.parent) {
        const prevCategories = selectedRecursion(findCat.parent, newCatIds);
        prevCategories.forEach((prevId) => {
          if (!newCatIds.includes(prevId)) {
            newCatIds.push(prevId);
          }
        });
      }

      return newCatIds;
    },
    [categories]
  );

  /**
   * Recursively deselects child categories when a parent is deselected
   * @param {string | null} id - Category ID to deselect
   */
  const deselectRecursion = useCallback(
    (id: string | null) => {
      setCatIds((prev) => prev.filter((cid) => cid !== id));

      const children = categories.filter((cat) => cat.parent === id);

      if (children.length > 0) {
        children.forEach((child) => {
          deselectRecursion(child?._id as string);
        });
      }
    },
    [categories]
  );

  /**
   * Handles category selection/deselection
   * @param {string} value - Category ID to toggle
   */
  const handleChangeMethod = useCallback(
    (value: string) => {
      if (catIds.includes(value)) {
        deselectRecursion(value);
      } else {
        const newcatIds = selectedRecursion(value);
        setCatIds((prev) => [...prev, ...newcatIds]);
      }
    },
    [catIds, deselectRecursion, selectedRecursion]
  );

  /**
   * Toggles the category form modal
   */
  const handleToggleForm = useCallback(() => {
    setOpenForm((prev) => !prev);
  }, []);

  /**
   * Closes the category form modal
   */
  const handleCloseForm = useCallback(() => {
    setOpenForm(false);
  }, []);

  /**
   * Memoized category tree structure
   */
  const categoryTree = useMemo(() => {
    const formattedCategories = categories?.map((d) => ({
      _id: d?._id,
      name: d.name,
      parent: d.parent,
    }));

    return buildTree(formattedCategories as TBuildTree[]);
  }, [categories]);

  /**
   * Renders category tree recursively
   * @param {TTreeNode[]} categories - Categories to render
   * @param {number} level - Current nesting level
   * @returns {JSX.Element[]} - Rendered category elements
   */
  const renderCategories = useCallback(
    (categories: TTreeNode[], level = 0): JSX.Element[] => {
      return categories.map((category) => {
        const id = `level_${level}_cat_${category._id}`;
        const isSelected = product?.category?.includes(category._id) || false;

        return (
          <React.Fragment key={category._id}>
            <li
              className={`flex items-center space-x-2 py-1`}
              style={{ paddingLeft: `${level * 2}px` }}
            >
              <Checkbox
                onCheckedChange={() => handleChangeMethod(category._id)}
                checked={isSelected}
                id={id}
                aria-describedby={`${id}-description`}
              />
              <label
                htmlFor={id}
                className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:text-black transition-colors"
              >
                {category.name}
              </label>
            </li>
            {category.children && category.children.length > 0 && (
              <li className="ml-2">
                <ul className="space-y-1 border-l border-gray-200 pl-2">
                  {renderCategories(category.children, level + 1)}
                </ul>
              </li>
            )}
          </React.Fragment>
        );
      });
    },
    [product?.category, handleChangeMethod]
  );

  // Update category tree when categories change
  useEffect(() => {
    setShowCategories(categoryTree);
  }, [categoryTree]);

  // Update product categories when catIds change
  useEffect(() => {
    dispatch(setProduct({ ...product, category: catIds }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catIds]);

  // Initialize categories from product or reset when no product
  useEffect(() => {
    if (product?.category && catIds.length === 0) {
      setCatIds(product.category);
    } else if (!product && catIds.length > 0) {
      // Reset categories when no product exists
      setCatIds([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.category]);

  return (
    <React.Fragment>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        {/* Header */}
        <div className="py-3 px-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
          <h3 className="text-base font-semibold text-gray-900">Categories</h3>
        </div>

        {/* Category List */}
        <div className="px-4 py-3">
          <div className="max-h-[200px] overflow-y-auto border border-gray-200 rounded-md p-3 bg-gray-50">
            {showCategories.length > 0 ? (
              <ul
                className="space-y-1"
                role="tree"
                aria-label="Category selection"
              >
                {renderCategories(showCategories)}
              </ul>
            ) : (
              <div className="text-center py-4 text-gray-500">
                <p className="text-sm">No categories available</p>
              </div>
            )}
          </div>
        </div>

        {/* Add Category Button */}
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <Button
            type="button"
            variant="secondary"
            className="px-3 h-8 hover:bg-gray-200 rounded-md flex items-center gap-2 text-sm font-medium transition-colors"
            onClick={handleToggleForm}
            aria-label="Add new category"
          >
            <Plus size={16} aria-hidden="true" />
            Add Category
          </Button>
        </div>
      </div>

      {/* Category Form Modal */}
      <Dialog onOpenChange={setOpenForm} open={openForm}>
        <DialogContent className="w-[400px] max-w-[90vw]">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Create New Category
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              Create a new category to organize your products better.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <CategoryForm closeModal={handleCloseForm} />
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default ManageCategory;
