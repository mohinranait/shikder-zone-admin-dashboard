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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Check } from "lucide-react";
import { instance } from "@/hooks/useAxios";
import { AppIntegrationType } from "@/types/app.service.type";

interface EmailConfigFormProps {
  onSuccess?: () => void;
  email: AppIntegrationType["email"];
}

export default function EmailConfigForm({
  onSuccess,
  email,
}: EmailConfigFormProps) {
  const [provider, setProvider] = useState("SMTP");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    provider: "smtp",
    smtpEmail: "",
    senderName: "",
    smtpPassword: "",
    isActive: false,
    lastUpdated: new Date().toISOString(),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await instance.post("/integrations/email", { ...formData });
      const data = res.data;
      if (data?.success) {
        setSuccess(true);
        onSuccess?.();
      }
    } catch (error) {
      console.error("Failed to save config:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email) {
      setFormData({
        provider: email.provider || "smtp",
        smtpEmail: email.smtpEmail || "",
        senderName: email.senderName || "",
        smtpPassword: email.smtpPassword || "",
        isActive: email.isActive || false,
        lastUpdated: email.lastUpdated || new Date().toISOString(),
      });
    }
  }, [email]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Configuration</CardTitle>
        <CardDescription>
          Set up your email service provider for transactional emails
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {success && (
          <Alert className="bg-green-50 border-green-200">
            <Check className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Email configuration saved successfully
            </AlertDescription>
          </Alert>
        )}

        <div>
          <Label className="text-base font-medium mb-3 block">
            Email Provider
          </Label>
          <Tabs value={provider} onValueChange={setProvider}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="SMTP">SMTP</TabsTrigger>
              <TabsTrigger value="mailgun">Mailgun</TabsTrigger>
              <TabsTrigger value="ses">AWS SES</TabsTrigger>
            </TabsList>

            <TabsContent value="SMTP" className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="smtpEmail">Sender Email</Label>
                  <Input
                    id="smtpEmail"
                    name="smtpEmail"
                    type="email"
                    placeholder="noreply@example.com"
                    value={formData.smtpEmail}
                    onChange={handleInputChange}
                    required
                  />

                  <p className="text-xs text-muted-foreground mt-1">
                    Get your passwrod from SMTP dashboard
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="smtpPassword">SMTP Password</Label>
                    <Input
                      id="smtpPassword"
                      name="smtpPassword"
                      type="password"
                      placeholder="SG.xxxxxxxxxxxxxx"
                      value={formData.smtpPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="sender_name">Sender Name</Label>
                    <Input
                      id="sender_name"
                      name="senderName"
                      placeholder="Your Store Name"
                      value={formData.senderName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    id="isActiveEmail"
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
                  <Label htmlFor="isActiveEmail" className="cursor-pointer">
                    Enable email service on this site
                  </Label>
                </div>

                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save Configuration"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="mailgun" className="space-y-4">
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Configure Mailgun settings
                </p>
              </div>
            </TabsContent>

            <TabsContent value="ses" className="space-y-4">
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Configure AWS SES settings
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}
