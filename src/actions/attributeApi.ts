import { instance } from "@/hooks/useAxios";
import { TAttributeType } from "@/types/attribute.type";

/**
 * @api {post} Create new attribute method
*/
export const createNewAttribute = async (formData: TAttributeType) => {
    const {data} = await instance.post(`/attribute`, { ...formData  });
    return data;
}

/**
 * @api {get} Get all attributes method
*/
export const getAllAttributes = async () => {
    const {data} = await instance.get(`/attributes`);
    return data;
}

/**
 * @api {get} Get single attributes BY ID
*/
export const getSingleAttributes = async (id:string) => {
    const {data} = await instance.get(`/attribute/${id}`);
    return data;
}

/**
 * @api {patch} Update attribute by ID
*/
export const updateAttribute = async (id:string, formData:TAttributeType  ) => {
    const {data} = await instance.patch(`/attribute/${id}`,{...formData});
    return data;
}

/**
 * @api {delete} Delete attribute by ID method
*/
export const deleteAttribute = async (id:string) => {
    const {data} = await instance.delete(`/attribute/${id}`);
    return data;
}