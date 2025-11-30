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
import { ISetting } from "@/types/setting.type";

interface AddressSectionProps {
  formData: ISetting;
  setFormData: React.Dispatch<React.SetStateAction<ISetting>>;
}

export default function AddressSection({
  formData,
  setFormData,
}: AddressSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Store Address</CardTitle>
        <CardDescription>Your physical store location</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              placeholder="123 Main Street"
              value={formData.address.street}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { ...formData.address, street: e.target.value },
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              placeholder="New York"
              value={formData.address.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { ...formData.address, city: e.target.value },
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">State/Province</Label>
            <Input
              id="state"
              placeholder="NY"
              value={formData.address.state}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { ...formData.address, state: e.target.value },
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              placeholder="United States"
              value={formData.address.country}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { ...formData.address, country: e.target.value },
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="zipCode">Zip/Postal Code</Label>
            <Input
              id="zipCode"
              placeholder="10001"
              value={formData.address.zipCode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { ...formData.address, zipCode: e.target.value },
                })
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
