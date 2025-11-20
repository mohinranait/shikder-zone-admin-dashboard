import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onClose: () => void;
  modalTile?: React.ReactNode;
  subTitle?: React.ReactNode;
  footers?: React.ReactNode;
  children: React.ReactNode;
};
const GlobalModal = ({
  modalTile = "Modal",
  subTitle,
  footers,
  open,
  onClose,
  children,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-0 gap-0 ">
        <DialogHeader className=" border-b py-3 px-2">
          <DialogTitle>{modalTile}</DialogTitle>
          {subTitle && <DialogTitle>{subTitle}</DialogTitle>}
        </DialogHeader>
        <DialogDescription className="max-h-[80vh] overflow-y-auto p-2">
          {children}
        </DialogDescription>
        {footers && (
          <DialogFooter className="py-2 px-2 border-t">{footers}</DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GlobalModal;
