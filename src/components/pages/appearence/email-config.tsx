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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Check } from "lucide-react";

interface EmailConfigFormProps {
  onSuccess?: () => void;
}

export default function EmailConfigForm({ onSuccess }: EmailConfigFormProps) {
  const [provider, setProvider] = useState("sendgrid");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    sendgrid_api_key: "",
    sender_email: "",
    sender_name: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/integrations/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider, ...formData }),
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
              <TabsTrigger value="sendgrid">SendGrid</TabsTrigger>
              <TabsTrigger value="mailgun">Mailgun</TabsTrigger>
              <TabsTrigger value="ses">AWS SES</TabsTrigger>
            </TabsList>

            <TabsContent value="sendgrid" className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="sendgrid_api_key">API Key</Label>
                  <Input
                    id="sendgrid_api_key"
                    name="sendgrid_api_key"
                    type="password"
                    placeholder="SG.xxxxxxxxxxxxxx"
                    value={formData.sendgrid_api_key}
                    onChange={handleInputChange}
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Get your API key from SendGrid dashboard
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sender_email">Sender Email</Label>
                    <Input
                      id="sender_email"
                      name="sender_email"
                      type="email"
                      placeholder="noreply@example.com"
                      value={formData.sender_email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="sender_name">Sender Name</Label>
                    <Input
                      id="sender_name"
                      name="sender_name"
                      placeholder="Your Store Name"
                      value={formData.sender_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
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
