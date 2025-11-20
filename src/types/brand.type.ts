
export type TBrandForm = {
    name: string;
    slug: string;
    brandBanner?: string;
    brandThumbnail?: string;
    status: "Active" | "Inactive";
}

export type TBrandType = {
    _id: string;
    name: string;
    slug: string;
    brandBanner?: string;
    brandThumbnail?: string;
    status: "Active" | "Inactive";
    totalProduct: number;
    categoryIds: string[];
    createdAt?: Date;
    updatedAt?: Date;
}