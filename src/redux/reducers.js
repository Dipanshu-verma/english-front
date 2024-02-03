const initialState = {
    userId:  localStorage.getItem("userId")||null,
    token:  localStorage.getItem("token") ||null,
    posts: [],
   
  };
  
  export const storeReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          userId: action.payload.userId,
          token: action.payload.token,
        };
  
      case 'LOGOUT':
        return {
          ...state,
          userId: null,
          token: null,
        };
  
      case 'SET_POSTS':
        return {
          ...state,
          posts: action.payload.posts,
          
        };
  
      case 'ADD_POST':
        return {
          ...state,
          posts: [...state.posts, action.payload.post],
        };
  
      case 'EDIT_POST':
        const updatedPosts = state.posts.map((post) =>
          post.id === action.payload.post.id ? action.payload.post : post
        );
        return {
          ...state,
          posts: updatedPosts,
        };
  
      case 'DELETE_POST':
        const remainingPosts = state.posts.filter(
          (post) => post.id !== action.payload.postId
        );
        return {
          ...state,
          posts: remainingPosts,
        };
  
      default:
        return state;
    }
  };
  
  export default storeReducer;
  