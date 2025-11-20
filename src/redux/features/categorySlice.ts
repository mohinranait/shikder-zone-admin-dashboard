import { createSlice } from "@reduxjs/toolkit";
import { TCategoryType } from "@/types/category.type";

type TAddCategorPaylaod = {
  data: TCategoryType[] | TCategoryType;
  type: "Array" | "AddNew" | "Update"
};

type TInitialStateType = {
  selectedCategory: TCategoryType | null;
  categories: TCategoryType[];
};

const initialState: TInitialStateType = {
  selectedCategory: null,
  categories: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory: (state, action: { payload: TAddCategorPaylaod }) => {
      // Update categories state
      const { data, type } = action.payload;

      if (type === "AddNew") {
        // When come single category for add categories array
        state.categories = [...state?.categories, data as TCategoryType];
      } else if(type === 'Update'){
        const singleData = data as TCategoryType
        const arr = [...state.categories];
        const findIndex = state.categories?.findIndex(d => d?._id === singleData?._id )
        if(findIndex !== -1){
            arr[findIndex] = {
                ...arr[findIndex],
                ...singleData,
            }
            state.categories = arr
            
        }
      } else {
        // When come categoris array
        state.categories = [...(data as TCategoryType[])];
      }
    },
    setSelectedCategory: (state, action: { payload: TCategoryType | null }) => {
      // Update selectedCategory state
      state.selectedCategory = action?.payload;
    },
  },
});

export const { addCategory, setSelectedCategory } = categorySlice.actions;
export default categorySlice.reducer;
