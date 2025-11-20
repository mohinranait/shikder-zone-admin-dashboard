import { instance } from "@/hooks/useAxios";
import { TBrandForm } from "@/types/brand.type";

/**
 * @api {post} Create new brand method
*/
export const createNewBrand = async (formData: TBrandForm) => {
    const {data} = await instance.post(`/brand`, { ...formData  });
    return data;
}

/**
 * @api {get} Get all brands method
*/
export const getAllBrands = async () => {
    const {data} = await instance.get(`/brands?accessBy=user`);
    return data;
}

/**
 * @api {patch} Update brand by ID
*/
export const updateBrand = async (id:string, formData: Record<string, string|number|Date| string[]>   ) => {
    const {data} = await instance.patch(`/brand/${id}`,{...formData});
    return data;
}

/**
 * @api {delete} Delete brand by ID method
*/
export const deleteBrand = async (id:string) => {
    const {data} = await instance.delete(`/brand/${id}`);
    return data;
}