import React, {useEffect, useState} from 'react'
import {Button} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {useParams, Link} from 'react-router-dom'
import {blogActions} from '../../redux/actions/blog.actions'
import {ClipLoader} from 'react-spinners'
import Moment from 'react-moment'
import Markdown from 'react-markdown'
import ReviewList from '../../components/ReviewList'
import ReviewBlog from '../../components/ReviewBlog'
import ReactionList from '../../components/ReactionList'

//BlogPagedDetail component
const BlogDetailPage = () => {
  //Variable to parse url
  const params = useParams()

  //Dispatch to send action to redux reducer
  const dispatch = useDispatch()

  //Global state: get from redux store (attribute blog)
  const blog = useSelector((state) => state.blog.selectedBlog)
  const loading = useSelector((state) => state.blog.loading)
  const currentUser = useSelector((state) => state.auth.user)
  const submitReviewLoading = useSelector((state) => state.blog.submitReviewLoading);

  //Global state: get from redux store (attribute auth)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  //Local state: store user's input information
  const [reviewText, setReviewText] = useState("");

  //Update local state with new input when user is typing
  const handleInputChange = (e) => {
    setReviewText(e.target.value);
  };

  //Function to call Middleware action to create new blog and then send action to redux reducer
  const handleSubmitReview = (e) => {
    e.preventDefault();
    dispatch(blogActions.createReview(blog._id, reviewText));
    setReviewText("");
  };

  const handleReaction = (type, reaction) => {
    console.log(blog.id)
    dispatch(blogActions.updateReaction(type, blog.id, reaction))
  }

  const handleReactionReview = (type, reaction, review) => {
    console.log(review._id)
    dispatch(blogActions.updateReaction(type, review._id, reaction))
  }

  //Function to get a specific blog when there is id in url
  useEffect(() =>{
    if (params?.id){
      dispatch(blogActions.getSingleBlog(params.id))
    }
  }, [dispatch, params])

  return (
    <>
      {loading 
      ? (<ClipLoader color="#f86c6b" size={150} loading={loading} />) 
      : (
          <div className ="position-reaction">
            {blog && (
              <div className="mb-5">
                <h1 className ="style-title-detail">{blog.title}</h1>
                <span className="text-muted">
                  <i>@{blog?.user?.name} wrote{" "}</i>
                  <Moment fromNow>{blog.createdAt}</Moment>
                </span>
                <hr />
                <Markdown className ="style-content-detail" source={blog.content} />
                <ReactionList blog={blog} handleReaction={handleReaction} type={'Blog'}></ReactionList>
                <hr />
                {/* <ReviewList reviews={blog.reviews} handleReactionReview={handleReactionReview} type={'Review'}/> */}
              </div>
            )}

            {blog && (currentUser?._id === blog?.user?._id ? (
              <Link to={`/blog/edit/${blog._id}`}>
                <Button variant="primary">Edit</Button>
              </Link>
            ) : (
                <span className="text-muted">
                  @{blog?.user?.name} wrote{" "}
                  <Moment fromNow>{blog.createdAt}</Moment>
                </span>
              ))}

            {isAuthenticated && (
              <ReviewBlog
                reviewText={reviewText}
                handleInputChange={handleInputChange}
                handleSubmitReview={handleSubmitReview}
                loading={submitReviewLoading}
              />
            )}
          </div>
        )}
    </>
  );
}

export default BlogDetailPage
