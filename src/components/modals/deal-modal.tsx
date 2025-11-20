"use client";
import React, { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { setSelectedBrand } from "@/redux/features/brandSlice";
import { useAppDispatch } from "@/hooks/useRedux";
import DealForm from "../forms/deal-form";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const DealModal: FC<Props> = ({ isOpen, setIsOpen }) => {
  const dispatch = useAppDispatch();
  return (
    <Dialog
      onOpenChange={() => {
        dispatch(setSelectedBrand(null));
        setIsOpen(false);
      }}
      open={isOpen}
    >
      <DialogContent className="w-[350px]">
        <DialogHeader>
          <DialogTitle>Section </DialogTitle>
          <DialogDescription>You want to update this data?</DialogDescription>
        </DialogHeader>
        <DialogDescription>
          <DealForm closeModal={setIsOpen} open={isOpen} />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default DealModal;
