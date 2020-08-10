import * as types from '../constants/blog.constants'

//Initialize the global state of blog. This state must include every attribute that reducer will use
const initialState = {
  blogs: [],
  loading: false,
  selectedBlog: null,
  submitReviewLoading: false,
  redirectTo: '',
}

const blogReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case types.BLOG_REQUEST:
      return { ...state, loading: true }
    case types.BLOG_REQUEST_SUCCESS:
      return { ...state, blogs: payload, loading: false }
    case types.BLOG_REQUEST_FAILURE:
      console.log(payload)
      return { ...state, loading: false }
  
    case types.GET_SINGLE_BLOG_REQUEST:
      return { ...state, loading: true };
    case types.GET_SINGLE_BLOG_REQUEST_SUCCESS:
      return { ...state, selectedBlog: payload, loading: false };
    case types.GET_SINGLE_BLOG_REQUEST_FAILURE:
      return { ...state, loading: false };

    case types.CREATE_REVIEW_REQUEST:
      return { ...state, submitReviewLoading: true };
    case types.CREATE_REVIEW_SUCCESS:
      return {...state, submitReviewLoading: false, selectedBlog: {...state.selectedBlog, reviews: [...state.selectedBlog.reviews, payload]}};
    case types.CREATE_REVIEW_FAILURE:
      return { ...state, submitReviewLoading: false };

    case types.CREATE_BLOG_REQUEST:
      return state
    case types.CREATE_BLOG_SUCCESS:
      return state
    case types.CREATE_BLOG_FAILURE:
      return state

    case types.UPDATE_BLOG_REQUEST:
      return state
    case types.UPDATE_BLOG_SUCCESS:
      return state
    case types.UPDATE_BLOG_FAILURE:
      return state

    case types.DELETE_BLOG_REQUEST:
      return state
    case types.DELETE_BLOG_SUCCESS:
      return { ...state, loading: false, selectedBlog: {}, redirectTo: "/" };
    case types.DELETE_BLOG_FAILURE:
      return { ...state, loading: false };

    case types.UPDATE_REACTION_BLOG_REQUEST:
      return {...state}
    case types.UPDATE_REACTION_BLOG_SUCCESS:
      return {...state, selectedBlog: payload.data}
    case types.UPDATE_REACTION_BLOG_FAILURE:
      return {...state}

    case types.UPDATE_REACTION_REVIEW_REQUEST:
      return { ...state }
    case types.UPDATE_REACTION_REVIEW_SUCCESS:
      return {...state, selectedBlog: payload.data}
    case types.UPDATE_REACTION_REVIEW_FAILURE:
      return { ...state }

    default:
      return state
  }
}

export default blogReducer