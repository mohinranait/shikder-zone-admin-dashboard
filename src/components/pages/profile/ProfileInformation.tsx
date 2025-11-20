import { updateProfile } from "@/actions/userApi";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setAuthUser } from "@/redux/features/authSlice";
import { TUserType } from "@/types/user.type";
import { Edit2 } from "lucide-react";
import React, { useState } from "react";

type Props = {
  user: TUserType;
};

const ProfileInformation = ({ user }: Props) => {
  // Redux State
  const dispatch = useAppDispatch();
  const { user: authUser } = useAppSelector((state) => state.auth);

  // Local State
  const [isSection, setIsSection] = useState<"profile" | "address" | null>(
    null
  );
  const [profile, setProfile] = useState<TUserType>({
    name: {
      firstName: user?.name?.firstName || "",
      lastName: user?.name?.lastName || "",
    },
    email: user?.email || "",
    phone: user?.phone || "",
    password: user?.password,
    gender: user?.gender || "Male",
    role: user?.role || "User",
    status: user?.status || "Active",
    verify: {
      email: user?.verify?.email ? true : false,
      phone: user?.verify?.phone ? true : false,
    },
  });

  // Update Profile information function
  const handleUpdateProfile = async () => {
    try {
      if (!user?._id) return;
      const data = await updateProfile({
        id: user?._id,
        query: authUser?.role || "User",
        formData: profile,
      });
      console.log({ data });
      if (data?.success) {
        setIsSection(null);
        const { payload } = data;
        if (payload?._id === authUser?._id) {
          // Update Auth User
          dispatch(setAuthUser(payload));
        }
        setProfile(payload);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="rounded-lg border bg-card text-card-foreground shadow">
        <div className="flex flex-col space-y-1.5 p-6 pb-3">
          <div className="flex justify-between items-center">
            <p className="font-semibold leading-none tracking-tight">
              Personal Information
            </p>
            {isSection === "profile" ? (
              <div className="flex gap-2 items-center">
                <Button
                  onClick={() => setIsSection(null)}
                  className="py-1 px-2 rounded h-[30px]"
                  variant={"outline"}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdateProfile}
                  className="py-1 px-3 rounded h-[30px]"
                >
                  Update
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setIsSection("profile")}
                variant={"outline"}
                className="py-1 px-3 rounded h-[30px]"
              >
                <Edit2 /> Edit
              </Button>
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-3 p-6 pt-0  pb-6">
          <div className="flex gap-3">
            <div className="min-w-[200px]">
              <p className="text-slate-400 text-sm">First Name</p>
              {isSection === "profile" ? (
                <input
                  type="text"
                  className="border border-slate-100 py-0 px-1 rounded text-sm  w-full"
                  value={profile.name.firstName}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      name: { ...profile.name, firstName: e.target.value },
                    })
                  }
                />
              ) : (
                <p className="text-slate-800">{profile?.name?.firstName}</p>
              )}
            </div>
            <div>
              <p className="text-slate-400 text-sm">Last Name</p>
              {isSection === "profile" ? (
                <input
                  type="text"
                  className="border border-slate-100 py-0 px-1 rounded text-sm  w-full"
                  value={profile?.name?.lastName}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      name: { ...profile.name, lastName: e.target.value },
                    })
                  }
                />
              ) : (
                <p className="text-slate-800">{profile?.name?.lastName}</p>
              )}
            </div>
          </div>
          <div className="flex gap-3">
            <div className="min-w-[200px]">
              <p className="text-slate-400 text-sm">Email</p>
              <p className="text-slate-800">mahir@gmail.com </p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Phone</p>
              {isSection === "profile" ? (
                <input
                  type="text"
                  className="border border-slate-100 py-0 px-1 rounded text-sm  w-full"
                  value={profile?.phone}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      phone: e.target.value,
                    })
                  }
                />
              ) : (
                <p className="text-slate-800">{profile?.phone}</p>
              )}
            </div>
          </div>
          <div className="flex gap-3">
            <div className="min-w-[200px]">
              <p className="text-slate-400 text-sm">Gender</p>
              {isSection === "profile" ? (
                <select
                  className="border border-slate-100 py-0 px-1 rounded text-sm  w-full"
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      gender: e.target.value as "Male" | "Female" | "Other",
                    }))
                  }
                  name="gender"
                  id="gender"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p className="text-slate-800">{profile?.gender}</p>
              )}
            </div>
            <div className="min-w-[200px]">
              <p className="text-slate-400 text-sm">Acount</p>

              <p
                className={`text-xs px-2 py-[2px] rounded-xl border font-semibold  absolute  text-center ${
                  profile?.status == "Active"
                    ? "bg-green-50 text-green-500 border-green-500"
                    : profile?.status == "Pending"
                    ? "bg-yellow-50 text-yellow-500 border-yellow-500"
                    : "bg-red-50 text-red-500 border-red-500"
                } `}
              >
                {profile?.status}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow">
        <div className="flex flex-col space-y-1.5 p-6 pb-3">
          <div className="flex justify-between items-center">
            <p className="font-semibold leading-none tracking-tight">Address</p>
            <Button
              onClick={() => setIsSection("address")}
              variant={"outline"}
              className="py-1 px-3 h-[30px]"
            >
              <Edit2 /> Edit
            </Button>
          </div>
        </div>
        <div className="flex flex-col space-y-3 p-6 pt-0  pb-6">
          <div className="flex gap-3">
            <div className="min-w-[200px]">
              <p className="text-slate-400 text-sm">Country</p>
              <p className="text-slate-800">Bangladesh </p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">City/State</p>
              <p className="text-slate-800">Dhaka </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="min-w-[200px]">
              <p className="text-slate-400 text-sm">Post Code</p>
              <p className="text-slate-800">8700 </p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">TAX ID</p>
              <p className="text-slate-800">5454SF4 </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInformation;
