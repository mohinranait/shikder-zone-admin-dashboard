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
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ISetting } from "@/types/setting.type";

interface MetadataSectionProps {
  formData: ISetting;
  setFormData: React.Dispatch<React.SetStateAction<ISetting>>;
}

export default function MetadataSection({
  formData,
  setFormData,
}: MetadataSectionProps) {
  const handleAddKeyword = (keyword: string) => {
    if (keyword.trim()) {
      setFormData({
        ...formData,
        metadata: {
          ...formData.metadata,
          //   keywords: [...formData.metadata.keywords, keyword.trim()],
        },
      });
    }
  };

  const handleRemoveKeyword = (index: number) => {
    setFormData({
      ...formData,
      metadata: {
        ...formData.metadata,
        keywords: formData.metadata.keywords.filter(
          (_: string, i: number) => i !== index
        ),
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO & Metadata</CardTitle>
        <CardDescription>
          Optimize your store for search engines
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="metaTitle">Meta Title</Label>
          <Input
            id="metaTitle"
            placeholder="Your Store - Premium Products"
            value={formData.metadata.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                metadata: { ...formData.metadata, title: e.target.value },
              })
            }
          />
          <p className="text-sm text-muted-foreground">
            {formData.metadata.title.length}/60 characters
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="metaDescription">Meta Description</Label>
          <Textarea
            id="metaDescription"
            placeholder="A brief description of your store that appears in search results..."
            value={formData.metadata.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                metadata: { ...formData.metadata, description: e.target.value },
              })
            }
            rows={3}
          />
          <p className="text-sm text-muted-foreground">
            {formData.metadata.description.length}/160 characters
          </p>
        </div>

        <div className="space-y-3">
          <Label>Keywords</Label>
          <div className="flex gap-2">
            <Input
              id="keywordInput"
              placeholder="Add a keyword and press Enter"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleAddKeyword((e.target as HTMLInputElement).value);
                  (e.target as HTMLInputElement).value = "";
                }
              }}
            />
            <Button
              variant="outline"
              onClick={() => {
                const input = document.getElementById(
                  "keywordInput"
                ) as HTMLInputElement;
                handleAddKeyword(input.value);
                input.value = "";
              }}
            >
              Add
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.metadata.keywords.map(
              (keyword: string, index: number) => (
                <div
                  key={index}
                  className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                >
                  {keyword}
                  <button
                    onClick={() => handleRemoveKeyword(index)}
                    className="hover:opacity-70"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
