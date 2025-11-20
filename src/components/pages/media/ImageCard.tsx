"use client";
import { TMediaType } from "@/types/media.type";
import Image from "next/image";
import React, { FC } from "react";

type Props = {
  onCallBack: () => void;
  img: TMediaType;
};
const ImageCard: FC<Props> = ({ onCallBack, img }) => {
  return (
    <div
      onClick={onCallBack}
      className="border cursor-pointer bg-slate-200 border-slate-200"
    >
      <Image
        src={img?.fileUrl || "/images/avater.jpg"}
        width={100}
        height={100}
        alt="image"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ImageCard;
