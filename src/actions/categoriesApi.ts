import { instance } from "@/hooks/useAxios";
import { TCategoryType } from "@/types/category.type";

/**
 * @api {post} Create new category method
*/
export const createNewCategory = async (formData: TCategoryType) => {
    const {data} = await instance.post(`/category`, { ...formData  });
    return data;
}

/**
 * @api {get} Get all categories method
*/
export const getAllCategory = async () => {
    const {data} = await instance.get(`/categories?accessBy=admin`);
    return data;
}

/**
 * @api {patch} Update category by ID
*/
export const updateCategory = async (id:string, formData:TCategoryType  ) => {
    const {data} = await instance.patch(`/category/${id}`,{...formData});
    return data;
}

/**
 * @api {delete} Delete category by ID method
*/
export const deleteCategory = async (id:string) => {
    const {data} = await instance.delete(`/category/${id}`);
    return data;
}