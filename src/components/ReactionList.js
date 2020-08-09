import React from 'react'
import { Button } from 'react-bootstrap'

const ReactionList = ({ blog, handleReaction, type }) => {
  return (
    <div>
      {Object.keys(blog.reactions).map((reaction) => {
        let numReaction = blog.reactions[reaction]
        return (
          <Button className='mr-2' size='sm' key={`${reaction}-${blog.id}`} onClick={() => handleReaction(type, reaction, blog)}>
            {numReaction} {reaction}
          </Button>
        )
      })}
    </div>
  )
}

export default ReactionList
