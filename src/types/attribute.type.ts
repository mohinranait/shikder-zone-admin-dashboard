export type TAttributeType = {
    _id?: string;
    name: string; 
    slug: string; 
    status?: "Active" | "Inactive"; 
    createdAt?: Date;
    updatedAt?: Date;
}