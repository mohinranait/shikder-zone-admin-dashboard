"use client";
import React, { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  handleDelete: () => Promise<void>;
};
const DeleteModal: FC<Props> = ({
  isOpen,
  setIsOpen,
  isLoading,
  handleDelete,
}) => {
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent className="w-[280px]">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>You want to delete this data?</DialogDescription>
        </DialogHeader>
        <DialogDescription>
          <div className="flex items-center justify-center gap-3">
            <Button
              type="button"
              onClick={() => setIsOpen(false)}
              className="h-[34px]"
            >
              No
            </Button>
            <Button
              type="button"
              disabled={isLoading}
              onClick={handleDelete}
              className="h-[34px] bg-red-600"
            >
              {isLoading ? "Loading..." : "Yes"}
            </Button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
