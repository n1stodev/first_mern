import React, { useState } from 'react'
import axios from '../../api'
import { useDispatch } from 'react-redux'
import { reverseBlog } from '../../context/reloadBlog'

const initialState = {
    title: "",
    info: "",
    tags: []
}

function CreateBlog() {
    const [blog, setBlog] = useState(initialState)
    const [load, setLoad] = useState(false)
    const dispatch = useDispatch()

    const handleSubmit = e => {
        e.preventDefault()
        setLoad(true)
        blog.tags = blog.tags
            .split(",")
            .filter(e => e.trim())
            .map(e => "#" + e.trim())
        axios.post("/blogs", blog)
            .then(res => {
                setBlog(initialState)
                dispatch(reverseBlog())
                console.log(res)
            })
            .catch(res => console.log(res))
            .finally(() => setLoad(false))
    }
    return (
        <div className='create-blog'>
            <h2>Create Blog</h2>
            <form action="" onSubmit={handleSubmit}>
                <input required value={blog.title} onChange={e => setBlog(p => ({ ...p, title: e.target.value }))} type="text" placeholder='title' />
                <input required value={blog.info} onChange={e => setBlog(p => ({ ...p, info: e.target.value }))} type="text" placeholder='info' />
                <input required value={blog.tags} onChange={e => setBlog(p => ({ ...p, tags: e.target.value }))} type="text" placeholder='tags' />
                <button disabled={load} type="submit">{load ? "Loading..." : "Create Blog"}</button>
            </form>
        </div>
    )
}

export default CreateBlog