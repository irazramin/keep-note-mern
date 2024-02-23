import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const slideBarSlice = createSlice({
  name: 'slideBar',
  initialState,
  reducers: {
    isOpen: (state) => {
      state.value = !state.value
    }
  },
})

// Action creators are generated for each case reducer function
export const { isOpen } = slideBarSlice.actions

export default slideBarSlice.reducer