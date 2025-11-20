import { instance } from "@/hooks/useAxios";

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