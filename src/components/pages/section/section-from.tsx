import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import GlobalModal from "@/components/modals/global-modal";
import { TSection } from "@/types/section.type";
import {
  createNewSection,
  getAllSections,
  updateSection,
} from "@/actions/sectionApi";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

type Props = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  selectedSection: TSection | null;
  setSections: React.Dispatch<React.SetStateAction<TSection[]>>;
};
const SectionForm = ({
  closeModal,
  open,
  selectedSection,
  setSections,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [forms, setForms] = useState<TSection>({
    name: "",
    type: "grid",
    status: true,
    products: [],
  });

  const handleSubmit = async () => {
    setIsLoading(true);

    if (selectedSection?._id) {
      try {
        const response = await updateSection(selectedSection?._id, forms);

        if (response?.success) {
          resetForm();
          closeModal(false);

          const response = await getAllSections();
          if (response?.success) {
            setSections(response.payload?.sections || []);
          }
        }
      } catch (error) {}
    } else {
      try {
        const response = await createNewSection(forms);
        if (response?.success) {
          resetForm();
          closeModal(false);
          const response = await getAllSections();
          if (response?.success) {
            setSections(response.payload?.sections || []);
          }
        }
      } catch (error) {
        console.log({ error });
      }
    }
    setIsLoading(false);
  };

  const resetForm = () => {
    setForms({
      name: "",
      type: "grid",
      status: true,
      products: [],
    });
  };

  useEffect(() => {
    if (selectedSection) {
      setForms(selectedSection);
    }
  }, [selectedSection]);

  return (
    <GlobalModal
      modalTile="Create Deal"
      open={open}
      onClose={() => {
        closeModal(false);
      }}
      footers={
        <div className="flex items-center  pt-0">
          <Button
            disabled={isLoading}
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50  bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full"
          >
            {isLoading && <LoaderCircle className="animate-spin" />}
            Save
          </Button>
        </div>
      }
    >
      <form className=" grid gap-5">
        <div className="grid gap-2">
          <label
            htmlFor="title"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Name
          </label>
          <input
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            id="title"
            placeholder="Title"
            value={forms?.name}
            onChange={(e) => setForms({ ...forms, name: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <label
              htmlFor="status"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Status
            </label>

            <Select
              value={forms?.status === true ? "true" : "false"}
              onValueChange={(e) =>
                setForms({ ...forms, status: e === "true" })
              }
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
              htmlFor="type"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Section type
            </label>

            <Select
              value={forms?.type}
              onValueChange={(e) =>
                setForms({ ...forms, type: e as "grid" | "carousel" })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Parent not select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={`grid`} className="cursor-pointer">
                  Grid
                </SelectItem>
                <SelectItem value={`carousel`} className="cursor-pointer">
                  Carousel
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </form>
    </GlobalModal>
  );
};

export default SectionForm;
