"use client";

import type React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ISetting } from "@/types/setting.type";
import Image from "next/image";
import { Upload } from "lucide-react";
import SelectImageFromModal from "@/components/shared/SelectImageFromModal";
import { useAppDispatch } from "@/hooks/useRedux";
import {
  addUnicName,
  addVariant,
  setIsModal,
} from "@/redux/features/mediaSlice";

interface BrandingSectionProps {
  formData: ISetting;
  setFormData: React.Dispatch<React.SetStateAction<ISetting>>;
}

export default function BrandingSection({
  formData,
  setFormData,
}: BrandingSectionProps) {
  const dispatch = useAppDispatch();
  // const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       setFormData({
  //         ...formData,
  //         logo: { url: event.target?.result as string },
  //       });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Branding</CardTitle>
        <CardDescription>
          Manage your store logo and brand colors
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label>Store Logo</Label>
          <div className="flex items-center gap-6">
            {formData.logo?.url && (
              <div className="w-24 h-24 rounded-lg border border-border overflow-hidden flex items-center justify-center bg-secondary">
                <Image
                  width={100}
                  height={100}
                  src={formData.logo.url || "/images/image.png"}
                  alt="Logo preview"
                  className="w-full h-full object-contain"
                />
              </div>
            )}

            <SelectImageFromModal
              singleFile={(imgFile) => {
                console.log({ imgFile });
                setFormData({
                  ...formData,
                  logo: { ...formData.logo, url: imgFile.fileUrl },
                });
              }}
            >
              <Button
                onClick={() => {
                  dispatch(setIsModal(true));
                  dispatch(addVariant("Single"));
                  dispatch(addUnicName("uploadLogo"));
                }}
                variant="outline"
                asChild
              >
                <label className="cursor-pointer">
                  <Upload /> Upload Logo
                </label>
              </Button>
            </SelectImageFromModal>
          </div>
          <p className="text-sm text-muted-foreground">
            Recommended size: 200x200px. Formats: PNG, JPG, GIF
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="brandColor">Brand Color</Label>
          <div className="flex items-center gap-4">
            <input
              id="brandColor"
              type="color"
              value={formData.brandColor}
              onChange={(e) =>
                setFormData({ ...formData, brandColor: e.target.value })
              }
              className="w-12 h-12 rounded-lg cursor-pointer border border-border"
            />
            <Input
              type="text"
              value={formData.brandColor}
              onChange={(e) =>
                setFormData({ ...formData, brandColor: e.target.value })
              }
              placeholder="#000000"
              className="flex-1"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
