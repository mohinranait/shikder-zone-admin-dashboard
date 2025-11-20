import { Bell, Mail, Menu } from "lucide-react";

import React, { FC } from "react";
import ProfileDropdown from "../headers/ProfileDropdown";
type Props = {
  setIsToggle: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
};
const AdminHeader: FC<Props> = ({ setIsToggle, setIsMobileMenu }) => {
  return (
    <header className="h-[60px]  bg-white z-10 px-3 top-0 sticky w-full flex justify-between items-center">
      {/* Desktop menu icon */}
      <Menu
        className="cursor-pointer hidden md:block"
        onClick={() => setIsToggle((prev) => !prev)}
      />
      {/* Mobile Menu icon */}
      <Menu
        className="cursor-pointer  md:hidden"
        onClick={() => setIsMobileMenu(true)}
      />
      <ul className="flex gap-2 items-center">
        {/* Notification Icon */}
        <li>
          <div className="w-10 cursor-pointer h-10 relative flex items-center justify-center rounded-full bg-slate-100">
            <Bell size={18} />
            <span className="px-1 text-xs font-semibold text-white rounded-full bg-primary absolute -top-1 -right-1">
              9+
            </span>
          </div>
        </li>
        {/* Email Icon */}
        <li>
          <div className="w-10 cursor-pointer h-10 relative flex items-center justify-center rounded-full bg-slate-100">
            <Mail size={18} />
            <span className="px-1 text-xs font-semibold text-white rounded-full bg-primary absolute -top-1 -right-1">
              9+
            </span>
          </div>
        </li>
        {/* Profile Dropdown */}
        <li>
          <ProfileDropdown />
        </li>
      </ul>
    </header>
  );
};

export default AdminHeader;
