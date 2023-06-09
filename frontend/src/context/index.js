import { configureStore } from '@reduxjs/toolkit'
import reloadBlogSlice from './reloadBlog'
import reloadCommentSlice from './reloadComment'

export const store = configureStore({
    reducer: {
        reloadBlog: reloadBlogSlice,
        reloadComment: reloadCommentSlice,
    },
})