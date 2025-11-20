import { instance } from "@/hooks/useAxios";
import { TUserType } from "@/types/user.type";

/**
 * User login method
*/
export const userLogin = async (formData:{email:string;password:string}) => {
    const {data} = await instance.post(`/user/login`, { ...formData  });
    return data;
}

/**
 * User logout method
*/
export const userLogout = async () => {
    const {data} = await instance.post(`/user/logout`);
    return data;
}

/**
 * Update profile By ID
*/
export const updateProfile = async ({id,query,formData}:{id:string;query:string;formData:TUserType}) => {
    const {data} = await instance.patch(`/user/${id}?accessBy=${query}`,{...formData});
    return data;
}

/**
 * Update profile By ID
*/
export const changePassword = async (formData:{password:string;userId:string}) => {
    const {data} = await instance.patch(`/change-password`,{...formData});
    return data;
}

/**
 * Get All User method 
*/
export const getAllUserFromDB = async () => {
    const {data} = await instance.get(`/users`);
    return data;
}

/**
 * Delete User method 
*/
export const deleteUserById = async (userId:string) => {
    const {data} = await instance.delete(`/user/${userId}`);
    return data;
}
