import React from 'react'
import {Card} from 'react-bootstrap'
import Moment from 'react-moment';

const BlogCard = ({handleClick, blog}) => {
  return (
    <Card onClick={() => handleClick(blog._id)}>
      <Card.Img variant="top" src="https://via.placeholder.com/160x100" />
      <Card.Body>
  <Card.Title>{blog.title}</Card.Title>
        <Card.Text>
          {blog.content}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted"time> <Moment fromNow>{blog.updatedAt}</Moment></small>
      </Card.Footer>
    </Card>
  )
}

export default BlogCard
