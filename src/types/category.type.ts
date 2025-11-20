
// This type for categories
export type TCategoryType = {
    _id?: string;
    name: string; 
    slug: string; 
    productCount?: string;
    parent?: string | null; 
    catBanner?: string | null; 
    catThumbnail?: string | null; 
    catIcon?: string; 
    status: "Active" | "Inactive"; 
    createdAt?: Date,
    updatedAt?: Date,
};