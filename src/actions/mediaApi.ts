import { instance } from "@/hooks/useAxios";

/**
 * @api {post} Upload image OR File
*/
export const uploadImage = async (formData:FormData) => {
    const { data } = await instance.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
}

/**
 * @api {get} Get all images OR File
*/
export const getAllImages = async () => {
    const {data} = await instance.get(`/media`);
    return data;
}
