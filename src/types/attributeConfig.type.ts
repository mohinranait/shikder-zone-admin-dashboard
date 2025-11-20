export type TAttributeConfigType = {
    _id?:string;
    attribute: string; 
    name: string; 
    slug: string; 
    status?: "Active" | "Inactive"; 
    createdAt?: Date;
    updatedAt?: Date;
  }