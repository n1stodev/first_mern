import React, { useState } from 'react'
import axios from '../../api'
import { useDispatch } from 'react-redux'
import { reversePost } from '../../context/reloadPost'
import './CreatePost.css'

const initialState = {
    title: "",
    desc: "",
    url: ""
}

function CreatePost() {
    const [post, setPost] = useState(initialState)
    const [load, setLoad] = useState(false)
    const dispatch = useDispatch()

    const handleSubmit = e => {
        e.preventDefault()
        setLoad(true)
        axios.post("/posts", post)
            .then(res => {
                setPost(initialState)
                dispatch(reversePost())
                console.log(res)
            })
            .catch(res => console.log(res))
            .finally(() => setLoad(false))
    }
    return (
        <div className='create-blog'>
            <h2>Create Post</h2>
            <form action="" onSubmit={handleSubmit}>
                <input required value={post.title} onChange={e => setPost(p => ({ ...p, title: e.target.value }))} type="text" placeholder='Title' />
                <input required value={post.desc} onChange={e => setPost(p => ({ ...p, desc: e.target.value }))} type="text" placeholder='Desc' />
                <input required value={post.url} onChange={e => setPost(p => ({ ...p, url: e.target.value }))} type="text" placeholder='Url' />
                <button disabled={load} type="submit">{load ? "Loading..." : "Create Post"}</button>
            </form>
        </div>
    )
}

export default CreatePost