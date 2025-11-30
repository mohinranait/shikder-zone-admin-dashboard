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

interface SocialMediaSectionProps {
  formData: ISetting;
  setFormData: React.Dispatch<React.SetStateAction<ISetting>>;
}

const socialPlatforms = [
  { key: "facebook", label: "Facebook", emoji: "f" },
  { key: "instagram", label: "Instagram", emoji: "📸" },
  { key: "twitter", label: "Twitter", emoji: "𝕏" },
  { key: "linkedin", label: "LinkedIn", emoji: "in" },
  { key: "youtube", label: "YouTube", emoji: "▶" },
  { key: "tiktok", label: "TikTok", emoji: "♪" },
];

export default function SocialMediaSection({
  formData,
  setFormData,
}: SocialMediaSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Media Links</CardTitle>
        <CardDescription>Connect your social media profiles</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {socialPlatforms.map((platform) => (
            <div key={platform.key} className="space-y-2">
              <Label htmlFor={platform.key} className="flex items-center gap-2">
                <span className="text-lg">{platform.emoji}</span>
                {platform.label}
              </Label>
              <Input
                id={platform.key}
                type="url"
                placeholder={`https://${platform.key}.com/yourprofile`}
                value={
                  formData.socialMedia[
                    platform.key as keyof typeof formData.socialMedia
                  ]
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialMedia: {
                      ...formData.socialMedia,
                      [platform.key]: e.target.value,
                    },
                  })
                }
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
