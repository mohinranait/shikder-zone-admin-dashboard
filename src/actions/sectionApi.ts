import { instance } from "@/hooks/useAxios";
import { TSection } from "@/types/section.type";

/**
 * @api {post} Create new section method
*/
export const createNewSection = async (formData:TSection) => {
    const {data} = await instance.post(`/section`, { ...formData  });
    return data;
}



/**
 * @api {get} Get all sections method
*/
export const getAllSections = async () => {
    const {data} = await instance.get(`/sections?accessBy=admin`);
    return data;
}


/**
 * @api {patch} Update section by ID
*/
export const updateSection = async (id:string, formData: Record<string, string|string[]  | boolean >   ) => {
    const {data} = await instance.patch(`/section/${id}`,{...formData});
    return data;
}


