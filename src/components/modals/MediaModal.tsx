"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";

import React from "react";
import MediaModalWrapper from "../pages/media/MediaModalWrapper";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setIsModal } from "@/redux/features/mediaSlice";

const MediaModal = () => {
  const { isModal } = useAppSelector((state) => state.media);
  const dispatch = useAppDispatch();

  return (
    <React.Fragment>
      <Dialog open={isModal} onOpenChange={() => dispatch(setIsModal(false))}>
        <DialogContent className="max-w-[1200px] max-h-[80vh] overflow-y-auto 2xl:max-w-[1450px] ">
          <DialogDescription className="  ">
            <MediaModalWrapper />;
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default MediaModal;
