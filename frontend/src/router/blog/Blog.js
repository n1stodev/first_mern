import React from 'react'
import CreateBlog from '../../components/create-blog/CreateBlog'
import Blogs from '../../components/blogs/Blogs'

function Blog() {
    return (
        <div>
            <CreateBlog />
            <Blogs />
        </div>
    )
}

export default Blog