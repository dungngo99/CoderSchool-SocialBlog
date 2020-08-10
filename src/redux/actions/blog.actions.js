import * as types from "../constants/blog.constants";
import api from "../api";
import { alertActions } from "../actions/alert.actions";

//Action includes type and payload
//Middleware: get parameters from UI -> process it -> send blog-request action to reducer
const blogsRequest = (pageNum) => async (dispatch) => {
  dispatch({ type: types.BLOG_REQUEST, payload: null });

  try {
    const response = await api.get(`/blogs?limit=9&page=${pageNum}`);
    dispatch({ type: types.BLOG_REQUEST_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({ type: types.BLOG_REQUEST_FAILURE, payload: error });
  }
};

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
    await api.post(`/blogs/${blogId}/reviews`, { content: reviewText });
    const res = await api.get(`/blogs/${blogId}`);
    dispatch({
      type: types.CREATE_REVIEW_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.CREATE_REVIEW_FAILURE, payload: error });
  }
};

//Middleware: get parameters from UI -> process it -> send -create-new-blog action to reducer
const createNewBlog = (title, content, images) => async (dispatch) => {
  dispatch({ type: types.CREATE_BLOG_REQUEST, payload: null })
  try {
    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    for(let i=0; i<images.length; i++) formData.append('imagesUpload', images[i])

    const response = await api.post('/blogs', formData)

    dispatch({ type: types.CREATE_BLOG_SUCCESS, payload: response.data.data });
    dispatch(alertActions.setAlert("New blog has been created", "Success"));
  } catch (error) {
    dispatch({ type: types.CREATE_BLOG_FAILURE, payload: error });
  }
};

//Middleware: update parameters from UI -> process it -> send update-reaction action to reducer
const updateReactionBlog = (targetType, target, reaction) => async (
  dispatch
) => {
  dispatch({ type: types.UPDATE_REACTION_BLOG_REQUEST, payload: null });
  try {
    await api.post("/reaction", { targetType, target, reaction });
    const response = await api.get(`/blogs/${target}`);

    dispatch({
      type: types.UPDATE_REACTION_BLOG_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: types.UPDATE_REACTION_BLOG_FAILURE, payload: error });
  }
};

//Middleware: update parameters from UI -> process it -> send update-reaction action to reducer
const updateReactionReview = (targetType, target, reaction, blogId) => async (
  dispatch
) => {
  dispatch({ type: types.UPDATE_REACTION_REVIEW_REQUEST, payload: null });
  try {
    await api.post("/reaction", { targetType, target, reaction });
    const response = await api.get(`/blogs/${blogId}`);
    dispatch({
      type: types.UPDATE_REACTION_REVIEW_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: types.UPDATE_REACTION_REVIEW_FAILURE, payload: error });
  }
};

//Middleware: get parameters from UI -> process it -> send update-blog action to reducer
const updateBlog = (blogId, title, content, images) => async (dispatch) => {
  dispatch({ type: types.UPDATE_BLOG_REQUEST, payload: null })
  try {
    const formData = new FormData()
    for (let i=0; i< images.length; i++) formData.append('imagesUpload', images[i]) 

    await api.post(`/blogs/${blogId}/images`, formData)
    const response = await api.put(`/blogs/${blogId}`, {title: title, content: content})

    dispatch({ type: types.UPDATE_BLOG_SUCCESS, payload: response.data.data });
    dispatch(alertActions.setAlert("The blog has been updated!", "success"));
  } catch (error) {
    dispatch({ type: types.UPDATE_BLOG_FAILURE, payload: error });
  }
};

//Middleware: get parameters from UI -> process it -> send delete-blog action to reducer
const deleteBlog = (blogId) => async (dispatch) => {
  dispatch({ type: types.DELETE_BLOG_REQUEST, payload: null });
  try {
    const response = await api.delete(`/blogs/${blogId}`);
    dispatch({ type: types.DELETE_BLOG_SUCCESS, payload: response.data });
    dispatch(alertActions.setAlert("The blog has been deleted!", "success"));
  } catch (error) {
    dispatch({ type: types.DELETE_BLOG_FAILURE, payload: error });
  }
};

//Middleware: get parameters from UI -> process it -> send get-all-users action to reducer
const getUsers = () => async (dispatch) => {
  dispatch({type: types.GET_USERS_REQUEST, payload: null})
  try{
    let response = await api.get('/users/all?limit=20&page=1')
    dispatch({type: types.GET_USERS_SUCCESS, payload: response.data})
  }catch(error){
    dispatch({type: types.GET_USERS_FAILURE, payload: error})
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
  updateReactionBlog,
  updateReactionReview,
  getUsers,
}
