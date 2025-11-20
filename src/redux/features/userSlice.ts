import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUserType } from "@/types/user.type";



type TInitialStateType = {
  selectedUser: TUserType | null;
  users: TUserType[];
};

type TSetUserType = {
    data: TUserType | TUserType[];
    type: "Array" | "Object";
}

const initialState: TInitialStateType = {
    selectedUser: null,
    users: [],
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TSetUserType> ) => {
      // Update users state
      const {data, type} = action?.payload
      if(type ==='Array'){
        state.users = data as TUserType[]
      }else{
        state.users = [data as TUserType,...state.users]
      }
      
    },
    setUpdateUser: (state, action: PayloadAction<TUserType> ) => {
      // Update selected user 
        const updatedUser = action.payload;
        const index = state.users.findIndex((user) => user?._id === updatedUser?._id);
        state.users[index] = {...state.users[index], ...updatedUser};
    },
    setSelectedUser: (state, action: PayloadAction<TUserType | null>) => {
      // Update selected user state
      state.selectedUser = action?.payload;
    },
  },
});

export const { setUser, setUpdateUser,setSelectedUser } = userSlice.actions;
export default userSlice.reducer;
