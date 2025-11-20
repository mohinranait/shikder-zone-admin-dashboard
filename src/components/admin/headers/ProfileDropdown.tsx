"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { LogOut, ShoppingCart, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { logoutUser } from "@/redux/features/authSlice";
import { userLogout } from "@/actions/authApi";

const ProfileDropdown = () => {
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();
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
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div className="flex gap-1 pl-3 py-1 cursor-pointer items-center lg:bg-primary rounded-[60px]">
          <span className="hidden lg:block text-white">
            {user?.name?.firstName}
          </span>
          <div className="w-8 h-8 rounded-full">
            <Image
              src={"/images/avater.jpg"}
              width={36}
              height={36}
              alt="Avater"
              className="w-8 h-8 rounded-full ring-primary ring-2 ring-offset-2"
            />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>
          <div className="pt-3 mb-2">
            <Image
              src={"/images/avater.jpg"}
              width={70}
              height={70}
              alt="Avater"
              className="w-16 mb-3 h-16 mx-auto rounded-full ring-primary ring-2 ring-offset-2"
            />
            <p className="text-center font-semibold text-slate-900">
              {user?.name?.firstName} {user?.name?.lastName}
            </p>
            <p className="text-gray-600 text-sm font-normal text-center">
              mahir@gmail.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => router.push("/admin/profile")}
          className="cursor-pointer"
        >
          <User /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <ShoppingCart /> Billing
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => logout()} className="cursor-pointer">
          <LogOut /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
