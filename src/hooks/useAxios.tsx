import axios from "axios";
export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true,
});

const useAxios = () => {
  return instance;
};

export default useAxios;
