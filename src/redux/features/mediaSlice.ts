import { createSlice } from "@reduxjs/toolkit";
import { TMediaType } from "@/types/media.type";


type TUVariant = "Single" | "Multiple"

type TInitialStateType = {
  selectedFile: TMediaType | null;
  selectedFiles: TMediaType[];
  images: TMediaType[];
  isModal: boolean;
  uploadVariant: TUVariant 
  imgUnicName?: string;
};

const initialState: TInitialStateType = {
    selectedFile: null,
    selectedFiles: [],
    images: [],
    isModal:false,
    uploadVariant: 'Single',
    imgUnicName:'',
};

export const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    addFile: (state, action: { payload: TMediaType }) => {
        // Add image in images array
        state.images = [...state?.images, action?.payload];
    },
    addUnicName: (state, action: { payload: string }) => {
        // Image name for upload
        state.imgUnicName = action.payload;
    },
    addVariant: (state, action:{payload:TUVariant}) => {
      // Add Variant for upload Signle image
      // Add Variant for upload Multiple images
      state.uploadVariant = action?.payload
    },
    setFiles:(state, action: { payload: TMediaType[] }) => {
        // Add all images 
        // console.log("Medias files",action.payload);
        
        state.images = [...action.payload];
    },
    setSelectedImage: (state, action: { payload: TMediaType | TMediaType[] }) => {
      // Selected file added here
      if( state.uploadVariant === 'Multiple' ){
        state.selectedFiles = [  ...action.payload as TMediaType[]  ] ;
      }else{
        state.selectedFile = action?.payload as TMediaType ;
      }
    },
    setResetSelected:(state ) => {
      // Empty selected states
      state.selectedFile = null;
      state.selectedFiles = []
    },
    setIsModal : (state , action:{payload:boolean}) => {
      // Modal Open OR Close media modal. 
      // for Select image product,category,brand etc
      state.isModal = action?.payload
    }
  },
});

export const { addFile,addUnicName, setSelectedImage,setFiles,setIsModal,setResetSelected,addVariant } = mediaSlice.actions;
export default mediaSlice.reducer;
