"use client";
import React, { useState } from "react";
import { Bell, CreditCard, Edit, Lock, LogOut, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TUserType } from "@/types/user.type";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { logoutUser } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
import { userLogout } from "@/actions/authApi";
import ProfileInformation from "./ProfileInformation";
import SecurityComponent from "./SecurityComponent";

const ProfileComponent = ({ user }: { user: TUserType }) => {
  // Redux State
  const dispatch = useAppDispatch();
  const { user: authUser } = useAppSelector((state) => state.auth);

  const [activeMenu, setActiveMenu] = useState<"profile" | "security">(
    "profile"
  );

  const router = useRouter();

  // Logout function
  const logout = async () => {
    try {
      const data = await userLogout();
      if (data?.success) {
        dispatch(logoutUser());
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className=" lg:min-w-[300px]  ">
          <div className="rounded-lg border bg-card text-card-foreground relative shadow">
            <ul className="p-6 pt-0 grid gap-5">
              <p className="text-xs px-3 py-1 capitalize rounded-xl bg-primary mt-3 font-semibold text-white absolute  text-center">
                {user?.role}
              </p>
              <div className="py-5 border-b border-slate-100 px-2">
                <div className="w-[120px] h-[120px] mx-auto relative">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white border-slate-100 border shadow absolute bottom-4 -right-2 ring-2 ring-primary cursor-pointer ">
                    <Edit size={16} />
                  </span>
                  <Image
                    src={"/images/avater.jpg"}
                    width={120}
                    height={120}
                    alt="Avater"
                    className="w-[120px] h-[120px] ring-2 ring-offset-2 ring-primary rounded-full mx-auto"
                  />
                </div>

                <p className="text-lg mt-3  font-semibold text-gray-950  text-center">
                  {user?.name?.firstName} {user?.name?.lastName}
                </p>
                <p className="text-sm text-gray-600 text-center">
                  {user?.email}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => setActiveMenu("profile")}
                  className={` ${
                    activeMenu === "profile" && "bg-gray-100"
                  } relative hover:bg-gray-100 cursor-pointer flex  select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 `}
                >
                  <User size={16} />
                  My Profile
                </button>

                <button
                  onClick={() => setActiveMenu("security")}
                  className={` ${
                    activeMenu === "security" && "bg-gray-100"
                  } relative hover:bg-gray-100 cursor-pointer flex  select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 `}
                >
                  <Lock size={16} />
                  Security
                </button>

                <Link
                  href={"/"}
                  className="relative hover:bg-gray-100 cursor-pointer flex  select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 "
                >
                  <Bell size={16} />
                  Notification
                </Link>

                <Link
                  href={"/"}
                  className="relative hover:bg-gray-100 cursor-pointer flex  select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 "
                >
                  <CreditCard size={16} />
                  Billing
                </Link>

                {authUser?._id === user?._id && (
                  <button
                    type="button"
                    onClick={() => logout()}
                    className="relative hover:bg-gray-100 cursor-pointer flex  select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 "
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                )}
              </div>
            </ul>
          </div>
        </div>
        <div className=" lg:w-full flex flex-col gap-4">
          {activeMenu === "profile" ? (
            <ProfileInformation user={user} />
          ) : (
            <SecurityComponent user={user} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
