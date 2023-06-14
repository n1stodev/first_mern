import { configureStore } from '@reduxjs/toolkit'
import reloadBlogSlice from './reloadBlog'
import reloadCommentSlice from './reloadComment'
import reloadPostSlice from './reloadPost'

export const store = configureStore({
    reducer: {
        reloadBlog: reloadBlogSlice,
        reloadComment: reloadCommentSlice,
        reloadPost: reloadPostSlice,
    },
})