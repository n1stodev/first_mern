import React, { useState } from 'react'
import axios from '../../api'
import { useDispatch } from 'react-redux'
import { reverseComment } from '../../context/reloadComment'

const initialState = {
    name: "",
    msg: ""
}

function CreateComment() {
    const [comment, setComment] = useState(initialState)
    const [load, setLoad] = useState(false)
    const dispatch = useDispatch()

    const handleSubmit = e => {
        e.preventDefault()
        setLoad(true)
        axios.post("/comments", comment)
            .then(res => {
                setComment(initialState)
                dispatch(reverseComment())
                console.log(res)
            })
            .catch(res => console.log(res))
            .finally(() => setLoad(false))
    }
    return (
        <div className='create-comment'>
            <h2>Create Comment</h2>
            <form action="" onSubmit={handleSubmit}>
                <input required value={comment.name} onChange={e => setComment(p => ({ ...p, name: e.target.value }))} type="text" placeholder='Name...' />
                <input required value={comment.msg} onChange={e => setComment(p => ({ ...p, msg: e.target.value }))} type="text" placeholder='Message...' />
                <button disabled={load} type="submit">{load ? "Loading..." : "Create Comment"}</button>
            </form>
        </div>
    )
}

export default CreateComment