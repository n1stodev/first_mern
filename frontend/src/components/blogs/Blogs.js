import React, { useState, useEffect } from 'react'
import axios from '../../api'
import './Blogs.css'
import { BsFillTrashFill, BsPencilFill } from 'react-icons/bs'
import { reverseBlog } from '../../context/reloadBlog'
import { useSelector, useDispatch } from 'react-redux'
import { useFetch } from '../../hooks/useFetch'

function Blogs() {
    const reloadBlog = useSelector(s => s.reloadBlog.value)
    const dispatch = useDispatch()
    const { data, error, loading } = useFetch("/blogs", reloadBlog)
    const handleDelete = async (id) => {
        await axios.delete(`/blogs/${id}`)
            .then(res =>
                dispatch(reverseBlog()))
            .catch(res => console.log(res))
    }
    return (
        <div className="blogs">
            {
                data.map((data, inx) =>
                    <div className="blog" key={data._id}>
                        <div className="actions">
                            <span>
                                <BsPencilFill />
                            </span>
                            <span>
                                <BsFillTrashFill onClick={(data) => handleDelete(data._id)} />
                            </span>
                        </div>
                        <h4 className="title">{data.title}</h4>
                        <p className="info">{data.info}</p>
                        <div className="tags">
                            {
                                data.tags.map((e, inx) =>
                                    <span className='tag' key={inx}>
                                        {e}
                                    </span>
                                )
                            }
                        </div>
                    </div>
                )}
        </div>
    )
}

export default Blogs