import { instance } from "@/hooks/useAxios";
import { TAttributeConfigType } from "@/types/attributeConfig.type";

/**
 * @api {post} Create new attribute config method
*/
export const createNewAttributeConfig = async (formData: TAttributeConfigType) => {
    const {data} = await instance.post(`/config-attribute`, { ...formData  });
    return data;
}

/**
 * @api {get} Get all attributes configs method
*/
export const getAllAttributeConfigs = async () => {
    const {data} = await instance.get(`/config-attributes`);
    return data;
}

/**
 * @api {patch} Update attribute cofig by ID
*/
export const updateAttributeConfig = async (id:string, formData:TAttributeConfigType  ) => {
    const {data} = await instance.patch(`/config-attribute/${id}`,{...formData});
    return data;
}

/**
 * @api {delete} Delete attribute by ID method
*/
export const deleteAttributeConfig = async (id:string) => {
    const {data} = await instance.delete(`/config-attribute/${id}`);
    return data;
}