import * as types from '../constants/blog.constants'
import api from '../api'
import { alertActions } from '../actions/alert.actions'

//Action includes type and payload
//Middleware: get parameters from UI -> process it -> send blog-request action to reducer
const blogsRequest = () => async (dispatch) => {
  dispatch({ type: types.BLOG_REQUEST, payload: null })

  try {
    const response = await api.get('/blogs');
    dispatch({ type: types.BLOG_REQUEST_SUCCESS, payload: response.data.data })
  } catch (error) {
    dispatch({ type: types.BLOG_REQUEST_FAILURE, payload: error })
  }
}

//Middleware: get parameters from UI -> process it -> send single-blog-request to reducer
const getSingleBlog = (blogId) => async (dispatch) => {
  dispatch({ type: types.GET_SINGLE_BLOG_REQUEST, payload: null });
  try {
    const res = await api.get(`/blogs/${blogId}`);
    dispatch({
      type: types.GET_SINGLE_BLOG_REQUEST_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_SINGLE_BLOG_REQUEST_FAILURE, payload: error });
  }
};

//Middleware: get parameters from UI -> process it -> send create-review-request to reducer
const createReview = (blogId, reviewText) => async (dispatch) => {
  dispatch({ type: types.CREATE_REVIEW_REQUEST, payload: null });
  try {
    const res = await api.post(`/blogs/${blogId}/reviews`, {
      content: reviewText,
    });
    dispatch({
      type: types.CREATE_REVIEW_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.CREATE_REVIEW_FAILURE, payload: error });
  }
};

//Middleware: get parameters from UI -> process it -> send -create-new-blog action to reducer
const createNewBlog = (title, content) => async (dispatch) => {
  dispatch({ type: types.CREATE_BLOG_REQUEST, payload: null })
  try {
    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    const response = await api.post('/blogs', formData)

    dispatch({ type: types.CREATE_BLOG_SUCCESS, payload: response.data.data })
    dispatch(alertActions.setAlert('New blog has been created', "Success"))
  } catch (error) {
    dispatch({ type: types.CREATE_BLOG_FAILURE, payload: error })
  }
}

const updateReaction = (targetType, target, reaction) => async (dispatch) => {
  dispatch({type: types.UPDATE_REACTION_REQUEST, payload: null})
  try{
    const response = await api.post('/reaction', {targetType, target, reaction})
    dispatch({type: types.UPDATE_REACTION_SUCCESS, payload: response.data})
  }catch(error){
    dispatch({type: types.UPDATE_REACTION_FAILURE, payload: error})
  }
}

//Middleware: get parameters from UI -> process it -> send update-blog action to reducer
const updateBlog = (blogId, title, content) => async (dispatch) => {
  dispatch({ type: types.UPDATE_BLOG_REQUEST, payload: null })
  try {
    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    const response = await api.put(`/blogs/${blogId}`, formData)

    dispatch({ type: types.UPDATE_BLOG_SUCCESS, payload: response.data.data })
    dispatch(alertActions.setAlert('The blog has been updated!', 'success'))
  } catch (error) {
    dispatch({ type: types.UPDATE_BLOG_FAILURE, payload: error })
  }
}

//Middleware: get parameters from UI -> process it -> send delete-blog action to reducer
const deleteBlog = (blogId) => async (dispatch) => {
  dispatch({ type: types.DELETE_BLOG_REQUEST, payload: null })
  try {
    const response = await api.delete(`/blogs/${blogId}`)
    dispatch({ type: types.DELETE_BLOG_SUCCESS, payload: response.data })
    dispatch(alertActions.setAlert("The blog has been deleted!", 'success'))
  } catch (error) {
    dispatch({ type: types.DELETE_BLOG_FAILURE, payload: error })
  }
}

//Pack all actions into 1 object for exporting
export const blogActions = {
  blogsRequest,
  getSingleBlog,
  createReview,
  createNewBlog,
  updateBlog,
  deleteBlog,
  updateReaction,
}
