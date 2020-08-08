import * as types from '../constants/blog.constants'
import api from '../api'
import {alertActions} from '../actions/alert.actions'

const blogsRequest = () => async (dispatch) => {
  dispatch({type: types.BLOG_REQUEST, payload: null})

  try{
    const response = await api.get('/blogs');
    dispatch({type: types.BLOG_REQUEST_SUCCESS, payload: response.data.data})
  }catch (error){
    dispatch({type: types.BLOG_REQUEST_FAILURE, payload: error})
  }
}

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

const createNewBlog = (title, content) => async (dispatch) => {
  dispatch({type: types.CREATE_BLOG_REQUEST, payload: null})
  try{
    const response = await api.post('/blogs', title, content)

    dispatch({type: types.CREATE_BLOG_SUCCESS, payload: response.data.data})
    dispatch(alertActions.setAlert('New blog has been created', "Success"))
  }catch (error){
    dispatch({type: types.CREATE_BLOG_FAILURE, payload: error})
  }
}

const updateBlog = (blogId, title, content) => async (dispatch) => {
  dispatch({type: types.UPDATE_BLOG_REQUEST, payload: null})
  try{
    const response = await api.post(`/blogs/${blogId}`, title, content)

    dispatch({type: types.UPDATE_BLOG_SUCCESS, payload: response.data.data})
    dispatch(alertActions.setAlert('The blog has been updated!', 'success'))
  }catch(error){
    dispatch({type: types.UPDATE_BLOG_FAILURE, payload: error})
  }
}

const deleteBlog = (blogId) => async (dispatch) => {
  dispatch({type: types.DELETE_BLOG_REQUEST, payload: null})
  try{
    const response = await api.delete(`/blogs/${blogId}`)
    dispatch({type: types.DELETE_BLOG_SUCCESS, payload: response.data})
    dispatch(alertActions.setAlert("The blog has been deleted!", 'success'))
  }catch (error){
    dispatch({type: types.DELETE_BLOG_FAILURE, payload: error})
  }
}

export const blogActions = {
  blogsRequest,
  getSingleBlog,
  createReview,
  createNewBlog,
  updateBlog,
  deleteBlog,
}
