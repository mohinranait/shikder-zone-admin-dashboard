import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import GlobalModal from "../modals/global-modal";
import { createDelaMethod } from "@/actions/dealApi";
import toast from "react-hot-toast";
import { TDealForm } from "@/types/deal.type";

type Props = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
};
const DealForm = ({ closeModal, open }: Props) => {
  const [forms, setForms] = useState<TDealForm>({
    dealName: "",
    slug: "",
    dealDesign: "grid",
    status: true,
    startDate: undefined,
    endDate: undefined,
  });

  const handleSubmit = async () => {
    console.log({ forms });
    try {
      const res = await createDelaMethod(forms);
      if (res.success) {
        toast.success(res.message);
        resetForm();
        closeModal(false);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const resetForm = () => {
    setForms({
      dealName: "",
      slug: "",
      endDate: undefined,
      startDate: undefined,
      status: true,
      dealDesign: "grid",
    });
  };

  return (
    <GlobalModal
      modalTile="Create Deal"
      open={open}
      onClose={() => {
        closeModal(false);
      }}
      footers={
        <div className="flex items-center  pt-0">
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50  bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full"
          >
            Save
          </button>
        </div>
      }
    >
      <form className=" grid gap-5">
        <div className="grid gap-2">
          <label
            htmlFor="title"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Deal name
          </label>
          <input
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            id="title"
            placeholder="Title"
            value={forms?.dealName}
            onChange={(e) => setForms({ ...forms, dealName: e.target.value })}
          />
        </div>

        <div className="grid gap-2">
          <label
            htmlFor="status"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Status
          </label>

          <Select
            value={forms?.status === true ? "true" : "false"}
            onValueChange={(e) => setForms({ ...forms, status: e === "true" })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Parent not select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={`true`} className="cursor-pointer">
                Active
              </SelectItem>
              <SelectItem value={`false`} className="cursor-pointer">
                Inactive
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <label
            htmlFor="start_date"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Start date
          </label>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                data-empty={!forms?.startDate}
                className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
              >
                <CalendarIcon />
                {forms?.startDate ? (
                  format(forms?.startDate, "PPP")
                ) : (
                  <span>Pick start date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={forms?.startDate}
                onSelect={(e) => setForms({ ...forms, startDate: e })}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid gap-2">
          <label
            htmlFor="start_date"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            End date
          </label>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                data-empty={!forms?.endDate}
                className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
              >
                <CalendarIcon />
                {forms?.endDate ? (
                  format(forms?.endDate, "PPP")
                ) : (
                  <span>Pick end date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={forms?.endDate}
                onSelect={(e) => setForms({ ...forms, endDate: e })}
              />
            </PopoverContent>
          </Popover>
        </div>
      </form>
    </GlobalModal>
  );
};

export default DealForm;
