import { createSlice } from '@reduxjs/toolkit';
import '../main.jsx'
import toast from 'react-hot-toast';

const getInitialPastes = () => {
  try {
    const stored = localStorage.getItem("pastes");
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Failed to parse localStorage pastes:", e);
    localStorage.removeItem("pastes"); // clear corrupted data
    return [];
  }
};
 
const initialState = {
  pastes: getInitialPastes()
};


export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste created successfully");
    },
    updateToPastes: (state,action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if(index >= 0){
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("paste updated");
      }
    },
    resetAllPastes: (state, action) => { 
      state.pastes=[];
      localStorage.removeItem("pastes");
    },
    removeFromPastes: (state,action) => {
      const pasteId = action.payload;

      console.log(pasteId);
      const index = state.pastes.findIndex((item) => item._id === pasteId);
      if(index >= 0){
        state.pastes.splice(index,1);
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("paste deleted");
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer