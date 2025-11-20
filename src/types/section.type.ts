export type TSection  = {
    _id?: string;
    name: string;
    status: boolean;
    type: 'grid' | 'carousel';
    products: string[];
}