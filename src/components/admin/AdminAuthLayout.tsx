"use client";
import React, { useEffect, useState } from "react";
import AdminAside from "./shared/AdminAside";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import AdminHeader from "./shared/AdminHeader";
import { X } from "lucide-react";
import withAuth from "@/hooks/withAuth";
import { getAllImages } from "@/actions/mediaApi";
import { setFiles } from "@/redux/features/mediaSlice";
import { useAppDispatch } from "@/hooks/useRedux";
import { getAllCategory } from "@/actions/categoriesApi";
import { addCategory } from "@/redux/features/categorySlice";
import toast from "react-hot-toast";
import { getAllBrands } from "@/actions/brandApi";
import { addBrand } from "@/redux/features/brandSlice";

const AdminAuthLayout = ({ component }: { component: React.ReactNode }) => {
  const [isToggle, setIsToggle] = useState(false);
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const pathName = usePathname();
  const tablate = useMediaQuery({ maxWidth: 768 });
  const dispatch = useAppDispatch();
  // This useEffect call when change route for mobile
  useEffect(() => {
    if (tablate) {
      setIsMobileMenu(false);
    }
  }, [pathName, tablate]);

  // Get all images from DB and store Redux
  useEffect(() => {
    (async function () {
      try {
        // Call API for get images
        const data = await getAllImages();
        if (data.success) {
          dispatch(setFiles(data?.payload?.medias));
        }
      } catch (error) {}
    })();
  }, []);

  useEffect(() => {
    (async function () {
      try {
        const data = await getAllCategory();
        if (data?.success) {
          dispatch(addCategory({ data: data?.payload, type: "Array" }));
        }
      } catch (error: unknown) {
        toast.error(`${error}`);
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    (async function () {
      try {
        // Call API for load all brands
        const data = await getAllBrands();
        if (data?.success) {
          dispatch(addBrand({ data: data?.payload, type: "Array" }));
        }
      } catch (error: unknown) {
        toast.error(`${error}`);
      }
    })();
  }, [dispatch]);
  return (
    <div className="flex  min-h-screen ">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <div className="sticky h-screen  overflow-x-hidden top-0 bottom-0">
          <AdminAside isToggle={isToggle} setIsToggle={setIsToggle} />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`md:hidden transition-all duration-500 fixed  ${
          isMobileMenu ? "translate-x-0" : "-translate-x-full overflow-hidden"
        }  z-[9999]  bottom-0 h-screen top-0  bg-black left-0`}
      >
        <span
          onClick={() => setIsMobileMenu(false)}
          className="absolute top-3 right-3 z-20"
        >
          <X />
        </span>
        <AdminAside isToggle={false} setIsToggle={setIsToggle} />
      </div>

      {/* Main body for admin dashboard */}
      <div className="w-full bg-gray-100 h-full">
        {/* Admin header  */}
        <AdminHeader
          setIsToggle={setIsToggle}
          setIsMobileMenu={setIsMobileMenu}
        />
        {/* Children for render all page here */}
        <div
          className={`min-h-screen  z-0 w-full pt-3 px-3 ${
            !pathName.includes("admin/product") && "mx-auto 2xl:max-w-[1600px]"
          } `}
        >
          {component}
        </div>
      </div>
    </div>
  );
};

export default withAuth(AdminAuthLayout);
