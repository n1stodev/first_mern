import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
}

const reloadBlogSlice = createSlice({
    name: "reloadBlog",
    initialState,
    reducers: {
        reverseBlog: (s) => {
            s.value = !s.value
        }
    }
})

export const { reverseBlog } = reloadBlogSlice.actions
export default reloadBlogSlice.reducer