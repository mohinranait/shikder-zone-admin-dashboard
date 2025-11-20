import { createSlice } from "@reduxjs/toolkit";
import { TAttributeType } from "@/types/attribute.type";

type TAddAttributePaylaod = {
  data: TAttributeType[] | TAttributeType;
  type: "Array" | "AddNew" | "Update";
};

type TInitialStateType = {
  selectedAttribute: TAttributeType | null;
  attributes: TAttributeType[];
};

const initialState: TInitialStateType = {
    selectedAttribute: null,
    attributes: [],
};

export const attributeSlice = createSlice({
  name: "attribute",
  initialState,
  reducers: {
    addAttribute: (state, action: { payload: TAddAttributePaylaod }) => {
      // Update attributes state
      const { data, type } = action.payload;
      if (type === "AddNew") {
        // When come single attribute for add attributes array
        state.attributes = [...state?.attributes, data as TAttributeType];
      } else if(type === 'Update'){
        const singleData = data as TAttributeType
        const arr = [...state.attributes];
        const findIndex = state.attributes?.findIndex(d => d?._id === singleData?._id )
        if(findIndex !== -1){
            arr[findIndex] = {
                ...arr[findIndex],
                ...singleData,
            }
            state.attributes = arr
            
        }
      } else {
        // When come attributes array
        state.attributes = [...(data as TAttributeType[])];
      }
    },
    setSelectedAttribute: (state, action: { payload: TAttributeType | null }) => {
      // Update selected attribute state
      state.selectedAttribute = action?.payload;
    },
  },
});

export const { addAttribute, setSelectedAttribute } = attributeSlice.actions;
export default attributeSlice.reducer;
