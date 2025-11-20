import { instance } from "@/hooks/useAxios";
import { TFormType } from "@/types/order.type";

/**
 * @api {get} Get all orders method
*/
export const getAllOrders = async () => {
    const {data} = await instance.get(`/orders`);
    return data;
}


/**
 * @api {patch} order/:id
 * update order by ID
*/
export const updateOrderById = async ({formData,id}:{formData:TFormType,id:string}) => {
    const {data} = await instance.patch(`/order/${id}`,formData)
    return data;
}