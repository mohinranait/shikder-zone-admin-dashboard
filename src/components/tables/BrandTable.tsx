"use client";
import React, { useState } from "react";
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
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import DeleteModal from "../modals/DeleteModal";
import { deleteBrand, updateBrand } from "@/actions/brandApi";
import { addBrand, setSelectedBrand } from "@/redux/features/brandSlice";
import toast from "react-hot-toast";
import BrandUpdateModal from "../modals/BrandUpdateModal";
import { defaultImage } from "@/utils/exportImages";
import { Switch } from "../ui/switch";
import { TBrandType } from "@/types/brand.type";
import BrandCategoryForm from "../forms/BrandCategoryForm";
import { Button } from "../ui/button";

const BrandTable = () => {
  const dispatch = useAppDispatch();
  const { brands, selectedBrand } = useAppSelector((state) => state.brand);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [brandEditModal, setBrandEditModal] = useState<boolean>(false);
  const [categoryConfigModal, setCategoryConfigModal] =
    useState<boolean>(false);

  // State for filters and pagination
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<"All" | "Active" | "Inactive">("All");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 3;

  // Filtered categories based on name and status
  const filteredBrands = brands.filter((brand) => {
    const matchName = name
      ? brand.name.toLowerCase().includes(name.toLowerCase())
      : true;
    const matchStatus = status === "All" ? true : brand.status === status;
    return matchName && matchStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredBrands.length / perPage);
  const paginatedBrands = filteredBrands.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  /**
   * Delete Brand Using API
   */
  const handleDelete = async () => {
    if (!selectedBrand?._id) return;

    try {
      setDeleteLoading(true);
      // Call API for Delete brand by ID
      const data = await deleteBrand(`${selectedBrand?._id}`);

      if (data.success) {
        const updatedBrands = brands.filter(
          (brand) => brand._id !== selectedBrand?._id
        );
        // Update UI
        dispatch(addBrand({ data: updatedBrands, type: "Array" }));
        toast.success("Brand is deleted");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsOpen(false);
      dispatch(setSelectedBrand(null));
      setDeleteLoading(false);
    }
  };

  const handleChangeStatus = async (value: boolean, brand: TBrandType) => {
    if (!brand?._id) {
      return;
    }
    try {
      const res = await updateBrand(brand?._id, {
        ...brand,
        status: value ? "Active" : "Inactive",
      });
      if (res.success) {
        const updatedBrands = brands.map((item) =>
          item?._id === res?.payload?._id
            ? { ...item, status: res?.payload?.status }
            : item
        );
        // Update UI
        dispatch(addBrand({ data: updatedBrands, type: "Array" }));
        toast.success(res?.message);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="w-full rounded-lg border bg-card text-card-foreground shadow">
      <div className="p-6">
        <p className="font-semibold tracking-tight text-xl">All Brands</p>
        <p className="text-sm text-muted-foreground">Manage your brands</p>
      </div>
      <div className="p-6 pt-0">
        <div className="mb-4 flex items-center gap-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Filter brands"
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
        <Table className="w-full border border-slate-100">
          <TableHeader>
            <TableRow>
              <TableHead>Brand</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Categories</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedBrands?.map((brand, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex gap-2">
                    <Image
                      src={brand?.brandThumbnail || defaultImage}
                      className="w-[50] h-[50px] rounded"
                      width={50}
                      height={50}
                      alt="cat image"
                    />

                    <div>
                      <p>{brand?.name}</p>
                      <div className="flex mt-[2px] gap-1 items-center">
                        <span
                          onClick={() => {
                            dispatch(setSelectedBrand(brand));
                            setBrandEditModal(true);
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
                            dispatch(setSelectedBrand(brand));
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
                <TableCell>{brand?.totalProduct} Product</TableCell>
                <TableCell>
                  <Button
                    type="button"
                    onClick={() => {
                      dispatch(setSelectedBrand(brand));
                      setCategoryConfigModal(true);
                    }}
                  >
                    Add Category
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="flex">
                    <Switch
                      checked={brand?.status === "Active"}
                      onCheckedChange={(e) => handleChangeStatus(e, brand)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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

      {/* Delete modal */}
      <DeleteModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleDelete={handleDelete}
        isLoading={deleteLoading}
      />
      {/* Brand update modal */}
      <BrandUpdateModal isOpen={brandEditModal} setIsOpen={setBrandEditModal} />
      {/* Add category under brand modal */}
      <BrandCategoryForm
        open={categoryConfigModal}
        onClose={() => setCategoryConfigModal(false)}
      />
    </div>
  );
};

export default BrandTable;
