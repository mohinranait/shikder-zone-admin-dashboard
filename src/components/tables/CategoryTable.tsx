import React, { JSX, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useAppSelector } from "@/hooks/useRedux";
import { deleteCategory, updateCategory } from "@/actions/categoriesApi";
import DeleteModal from "../modals/DeleteModal";
import { useDispatch } from "react-redux";
import {
  addCategory,
  setSelectedCategory,
} from "@/redux/features/categorySlice";
import toast from "react-hot-toast";
import CategoryUpdateModal from "../modals/CategoryUpdateModal";
import { defaultImage } from "@/utils/exportImages";
import { Switch } from "../ui/switch";
import { TCategoryType } from "@/types/category.type";

type ExtendedCategory = TCategoryType & {
  children: ExtendedCategory[];
};

const CategoryTable = () => {
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [categoryModal, setCategoryModal] = useState<boolean>(false);
  const { categories, selectedCategory } = useAppSelector(
    (state) => state.category
  );

  // State for filters and pagination
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<"All" | "Active" | "Inactive">("All");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 15;

  // Build tree from flat categories
  const buildTree = (cats: TCategoryType[]): ExtendedCategory[] => {
    const map: Map<string, ExtendedCategory> = new Map();
    cats.forEach((cat) => {
      if (!cat?._id) {
        return;
      }
      map.set(cat._id, { ...cat, children: [] });
    });
    const roots: ExtendedCategory[] = [];
    cats.forEach((cat) => {
      if (!cat?._id) {
        return;
      }
      if (cat.parent && map.has(cat.parent)) {
        map.get(cat.parent)!.children.push(map.get(cat._id)!);
      } else if (!cat.parent) {
        roots.push(map.get(cat._id)!);
      }
    });
    return roots;
  };

  // Match function for filtering
  const isMatch = (cat: TCategoryType) => {
    const matchName = name
      ? cat.name.toLowerCase().includes(name.toLowerCase())
      : true;
    const matchStatus = status === "All" ? true : cat.status === status;
    return matchName && matchStatus;
  };

  // Recursively filter the tree
  const filterTree = (node: ExtendedCategory): ExtendedCategory | null => {
    const children = node.children
      .map((child) => filterTree(child))
      .filter((c): c is ExtendedCategory => c !== null);
    if (isMatch(node) || children.length > 0) {
      return { ...node, children };
    }
    return null;
  };

  // Get all tree and filter it
  const allTree = buildTree(categories);
  const filteredRoots = allTree
    .map((root) => filterTree(root))
    .filter((r): r is ExtendedCategory => r !== null);

  // Pagination on filtered roots
  const totalPages = Math.ceil(filteredRoots.length / perPage);
  const paginatedRoots = filteredRoots.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async () => {
    if (!selectedCategory?._id) return;

    try {
      setDeleteLoading(true);
      // Delete category by ID
      const data = await deleteCategory(`${selectedCategory?._id}`);

      if (data.success) {
        const updatedCategories = categories.filter(
          (cat) => cat._id !== selectedCategory?._id
        );
        // Update UI
        dispatch(addCategory({ data: updatedCategories, type: "Array" }));
        toast.success("Category is deleted");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsOpen(false);
      dispatch(setSelectedCategory(null));
      setDeleteLoading(false);
    }
  };

  const handleChangeStatus = async (
    value: boolean,
    category: TCategoryType
  ) => {
    if (!category?._id) {
      return;
    }
    try {
      const res = await updateCategory(category?._id, {
        ...category,
        status: value ? "Active" : "Inactive",
      });
      console.log({ res });
      if (res.success) {
        // Update UI
        const updatedCategories = categories.map((item) =>
          item?._id === res?.payload?._id
            ? { ...item, status: res?.payload?.status }
            : item
        );
        // Update UI
        dispatch(addCategory({ data: updatedCategories, type: "Array" }));
        toast.success(res?.message);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  // Recursive function to render category rows with nesting
  const renderCategoryRows = (
    cat: ExtendedCategory,
    level: number
  ): JSX.Element[] => {
    const row = (
      <TableRow key={cat._id}>
        <TableCell className="w-4" />
        <TableCell className={`pl-${level * 4}`}>
          <div className="flex gap-2">
            <Image
              src={cat?.catThumbnail || defaultImage}
              className="w-[40px] h-[40px] rounded"
              width={40}
              height={40}
              alt="cat image"
            />
            <div>
              <p>{cat?.name}</p>
              <div className="flex mt-[2px] gap-1 items-center">
                <span
                  onClick={() => {
                    dispatch(setSelectedCategory(cat));
                    setCategoryModal(true);
                  }}
                  className="text-xs text-slate-500 hover:underline cursor-pointer hover:text-primary"
                >
                  Edit
                </span>
                <span className="text-xs text-slate-500 hover:underline cursor-pointer hover:text-primary">
                  View
                </span>
                <span
                  onClick={() => {
                    dispatch(setSelectedCategory(cat));
                    setIsOpen(true);
                  }}
                  className="text-xs text-slate-500 hover:underline cursor-pointer hover:text-primary"
                >
                  Delete
                </span>
              </div>
            </div>
          </div>
        </TableCell>
        <TableCell>{cat?.productCount || 0} Products</TableCell>
        <TableCell>
          <Switch
            checked={cat?.status === "Active"}
            onCheckedChange={(e) => handleChangeStatus(e, cat)}
          />
        </TableCell>
      </TableRow>
    );

    const childRows = cat.children.flatMap((child) =>
      renderCategoryRows(child, level + 1)
    );

    return [row, ...childRows];
  };

  return (
    <div className="w-full rounded-lg border bg-card text-card-foreground shadow">
      <div className="p-6">
        <p className="font-semibold tracking-tight text-xl">All Categories</p>
        <p className="text-sm text-muted-foreground">Manage your categories</p>
      </div>
      <div className="p-6 pt-0">
        <div className="mb-4 flex items-center gap-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Filter categories"
            className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
          <Select
            value={status}
            onValueChange={(value) =>
              setStatus(value as "Active" | "All" | "Inactive")
            }
          >
            <SelectTrigger className="w-[140px] h-9">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="overflow-y-auto">
          <Table className="w-full border border-slate-100">
            <TableHeader>
              <TableRow>
                <TableHead className="h-10 w-4"></TableHead>
                <TableHead className="h-10">Category</TableHead>
                <TableHead className="h-10">Total</TableHead>
                <TableHead className="h-10">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRoots.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="bg-slate-200 m-3 rounded p-3 text-center"
                  >
                    Data not found
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {paginatedRoots.flatMap((root) =>
                    renderCategoryRows(root, 0)
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 pt-4">
          <div className="space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                disabled={currentPage === index + 1}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleDelete={handleDelete}
        isLoading={deleteLoading}
      />
      <CategoryUpdateModal
        isOpen={categoryModal}
        setIsOpen={setCategoryModal}
      />
    </div>
  );
};

export default CategoryTable;
