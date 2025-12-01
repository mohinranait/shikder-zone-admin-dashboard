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

export default function SocialMediaSection({
  formData,
  setFormData,
}: SocialMediaSectionProps) {
  const sm = formData.socialMedia || {};

  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Media Links</CardTitle>
        <CardDescription>Connect your social media profiles</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/*  Facebook */}
          <div className="space-y-2">
            <Label htmlFor="facebook" className="flex items-center gap-2">
              <span className="text-lg">f</span> Facebook
            </Label>
            <Input
              id="facebook"
              type="url"
              placeholder="https://facebook.com/yourprofile"
              value={sm.facebook ?? ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialMedia: {
                    ...sm,
                    facebook: e.target.value,
                  },
                })
              }
            />
          </div>

          {/*  Instagram */}
          <div className="space-y-2">
            <Label htmlFor="instagram" className="flex items-center gap-2">
              <span className="text-lg">📸</span> Instagram
            </Label>
            <Input
              id="instagram"
              type="url"
              placeholder="https://instagram.com/yourprofile"
              value={sm.instagram ?? ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialMedia: {
                    ...sm,
                    instagram: e.target.value,
                  },
                })
              }
            />
          </div>

          {/*  Twitter / X */}
          <div className="space-y-2">
            <Label htmlFor="twitter" className="flex items-center gap-2">
              <span className="text-lg">𝕏</span> Twitter (X)
            </Label>
            <Input
              id="twitter"
              type="url"
              placeholder="https://twitter.com/yourprofile"
              value={sm.twitter ?? ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialMedia: {
                    ...sm,
                    twitter: e.target.value,
                  },
                })
              }
            />
          </div>

          {/* LinkedIn */}
          <div className="space-y-2">
            <Label htmlFor="linkedin" className="flex items-center gap-2">
              <span className="text-lg">in</span> LinkedIn
            </Label>
            <Input
              id="linkedin"
              type="url"
              placeholder="https://linkedin.com/in/yourprofile"
              value={sm.linkedin ?? ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialMedia: {
                    ...sm,
                    linkedin: e.target.value,
                  },
                })
              }
            />
          </div>

          {/*  YouTube */}
          <div className="space-y-2">
            <Label htmlFor="youtube" className="flex items-center gap-2">
              <span className="text-lg">▶</span> YouTube
            </Label>
            <Input
              id="youtube"
              type="url"
              placeholder="https://youtube.com/@yourchannel"
              value={sm.youtube ?? ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialMedia: {
                    ...sm,
                    youtube: e.target.value,
                  },
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tiktok" className="flex items-center gap-2">
              <span className="text-lg">♪</span> TikTok
            </Label>
            <Input
              id="tiktok"
              type="url"
              placeholder="https://tiktok.com/@yourprofile"
              value={sm.tiktok ?? ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialMedia: {
                    ...sm,
                    tiktok: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
