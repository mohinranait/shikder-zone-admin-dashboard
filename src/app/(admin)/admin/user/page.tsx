"use client";
import {
  CalendarIcon,
  Delete,
  Edit,
  Eye,
  PlusIcon,
  Search,
  ShieldCheck,
  ShieldX,
  Trash,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import Image from "next/image";
import { setSelectedUser, setUser } from "@/redux/features/userSlice";
import UpdateUserModal from "@/components/modals/UpdateUserModal";
import { TUserType } from "@/types/user.type";
import DeleteModal from "@/components/modals/DeleteModal";
import { deleteUserById } from "@/actions/userApi";
import toast from "react-hot-toast";

const UserPage = () => {
  // Redux State
  const { users, selectedUser } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  // Local State
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  // Handle delete product by ID
  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      const data = await deleteUserById(selectedUser?._id as string);
      if (data?.success) {
        const arr = [...users];
        const filter = arr?.filter((user) => user?._id !== selectedUser?._id);
        dispatch(setUser({ type: "Array", data: filter }));
        toast.success("Delete successfull");
      } else {
        toast.error("Somthing wrong");
      }
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteLoading(false);
      dispatch(setSelectedUser(null));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xl font-medium">Users</p>
          <p className="text-sm text-slate-500">Manage all users</p>
        </div>
        <Link
          href={"/admin/product"}
          className="border border-slate-100 gap-1 bg-primary text-white rounded-[60px] inline-flex items-center justify-center py-1 text-sm  px-1 pl-2"
        >
          Custom Order
          <span className="inline-flex items-center justify-center p-2 rounded-full w-[30px] h-[30px] bg-white text-slate-900">
            <PlusIcon />
          </span>
        </Link>
      </div>

      <div>
        <div className="w-full mt-4 rounded-lg border-0 bg-card text-card-foreground  shadow">
          <div className="p-6 ">
            <div className=" flex items-center gap-4">
              <div className="relative">
                <Search
                  size={17}
                  className="absolute text-gray-600 left-2 top-2/4 -translate-y-2/4"
                />
                <input
                  type="text"
                  placeholder="Search orders"
                  //   onChange={(e) => setSearch(e.target.value)}
                  //   value={search}
                  className="flex h-9   pl-7 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors   placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0   disabled:opacity-50 md:text-sm"
                />
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-[240px] h-9 justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className=" px-6 overflow-y-auto">
            <div className="min-w-[550px] ">
              <Table className="w-full border  border-slate-200">
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Registered</TableHead>
                    <TableHead className="w-[60px]">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users?.map((user: TUserType, index: number) => {
                    return (
                      <TableRow key={index}>
                        <TableCell className="flex gap-2 py-2 items-center">
                          <div>
                            <Image
                              src={user?.profile || "/images/avater.jpg"}
                              width={60}
                              height={60}
                              alt="Avater"
                              className="w-12 h-12 rounded-full"
                            />
                          </div>
                          <div>
                            <p className="text-gray-800 font-medium">
                              {user?.name?.firstName +
                                " " +
                                user?.name?.lastName}
                            </p>
                            <p className="text-gray-500 text-xs flex gap-1">
                              {user?.email}{" "}
                              <TooltipProvider>
                                {user?.verify?.email ? (
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <ShieldCheck
                                        className="text-green-500 cursor-pointer"
                                        size={14}
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Verifyed</p>
                                    </TooltipContent>
                                  </Tooltip>
                                ) : (
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <ShieldX
                                        className="text-yellow-500 cursor-pointer"
                                        size={14}
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Not Verifyed</p>
                                    </TooltipContent>
                                  </Tooltip>
                                )}
                              </TooltipProvider>
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="py-2">
                          <p className="text-gray-500">
                            {user?.phone || "N/A"}
                          </p>
                        </TableCell>

                        <TableCell className="py-2">
                          <p className="text-gray-500">{user?.role}</p>
                        </TableCell>

                        <TableCell className="py-2">
                          {<UserStatus status={user?.status} />}
                        </TableCell>
                        <TableCell className="py-2">
                          <p className="text-gray-500">
                            {user?.createdAt
                              ? format(user?.createdAt, "MMM dd, yyyy")
                              : "N/A"}
                          </p>
                        </TableCell>
                        <TableCell className="py-2">
                          <div className="flex justify-end gap-2">
                            <Button
                              onClick={() => {
                                setOpen(true);
                                dispatch(setSelectedUser(user));
                              }}
                              className="w-8 h-8"
                              size={"icon"}
                            >
                              <Eye size={22} />
                            </Button>
                            <Button
                              variant={"destructive"}
                              onClick={() => {
                                setIsOpen(true);
                                dispatch(setSelectedUser(user));
                              }}
                              className="w-8 h-8"
                              size={"icon"}
                            >
                              <Trash size={22} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>{" "}
            </div>
          </div>
        </div>
      </div>
      <UpdateUserModal open={open} setOpen={setOpen} />

      <DeleteModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleDelete={handleDelete}
        isLoading={deleteLoading}
      />
    </div>
  );
};

const UserStatus = ({
  status,
}: {
  status: "Active" | "Pending" | "Banned";
}) => {
  const statusColors = {
    Pending: {
      text: "text-yellow-500",
      bg: "bg-yellow-50",
      border: "border-yellow-500",
      circle: "bg-yellow-500",
    },
    Active: {
      text: "text-green-500",
      bg: "bg-green-50",
      border: "border-green-500",
      circle: "bg-green-500",
    },
    Banned: {
      text: "text-red-500",
      bg: "bg-red-50",
      border: "border-red-500",
      circle: "bg-red-500",
    },
  };

  const color = statusColors[status];

  return (
    <span
      className={`text-xs px-[6px] py-[2px] rounded-3xl inline-flex gap-1 items-center border ${color.border} ${color.bg} ${color.text}`}
    >
      <span className={`w-2 h-2 rounded-full ${color.circle}`}></span> {status}
    </span>
  );
};

export default UserPage;
