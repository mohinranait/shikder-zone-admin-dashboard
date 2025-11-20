import { createSlice } from "@reduxjs/toolkit";
import { TBrandType } from "@/types/brand.type";

type TAddBrandPaylaod = {
  data: TBrandType[] | TBrandType;
  type: "Array" | "AddNew" | "Update";
};

type TInitialStateType = {
  selectedBrand: TBrandType | null;
  brands: TBrandType[];
};

const initialState: TInitialStateType = {
    selectedBrand: null,
    brands: [],
};

export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    addBrand: (state, action: { payload: TAddBrandPaylaod }) => {
      // Update brands state
      const { data, type } = action.payload;
      if (type === "AddNew") {
        // When come single brand for add brands array
        state.brands = [...state?.brands, data as TBrandType];
      } else if(type === 'Update'){
        const singleData = data as TBrandType
        const arr = [...state.brands];
        const findIndex = state.brands?.findIndex(d => d?._id === singleData?._id )
        if(findIndex !== -1){
            arr[findIndex] = {
                ...arr[findIndex],
                ...singleData,
            }
            state.brands = arr
            
        }
      } else {
        // When come brands array
        state.brands = [...(data as TBrandType[])];
      }
    },
    setSelectedBrand: (state, action: { payload: TBrandType | null }) => {
      // Update selected brand state
      state.selectedBrand = action?.payload;
    },
  },
});

export const { addBrand, setSelectedBrand } = brandSlice.actions;
export default brandSlice.reducer;
