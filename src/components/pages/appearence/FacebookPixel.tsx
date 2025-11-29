"use client";

import type React from "react";
import { useState } from "react";
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

interface FacebookPixelConfigFormProps {
  onSuccess?: () => void;
}

export default function FacebookPixelConfigForm({
  onSuccess,
}: FacebookPixelConfigFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    pixel_id: "",
    access_token: "",
    enable_tracking: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/integrations/facebook-pixel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Facebook Pixel Configuration</CardTitle>
        <CardDescription>
          Track user behavior and conversions with Facebook Pixel
        </CardDescription>
      </CardHeader>
      <CardContent>
        {success && (
          <Alert className="bg-green-50 border-green-200 mb-4">
            <Check className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Facebook Pixel configuration saved successfully
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="pixel_id">Pixel ID</Label>
            <Input
              id="pixel_id"
              name="pixel_id"
              placeholder="Your Facebook Pixel ID"
              value={formData.pixel_id}
              onChange={handleInputChange}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Found in your Facebook Business Manager
            </p>
          </div>

          <div>
            <Label htmlFor="access_token">Access Token</Label>
            <Input
              id="access_token"
              name="access_token"
              type="password"
              placeholder="Your access token"
              value={formData.access_token}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              id="enable_tracking"
              name="enable_tracking"
              type="checkbox"
              checked={formData.enable_tracking}
              onChange={handleInputChange}
              className="h-4 w-4 rounded border-gray-300"
            />
            <Label htmlFor="enable_tracking" className="cursor-pointer">
              Enable tracking on this site
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
