"use client";
import React, { useEffect, useState } from "react";
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
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import DeleteModal from "../modals/DeleteModal";
import toast from "react-hot-toast";
import {
  addAttributeConfig,
  setSelectedAttributeConfig,
} from "@/redux/features/attributeConfigSlice";
import { deleteAttributeConfig } from "@/actions/attributeConfigApi";
import { useParams } from "next/navigation";
import { TAttributeConfigType } from "@/types/attributeConfig.type";

const AttributeConfigTable = () => {
  const dispatch = useAppDispatch();
  const { attributeConfigs: allConfigs, selectedAttributeConfig } =
    useAppSelector((state) => state.attributeConfig);

  const params = useParams();
  const attrId = params.attrId;

  const [attributeConfigs, setAttributeConfigs] = useState<
    TAttributeConfigType[]
  >([...allConfigs?.filter((d) => d?.attribute === attrId)]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  // State for filters and pagination
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<"All" | "Active" | "Inactive">("All");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 3;

  // Filtered attributes based on name and status
  const filteredAttributes = attributeConfigs.filter((attr) => {
    const matchName = name
      ? attr.name.toLowerCase().includes(name.toLowerCase())
      : true;
    const matchStatus = status === "All" ? true : attr.status === status;
    return matchName && matchStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredAttributes.length / perPage);
  const paginatedAttributes = filteredAttributes.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  /**
   * Delete attribute Using API
   */
  const handleDelete = async () => {
    if (!selectedAttributeConfig?._id) return;

    try {
      setDeleteLoading(true);
      // Call API for Delete attribute by ID
      const data = await deleteAttributeConfig(
        `${selectedAttributeConfig?._id}`
      );

      if (data.success) {
        const updatedAttributes = attributeConfigs.filter(
          (attr) => attr._id !== selectedAttributeConfig?._id
        );
        // Update UI
        dispatch(
          addAttributeConfig({ data: updatedAttributes, type: "Array" })
        );
        toast.success("Attribute is deleted");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsOpen(false);
      dispatch(setSelectedAttributeConfig(null));
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    const filterConfigs = allConfigs?.filter((d) => d.attribute === attrId);
    if (filterConfigs) {
      setAttributeConfigs([...filterConfigs]);
    }
  }, [attrId, allConfigs]);

  return (
    <div className="w-full rounded-lg border bg-card text-card-foreground shadow">
      <div className="p-6">
        <p className="font-semibold tracking-tight text-xl">All Attributes</p>
        <p className="text-sm text-muted-foreground">Manage your attributes</p>
      </div>
      <div className="p-6 pt-0">
        <div className="mb-4 flex items-center gap-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Filter attributes"
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
              <TableHead>Attribute</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedAttributes?.map((attr, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex gap-2">
                    <div>
                      <p>{attr?.name}</p>
                      <div className="flex mt-[2px] gap-1 items-center">
                        <span
                          onClick={() => {
                            dispatch(setSelectedAttributeConfig(attr));
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
                            dispatch(setSelectedAttributeConfig(attr));
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
                <TableCell>10 Product</TableCell>
                <TableCell>
                  <div className="flex">
                    {attr?.status === "Active" ? (
                      <span className="inline-flex px-2 py-[2px] rounded bg-green-500 text-xs font-semibold text-white">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex px-2 py-[2px] rounded bg-red-500 text-xs font-semibold text-white">
                        Inactive
                      </span>
                    )}
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

      <DeleteModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleDelete={handleDelete}
        isLoading={deleteLoading}
      />
    </div>
  );
};

export default AttributeConfigTable;
