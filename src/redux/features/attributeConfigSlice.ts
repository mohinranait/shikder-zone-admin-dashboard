import { createSlice } from "@reduxjs/toolkit";
import { TAttributeConfigType } from "@/types/attributeConfig.type";

type TAddAttrConfigPaylaod = {
  data: TAttributeConfigType[] | TAttributeConfigType;
  type: "Array" | "AddNew" | "Update";
};

type TInitialStateType = {
  selectedAttributeConfig: TAttributeConfigType | null;
  attributeConfigs: TAttributeConfigType[];
};

const initialState: TInitialStateType = {
    selectedAttributeConfig: null,
    attributeConfigs: [],
};

export const attributeConfigSlice = createSlice({
  name: "attributeConfigs",
  initialState,
  reducers: {
    addAttributeConfig: (state, action: { payload: TAddAttrConfigPaylaod }) => {
      // Update attributes state
      const { data, type } = action.payload;
      if (type === "AddNew") {
        // When come single attribute for add attributes array
        state.attributeConfigs = [...state?.attributeConfigs, data as TAttributeConfigType];
      } else if(type === 'Update'){
        const singleData = data as TAttributeConfigType
        const arr = [...state.attributeConfigs];
        const findIndex = state.attributeConfigs?.findIndex(d => d?._id === singleData?._id )
        if(findIndex !== -1){
            arr[findIndex] = {
                ...arr[findIndex],
                ...singleData,
            }
            state.attributeConfigs = arr
            
        }
      } else {
        // When come attributes array
        state.attributeConfigs = [...(data as TAttributeConfigType[])];
      }
    },
    setSelectedAttributeConfig: (state, action: { payload: TAttributeConfigType | null }) => {
      // Update selected attribute state
      state.selectedAttributeConfig = action?.payload;
    },
  },
});

export const { addAttributeConfig, setSelectedAttributeConfig } = attributeConfigSlice.actions;
export default attributeConfigSlice.reducer;
