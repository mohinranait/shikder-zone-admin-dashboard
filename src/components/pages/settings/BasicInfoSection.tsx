"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ISetting } from "@/types/setting.type";

interface BasicInfoSectionProps {
  formData: ISetting;
  setFormData: React.Dispatch<React.SetStateAction<ISetting>>;
}

export default function BasicInfoSection({
  formData,
  setFormData,
}: BasicInfoSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>
          Update your store name, email, and description
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="storeName">Store Name</Label>
            <Input
              id="storeName"
              placeholder="My Awesome Store"
              value={formData.storeName}
              onChange={(e) =>
                setFormData({ ...formData, storeName: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="storeEmail">Store Email</Label>
            <Input
              id="storeEmail"
              type="email"
              placeholder="info@store.com"
              value={formData.storeEmail}
              onChange={(e) =>
                setFormData({ ...formData, storeEmail: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="storePhone">Phone Number</Label>
            <Input
              id="storePhone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.storePhone}
              onChange={(e) =>
                setFormData({ ...formData, storePhone: e.target.value })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="storeDescription">Store Description</Label>
          <Textarea
            id="storeDescription"
            placeholder="Describe your store, what you sell, and your mission..."
            value={formData.storeDescription}
            onChange={(e) =>
              setFormData({ ...formData, storeDescription: e.target.value })
            }
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  );
}
