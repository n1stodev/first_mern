import React from 'react'
import Comments from '../../components/comments/Comment'
import CreateComment from '../../components/createComment/CreateComment'

function Comment() {
    return (
        <div>
            <CreateComment />
            <Comments />
        </div>
    )
}

export default Comment