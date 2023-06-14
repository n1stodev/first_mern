import React from 'react'
import axios from '../../api'
import './Post.css'
import { BsFillTrashFill, BsPencilFill } from 'react-icons/bs'
import { reversePost } from '../../context/reloadPost'
import { useSelector, useDispatch } from 'react-redux'
import { useFetch } from '../../hooks/useFetch'
import { Link } from 'react-router-dom'

function Post() {
    const reloadPost = useSelector(s => s.reloadPost.value)
    const dispatch = useDispatch()
    const { data, error, loading } = useFetch("/posts", reloadPost)
    const handleDelete = async (id) => {
        await axios.delete(`/posts/${id}`)
            .then(res => {
                dispatch(reversePost())
                console.log(res)
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
        <div className="posts">
            {
                console.log(data.data.innerData)
                    (data.data.innerData).map((data, inx) =>
                        <div className="post" key={data._id}>
                            <div className="actions">
                                <span>
                                    <BsPencilFill />
                                </span>
                                <span>
                                    <BsFillTrashFill onClick={(data) => handleDelete(data._id)} />
                                </span>
                            </div>
                            <Link to={`/single/${data._id}`}>
                                <img src={data.url} alt="" className="post__img" />
                            </Link>
                            <h4 className="post__title">{data.title}</h4>
                            <p className="post__desc">{data.desc}</p>
                        </div>
                    )
            }
        </div >
    )
}

export default Post