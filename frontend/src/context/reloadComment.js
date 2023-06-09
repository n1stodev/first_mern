import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
}

const reloadCommentSlice = createSlice({
    name: "reloadComment",
    initialState,
    reducers: {
        reverseComment: (s) => {
            s.value = !s.value
        }
    }
})

export const { reverseComment } = reloadCommentSlice.actions
export default reloadCommentSlice.reducer