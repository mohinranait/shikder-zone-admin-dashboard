"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import SectionForm from "./section-from";
import { TSection } from "@/types/section.type";
import { getAllSections } from "@/actions/sectionApi";
import { Plus } from "lucide-react";
import SingleRow from "./SingleRow";
import { Skeleton } from "@/components/ui/skeleton";

const SectionComponent = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [sections, setSections] = useState<TSection[]>([]);
  const [isModal, setIsModal] = useState(false);

  const [selectedSection, setSelectedSection] = useState<TSection | null>(null);

  useEffect(() => {
    setIsFetching(true);
    (async () => {
      const response = await getAllSections();
      if (response?.success) {
        setSections(response.payload?.sections || []);
      }
    })();
    setIsFetching(false);
  }, []);

  return (
    <div>
      <div className="">
        <div className="flex items-center mb-3 justify-between">
          <div className="flex flex-col">
            <div className="font-semibold tracking-tight text-xl">
              Manage sections
            </div>
            <div className="text-sm text-muted-foreground">
              Manage section for displaying products in home page
            </div>
          </div>
          <div>
            <Button type="button" onClick={() => setIsModal(true)}>
              <Plus /> Create Section
            </Button>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        {isFetching && (
          <div className="space-x-4">
            <Skeleton className="h-12  rounded" />
            <div className="mt-4 grid grid-cols-6 gap-4">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        )}
        {sections?.map((sec, index) => {
          return (
            <SingleRow
              key={index}
              section={sec}
              setSections={setSections}
              selectedSection={(section: TSection) =>
                setSelectedSection(section)
              }
              openModal={() => setIsModal(true)}
            />
          );
        })}
      </div>

      <SectionForm
        open={isModal}
        closeModal={setIsModal}
        selectedSection={selectedSection}
        setSections={setSections}
      />
    </div>
  );
};

export default SectionComponent;
