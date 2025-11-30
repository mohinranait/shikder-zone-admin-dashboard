"use client";

import type React from "react";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Check } from "lucide-react";
import { instance } from "@/hooks/useAxios";
import { AppIntegrationType } from "@/types/app.service.type";

interface CloudinaryConfigFormProps {
  onSuccess?: () => void;
  cloudinary: AppIntegrationType["cloudinary"];
}

export default function CloudinaryConfigForm({
  onSuccess,
  cloudinary,
}: CloudinaryConfigFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    isActive: false,
    cloudName: "",
    apiKey: "",
    apiSecret: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await instance.post("/integrations/cloudinary", {
        ...formData,
      });

      if (res.data.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        onSuccess?.();
      }
    } catch (error) {
      console.error("Failed to save config:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cloudinary) {
      setFormData({
        isActive: cloudinary.isActive || false,
        cloudName: cloudinary.cloudName || "",
        apiKey: cloudinary.apiKey || "",
        apiSecret: cloudinary.apiSecret || "",
      });
    }
  }, [cloudinary]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cloudinary Configuration</CardTitle>
        <CardDescription>
          Set up Cloudinary for image hosting and optimization
        </CardDescription>
      </CardHeader>
      <CardContent>
        {success && (
          <Alert className="bg-green-50 border-green-200 mb-4">
            <Check className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Cloudinary configuration saved successfully
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="cloudName">Cloud Name</Label>
            <Input
              id="cloudName"
              name="cloudName"
              placeholder="Your cloud name"
              value={formData.cloudName}
              onChange={handleInputChange}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Found in your Cloudinary dashboard settings
            </p>
          </div>

          <div>
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              name="apiKey"
              placeholder="Your API key"
              value={formData.apiKey}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="apiSecret">API Secret</Label>
            <Input
              id="apiSecret"
              name="apiSecret"
              type="password"
              placeholder="Your API secret"
              value={formData.apiSecret}
              onChange={handleInputChange}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Keep this secret safe - do not share publicly
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="isActiveCloudinary"
              name="isActive"
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  isActive: e.target.checked,
                }));
              }}
              className="h-4 w-4 rounded border-gray-300"
            />
            <Label htmlFor="isActiveCloudinary" className="cursor-pointer">
              Enable email service on this site
            </Label>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Saving..." : "Save Configuration"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
