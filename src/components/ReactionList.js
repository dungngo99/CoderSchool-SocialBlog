import React from 'react'
import { Button } from 'react-bootstrap'

const ReactionList = ({ load, handleReaction, type }) => {
  return (
    <div>
      {Object.keys(load.reactions).map((reaction) => {
        let numReaction = load.reactions[reaction]
        return (
          <Button className='mr-2' size='sm' key={`${type}-${reaction}-${load.id}`} onClick={() => handleReaction(type, reaction, load)}>
            {numReaction} {reaction}
          </Button>
        )
      })}
    </div>
  )
}

export default ReactionList
