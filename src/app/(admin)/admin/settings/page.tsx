"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import BasicInfoSection from "@/components/pages/settings/BasicInfoSection";
import BrandingSection from "@/components/pages/settings/BrandingSection";
import MetadataSection from "@/components/pages/settings/MetadataSection";
import SocialMediaSection from "@/components/pages/settings/SocialMediaSection";
import { instance } from "@/hooks/useAxios";
import { ISetting } from "@/types/setting.type";

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [savingTab, setSavingTab] = useState<string | null>(null);
  //   const { toast } = useToast();
  const [formData, setFormData] = useState<ISetting>({
    storeName: "",
    storeEmail: "",
    storePhone: "",
    storeDescription: "",
    brandColor: "#000000",
    logo: { url: "" },
    metadata: {
      title: "",
      description: "",
      keywords: [],
    },
    socialMedia: {
      facebook: "",
      instagram: "",
      twitter: "",
      linkedin: "",
      youtube: "",
      tiktok: "",
      pinterest: "",
    },
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
    },
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const res = await instance.get(`/settings`);
      const data = res.data;
      console.log({ data });

      if (data.success) {
        setFormData(data.payload);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);

      toast.error(`Failed to load settings`);
    } finally {
      setIsLoading(false);
    }
  };

  console.log({ formData });

  const handleSaveTab = async (tabName: string) => {
    try {
      setSavingTab(tabName);
      const res = await instance.post("/settings", { ...formData });
      const data = res.data;
      console.log({ data });

      if (data.success) {
        setFormData(data.payload);
        toast.success(`${tabName} saved successfully`);
      } else {
        throw new Error("Failed to save settings");
      }
    } catch (error) {
      console.error("Error saving settings:", error);

      toast.error(`Failed to save ${tabName}`);
    } finally {
      setSavingTab(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Store Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your ecommerce store configuration
        </p>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="metadata">SEO</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
        </TabsList>

        {/* Basic Information Tab */}
        <TabsContent value="basic" className="space-y-4">
          <BasicInfoSection formData={formData} setFormData={setFormData} />
          <Button
            onClick={() => handleSaveTab("Basic Information")}
            disabled={savingTab === "Basic Information"}
            size="lg"
          >
            {savingTab === "Basic Information" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Basic Info"
            )}
          </Button>
        </TabsContent>

        {/* Branding Tab */}
        <TabsContent value="branding" className="space-y-4">
          <BrandingSection formData={formData} setFormData={setFormData} />
          <Button
            onClick={() => handleSaveTab("Branding")}
            disabled={savingTab === "Branding"}
            size="lg"
          >
            {savingTab === "Branding" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Branding"
            )}
          </Button>
        </TabsContent>

        {/* Metadata Tab */}
        <TabsContent value="metadata" className="space-y-4">
          <MetadataSection formData={formData} setFormData={setFormData} />
          <Button
            onClick={() => handleSaveTab("SEO & Metadata")}
            disabled={savingTab === "SEO & Metadata"}
            size="lg"
          >
            {savingTab === "SEO & Metadata" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save SEO Settings"
            )}
          </Button>
        </TabsContent>

        {/* Social Media Tab */}
        <TabsContent value="social" className="space-y-4">
          <SocialMediaSection formData={formData} setFormData={setFormData} />
          <Button
            onClick={() => handleSaveTab("Social Media")}
            disabled={savingTab === "Social Media"}
            size="lg"
          >
            {savingTab === "Social Media" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Social Media"
            )}
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
