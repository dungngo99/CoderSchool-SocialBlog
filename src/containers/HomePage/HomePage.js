import React, { useEffect } from 'react'
import BlogCard from '../../components/BlogCard'
import { Container, Jumbotron, CardColumns, Button } from 'react-bootstrap'
import { useSelector, useDispatch} from 'react-redux'
import {useHistory, Link} from 'react-router-dom'
import { blogActions } from '../../redux/actions/blog.actions'
import ClipLoader from 'react-spinners'

const HomePage = () => {
  const loading = useSelector((state) => state.loading)
  const blogs = useSelector((state) => state.blog.blogs)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(blogActions.blogsRequest())
  }, [dispatch])

  const handleClick = (id) => {
    history.push(`/blogs/${id}`)
  }

  return (
    <Container>
      <Jumbotron className="text-center">
        <h1>Social Blog</h1>
        <p>Write about your amazing experiences.</p>
        {isAuthenticated && (
          <Link to="/blog/add">
            <Button variant="primary">Write now</Button>
          </Link>
        )}
      </Jumbotron>
      <CardColumns>
        {loading ? <ClipLoader color="#f86c6b" size={150} loading={loading} ></ClipLoader> :
          <>
            {blogs ?
              blogs.map((blog) => <BlogCard blog={blog} key={blog._id} handleClick={handleClick}></BlogCard>) :
              <p>There are no blogs</p>
            }
          </>
        }
      </CardColumns>
    </Container>
  )
}

export default HomePage
