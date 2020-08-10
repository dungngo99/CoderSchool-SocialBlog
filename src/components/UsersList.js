import React from 'react'
import {Button } from 'react-bootstrap'
import './style.css'

const UsersList = ({ users }) => {
  return (
    <div>
      <h2>All users</h2>
      <div className='row'>
        {users.map((user, index) => {
          return (
            <div className='user-card col-md-2' key={`${user._id}-${index}`}>
              <img src={user.avatar.url} className='user-image' alt='...' />
              <div>
                <p style={{'margin':'0px'}}>{user.name}</p>
                <Button size='sm' variant="link">Add</Button>
                <Button size='sm' variant="link">Cancel</Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default UsersList
