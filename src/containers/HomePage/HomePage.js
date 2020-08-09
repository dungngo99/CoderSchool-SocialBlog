import React, { useEffect } from "react";
import BlogCard from "../../components/BlogCard";
import { Container, Jumbotron, CardColumns, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { blogActions } from "../../redux/actions/blog.actions";
import ClipLoader from "react-spinners";

//HomePage component
const HomePage = () => {
  const loading = useSelector((state) => state.loading);
  const blogs = useSelector((state) => state.blog.blogs);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  //Dispatch to send actions to redux reducer
  const dispatch = useDispatch();

  //history to redirect to next or previous page
  const history = useHistory();

  //Call Middleware action get all pages when component did mount for the first time
  useEffect(() => {
    dispatch(blogActions.blogsRequest());
  }, [dispatch]);

  //Function to redirect to a specific blog
  const handleClick = (id) => {
    history.push(`/blogs/${id}`);
  };

  return (
    <div className="all-home">
      <Container className="bg-homemain">
        <Jumbotron className="text-center bg-home">
          <h1 className="T-Blog">T - Blog</h1>
          <p>Write about your amazing experiences.</p>
          {isAuthenticated && (
            <Link to="/blog/add">
              <Button variant="warning">Write now</Button>
            </Link>
          )}
        </Jumbotron>

        <CardColumns>
          {loading
            ? <ClipLoader color="#f86c6b" size={150} loading={loading}></ClipLoader>
            : <div>
              {blogs
                ? (blogs.map((blog) => <BlogCard blog={blog} key={blog._id} handleClick={handleClick}></BlogCard>))
                : (<p>There are no blogs</p>)
              }
            </div>
          }
        </CardColumns>
      </Container>
    </div>
  );
};

export default HomePage;
