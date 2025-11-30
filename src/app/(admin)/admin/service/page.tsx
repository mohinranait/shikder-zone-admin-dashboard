"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Check, Mail, ImageIcon, Zap } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import IntegrationGrid from "@/components/pages/appearence/IntegrationGrid";
import EmailConfigForm from "@/components/pages/appearence/email-config";
import CloudinaryConfigForm from "@/components/pages/appearence/CloudianaryConfig";
import FacebookPixelConfigForm from "@/components/pages/appearence/FacebookPixel";
import { instance } from "@/hooks/useAxios";
import { AppIntegrationType } from "@/types/app.service.type";

export interface IIntegration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: "Connected" | "Disconnected" | "error";
  configured: boolean;
  category: string;
}

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<AppIntegrationType>({});
  const [loading, setLoading] = useState(true);
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(
    null
  );

  console.log({ integrations });

  const connectedApp =
    Object.values(integrations)?.filter(
      (item) => item && typeof item === "object" && item.isActive === true
    )?.length || 0;

  useEffect(() => {
    fetchIntegrations();
  }, []);

  const fetchIntegrations = async () => {
    try {
      setLoading(true);
      const res = await instance.get("/integrations");
      const data = res.data;
      if (data.success) {
        setIntegrations(data.payload?.integrations || {});
      }
    } catch (error) {
      console.error("Failed to fetch integrations:", error);
    } finally {
      setLoading(false);
    }
  };

  const availableIntegrations: IIntegration[] = [
    {
      id: "email",
      name: "Email Service",
      description: "Send transactional emails and newsletters",
      icon: <Mail className="h-8 w-8" />,
      status: integrations?.email?.isActive ? "Connected" : "Disconnected",
      configured: false,
      category: "communication",
    },
    {
      id: "cloudinary",
      name: "Cloudinary",
      description: "Image hosting and optimization",
      icon: <ImageIcon className="h-8 w-8" />,
      status: integrations?.cloudinary?.isActive ? "Connected" : "Disconnected",
      configured: false,
      category: "media",
    },
    {
      id: "facebook-pixel",
      name: "Facebook Pixel",
      description: "Track user behavior and conversions",
      icon: <Zap className="h-8 w-8" />,
      status: integrations?.facebookPixel?.isActive
        ? "Connected"
        : "Disconnected",
      configured: false,
      category: "analytics",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Integrations
        </h1>
        <p className="text-muted-foreground">
          Connect and manage third-party services for your ecommerce business
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Connected Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {connectedApp}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              out of 3 services
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Last Updated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">2h ago</div>
            <p className="text-xs text-muted-foreground mt-1">
              Email service updated
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Webhooks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">5</div>
            <p className="text-xs text-muted-foreground mt-1">
              all operational
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="configure">Configure</TabsTrigger>
          <TabsTrigger value="logs">Activity</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <IntegrationGrid
            integrations={availableIntegrations}
            onSelect={setSelectedIntegration}
          />
        </TabsContent>

        {/* Configure Tab */}
        <TabsContent value="configure" className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Choose an integration from the left panel to configure it. All
              credentials are encrypted and stored securely.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-2">
              {availableIntegrations.map((integration) => (
                <button
                  key={integration.id}
                  onClick={() => setSelectedIntegration(integration.id)}
                  className={cn(
                    "w-full p-4 rounded-lg border transition-all text-left",
                    selectedIntegration === integration.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-primary">{integration.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">
                        {integration.name}
                      </div>
                      <div className="text-xs text-muted-foreground capitalize">
                        {integration.category}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="lg:col-span-2">
              {selectedIntegration === "email" && (
                <EmailConfigForm
                  onSuccess={fetchIntegrations}
                  email={integrations.email}
                />
              )}
              {selectedIntegration === "cloudinary" && (
                <CloudinaryConfigForm
                  onSuccess={fetchIntegrations}
                  cloudinary={integrations.cloudinary}
                />
              )}
              {selectedIntegration === "facebook-pixel" && (
                <FacebookPixelConfigForm
                  onSuccess={fetchIntegrations}
                  facebook={integrations.facebookPixel}
                />
              )}
              {!selectedIntegration && (
                <Card className="border-dashed">
                  <CardContent className="flex items-center justify-center h-64">
                    <p className="text-muted-foreground text-center">
                      Select an integration to configure
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Activity Log Tab */}
        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Recent integration events and changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 pb-4 border-b border-border last:border-0"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <Check className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">
                        Email service configuration updated
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Updated SMTP settings for SendGrid
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
