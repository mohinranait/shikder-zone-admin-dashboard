export type TDealForm = {
  dealName: string;
  slug: string;
  status: boolean;
  dealDesign: "grid" | "slider";
  startDate: Date | undefined;
  endDate: Date | undefined;
};



export type TDels = TDealForm & {
    _id: string;
    createdAt: Date ,
    updatedAt: Date ,
}
