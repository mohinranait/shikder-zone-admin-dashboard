import { instance } from "@/hooks/useAxios";
import { TProduct } from "@/types/product.type";

/**
 * @api {post} Create new product method
*/
export const createNewProduct = async (formData: TProduct) => {
    const {data} = await instance.post(`/product`, { ...formData  });
    return data;
}

/**
 * @api {get} Get all products method
*/
export const getAllProducts = async (query:string) => {
    const {data} = await instance.get(`/products${query && '?'+query }`);
    return data;
}

/**
 * @api {get}  Get Single product by Slug method
*/
export const getSingleProductBySlug = async (slug:string) => {
    const {data} = await instance.get(`/view-product/${slug}`);
    return data;
}

/**
 * @api {patch} Update prdouct by ID
*/
export const updateProduct = async (id:string, formData:TProduct  ) => {
    const {data} = await instance.patch(`/product/${id}`,{...formData});
    return data;
}

/**
 * @api {delete} Delete product by ID method
*/
export const deleteProduct = async (id:string) => {
    const {data} = await instance.delete(`/product/${id}`);
    return data;
}