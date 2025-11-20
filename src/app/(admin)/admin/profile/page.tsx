"use client";
import ProfileComponent from "@/components/pages/profile/ProfileComponent";
import { useAppSelector } from "@/hooks/useRedux";

import React from "react";

const ProfilePage = () => {
  const { user } = useAppSelector((state) => state.auth);
  if (!user) return null;
  return <ProfileComponent user={user} />;
};

export default ProfilePage;
