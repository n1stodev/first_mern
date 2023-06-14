import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
}

const reloadPostSlice = createSlice({
    name: "reloadPost",
    initialState,
    reducers: {
        reversePost: (s) => {
            s.value = !s.value
        }
    }
})

export const { reversePost } = reloadPostSlice.actions
export default reloadPostSlice.reducer