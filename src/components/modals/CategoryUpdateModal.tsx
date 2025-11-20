"use client";
import React, { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import CategoryForm from "../forms/CategoryForm";
import { useAppSelector } from "@/hooks/useRedux";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  //   isLoading: boolean;
  //   handleDelete: () => Promise<void>;
};
const CategoryUpdateModal: FC<Props> = ({ isOpen, setIsOpen }) => {
  const { selectedCategory } = useAppSelector((state) => state.category);
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent className="w-[350px]">
        <DialogHeader>
          <DialogTitle>Category update </DialogTitle>
          <DialogDescription>You want to update this data?</DialogDescription>
        </DialogHeader>
        <DialogDescription>
          <CategoryForm
            closeModal={setIsOpen}
            selectedCategory={selectedCategory}
          />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryUpdateModal;
