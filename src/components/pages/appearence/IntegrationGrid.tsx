"use client";

import type React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, AlertCircle, Clock } from "lucide-react";
import { IIntegration } from "@/app/(admin)/admin/service/page";

interface IntegrationGridProps {
  integrations: IIntegration[];
  onSelect?: (id: string) => void;
}

export default function IntegrationGrid({
  integrations,
  onSelect,
}: IntegrationGridProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Connected":
        return <Check className="h-4 w-4 text-green-500" />;
      case "Error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Connected":
        return "bg-green-100 text-green-800";
      case "Error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {integrations.map((integration) => (
        <Card
          key={integration.id}
          className="hover:shadow-lg transition-shadow"
        >
          <CardHeader>
            <div className="flex items-start justify-between mb-3">
              <div className="text-primary">{integration.icon}</div>
              <Badge className={getStatusColor(integration.status)}>
                <span className="flex items-center gap-1">
                  {getStatusIcon(integration.status)}
                  {integration.status}
                </span>
              </Badge>
            </div>
            <CardTitle className="text-lg">{integration.name}</CardTitle>
            <CardDescription>{integration.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => onSelect?.(integration.id)}
              variant={integration.configured ? "outline" : "default"}
              className="w-full"
            >
              {integration.configured ? "Manage" : "Connect"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
