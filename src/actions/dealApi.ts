
import { instance } from "@/hooks/useAxios"
import { TDealForm } from "@/types/deal.type";

/**
 * Create deal
*/
export const createDelaMethod = async (formData: TDealForm ) => {
    const {data} = await instance.post('/deal', formData);
    return data
}

/**
 * Get all deals
*/
export const getAllDelas = async () => {
    const {data} = await instance.get('/deals', );
    return data
}
