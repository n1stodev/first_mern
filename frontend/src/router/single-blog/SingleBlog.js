import React, { useEffect, useState } from 'react'
import './SingleBlog.css'
import { useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import axios from '../../api'

function SingleBlog() {
    const { id } = useParams()
    const { data, loading } = useFetch(`/blogs/single/${id}`)
    const [comment, setComments] = useState([])
    const [reload, setReload] = useState(false)
    const [msg, setMsg] = useState('')
    useEffect(() => {
        axios.get(`comments/single/${data?._id}`)
            .then(res => {
                setComments(res.data.innerData)
            })
            .catch(err => console.log(err))
    }, [data, reload])
    const handleSubmit = e => {
        e.preventDefault()
        let newComment = {
            msg,
            blogId: data._id
        }
        axios.post('/comments', newComment)
            .then(res => {
                setMsg('')
                setReload(p => !p)
            })
            .catch(err => console.log(err))
    }
    const handleDelete = (id) => {
        axios.delete(`/comments/${id}`)
            .then(res => {
                console.log(res)
                setReload(p => !p)
            }
            )
            .catch(res => console.log(res))
    }
    if (loading) {
        return <div>
            <h2>Loading...</h2>
        </div>
    }
    return (
        <div className='single-blogs' >
            {
                <div className='single_blog' >
                    <h2>{data?.title?.slice(0, 1)}</h2>
                    <h4>{data?.title}</h4>
                    <p>{data?.info}</p>
                    <div className="tags">
                        {
                            data?.tags?.map((e, inx) => (
                                <span className="tag" key={inx}>{e}</span>
                            ))
                        }
                    </div>
                </div>
            }
            <div className='single-blog-comments'>
                <div className="single_comments">
                    {
                        comment?.map(comment =>
                            <div className="comment" key={comment?._id}>
                                <p>{comment?.msg}</p>
                                <button onClick={() => handleDelete(comment._id)}>Delete</button>
                            </div>
                        )
                    }
                </div>
                <form onSubmit={handleSubmit} className="single_comment_form">
                    <input required value={msg} onChange={e => setMsg(e.target.value)} type="text" placeholder='Type your comment' />
                </form>
            </div>
        </div >
    )
}

export default SingleBlog