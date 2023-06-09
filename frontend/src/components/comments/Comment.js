import React, { useState, useEffect } from 'react'
import axios from '../../api'
import './Comment.css'
import { BsFillTrashFill, BsPencilFill } from 'react-icons/bs'
import { reverseComment } from '../../context/reloadComment'
import { useSelector, useDispatch } from 'react-redux'

function Comments() {
    const [data, setData] = useState([])
    const reloadComment = useSelector(s => s.reloadComment.value)
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get("/comments", data)
            .then(res => {
                setData(res.data.innerData)
                dispatch(reverseComment())
            })
            .catch(res => console.log(res))
    }, [reloadComment]);

    const handleDelete = async (id) => {
        console.log(id);
        await axios.delete(`/comments/${id}`)
            .then(res => {
                console.log(res)
                console.log("succesfully deleted")
                dispatch(reloadComment())
            })
            .catch(res => console.log(res))
    }
    return (
        <div className="blogs">
            {
                data.map(e =>
                    <div className="blog comment" key={e._id}>
                        <div className="actions">
                            <span>
                                <BsPencilFill />
                            </span>
                            <span>
                                <BsFillTrashFill onClick={() => handleDelete(e._id)} />
                            </span>
                        </div>
                        <div className="name">{(e.name).slice(0, 1)}</div>
                        <h4 className="title">{e.name}</h4>
                        <p className="info">{e.msg}</p>
                    </div>
                )}
        </div>
    )
}

export default Comments