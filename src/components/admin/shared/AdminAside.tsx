"use client";
import {
  Calendar,
  CreditCard,
  Image as ImageIcon,
  LayoutDashboard,
  ShoppingBasket,
  Users,
  Waypoints,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
type Props = {
  isToggle: boolean;
  setIsToggle: React.Dispatch<React.SetStateAction<boolean>>;
};
const AdminAside: FC<Props> = ({ isToggle }) => {
  const pathname = usePathname();
  const menus = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      link: "/admin/dashboard",
    },
    {
      name: "E-commarce",
      icon: <ShoppingBasket size={20} />,
      children: [
        { name: "Orders", link: "/admin/orders" },
        { name: "Customers", link: "/admin/customers" },
        { name: "Setting", link: "#" },
      ],
    },
    {
      name: "Products",
      icon: <CreditCard size={20} />,
      children: [
        { name: "All Products", link: "/admin/all-products" },
        { name: "New Product", link: "/admin/product" },
        { name: "Attribute", link: "/admin/attribute" },
        { name: "Categorys", link: "/admin/categorys" },
        { name: "Brands", link: "/admin/brands" },
      ],
    },
    {
      name: "Meida",
      icon: <ImageIcon size={20} />,
      link: "/admin/media",
    },
    {
      name: "Section",
      icon: <Waypoints size={20} />,
      link: "/admin/section",
    },
    {
      name: "Users",
      icon: <Users size={20} />,
      link: "/admin/user",
    },
    {
      name: "Calendar",
      icon: <Calendar size={20} />,
      link: "#",
    },
  ];

  return (
    <>
      {/* Sidebar for admin dashbaord */}
      <Sidebar collapsed={isToggle} toggled={true} className="bg-white">
        <div className="pl-5 h-[60px] z-10 flex bg-white items-center ">
          {isToggle ? (
            <span className="text-xl font-bold">BC</span>
          ) : (
            <Link
              href={"/admin/dashboard"}
              className="text-2xl  font-extralight"
            >
              CollectionBD
            </Link>
          )}
        </div>
        <Menu
          closeOnClick={true}
          className={`overflow-y-auto h-[calc(100vh-60px)]  scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-gray-100 bg-white`}
        >
          {menus.map((menu, index) => {
            if (menu.children) {
              const isActiveParent = menu.children.some(
                (child) => pathname === child.link
              );

              return (
                <SubMenu
                  key={index}
                  icon={menu.icon}
                  label={menu.name}
                  defaultOpen={isActiveParent}
                  className={` bg-white z-10 ${
                    isActiveParent ? "text-primary" : "text-gray-600"
                  }`}
                >
                  {menu.children.map((child, index) => {
                    const isActive = pathname === child.link;
                    return (
                      <MenuItem
                        key={index}
                        component={<Link href={child.link} />}
                        className={` bg-white text-base ${
                          isActive ? "text-primary" : "text-gray-600"
                        }`}
                      >
                        {child.name}
                      </MenuItem>
                    );
                  })}
                </SubMenu>
              );
            } else {
              const isActive = pathname === menu.link;
              return (
                <MenuItem
                  key={index}
                  icon={menu.icon}
                  component={<Link href={menu.link} />}
                  className={isActive ? "text-primary " : "text-gray-600"}
                >
                  {menu.name}
                </MenuItem>
              );
            }
          })}
        </Menu>
      </Sidebar>
    </>
  );
};

export default AdminAside;
