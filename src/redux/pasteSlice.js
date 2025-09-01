import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

export const pasteSlice = createSlice({
  name: 'paste',
  initialState: {
    pastes: localStorage.getItem("pastes")
      ? JSON.parse(localStorage.getItem("pastes"))
      : []
  },
  reducers: {
    addToPastes: (state,action) => {
      const paste = action.payload
      const index = state.pastes.findIndex((item) => item._id === paste._id)

      if (index >= 0) {
        // If the course is already in the Pastes, do not modify the quantity
        toast.error("Paste already exist")
        return
      }
      // If the course is not in the Pastes, add it to the Pastes
      state.pastes.push(paste)
      
      // Update to localstorage
      localStorage.setItem("pastes", JSON.stringify(state.pastes))
      // show toast
      toast.success("Paste added")
    },
    
    updateToPastes: (state,action) => {
      const paste = action.payload
      const index = state.pastes.findIndex((item) => item._id === paste._id)

      if (index >= 0) {
        // If the course is found in the Pastes, update it
        state.pastes[index] = paste
        // Update to localstorage
        localStorage.setItem("pastes", JSON.stringify(state.pastes))
        // show toast
        toast.success("Paste updated")
      }
    },

    removeFromPastes:(state,action)=>{
      const pasteId = action.payload

      console.log(pasteId)
      const index = state.pastes.findIndex((item) => item._id === pasteId)

      if (index >= 0) {
        // If the course is found in the Pastes, remove it
        state.pastes.splice(index, 1)
        // Update to localstorage
        localStorage.setItem("pastes", JSON.stringify(state.pastes))
        // show toast
        toast.success("Paste deleted")
      }
    },

     resetAllPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },
  }
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, removeFromPastes, resetAllPastes } = pasteSlice.actions

export default pasteSlice.reducer