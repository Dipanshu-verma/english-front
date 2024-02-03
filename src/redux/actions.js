
import axios from 'axios';

 
const registerAction = (userData) => async (dispatch) => {
    console.log(userData);
    try {
     
      const response = await axios.post('https://node-compy.onrender.com/registration', userData);
    
      dispatch({
        type: 'REGISTER',
        payload: { user: response.data.user, token: response.data.token },
      });

    } catch (error) {
      console.error('Error registering user:', error);
   
    }
  };
  
 
  const loginAction = (credentials) => async (dispatch) => {
    console.log(credentials);
    try {
  
      const response = await axios.post('https://node-compy.onrender.com/login', credentials);
  
       localStorage.setItem("token", response.data.token);
       localStorage.setItem("userId", response.data.user._id);
      dispatch({
        type: 'LOGIN',
        payload: { userId: response.data.user._id, token:  response.data.token},
      });
    } catch (error) {
      console.error('Error logging in:', error);
     
    }
  };
 
const logoutAction = () => (dispatch) => {
   
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    dispatch({
      type: 'LOGOUT',
    });
  };
  
  export default logoutAction;
  
 
const addPostAction = (post,token) => async (dispatch) => {
    console.log(post);
  try {
  
    const response = await axios.post('https://node-compy.onrender.com/posts', post,{
        headers: {
          Authorization: `${token}`, 
        },
      });
 
    
    dispatch({
      type: 'ADD_POST',
      payload: { post: response.data },  
    });
  } catch (error) {
    console.error('Error adding post:', error);
   
  }
};
const getPost = () => async (dispatch) => {
  try {
  
    const response = await axios.get('https://node-compy.onrender.com/posts');

    

    dispatch({
      type: 'SET_POSTS',
      payload: { posts: response.data.Posts}, 
    });
  } catch (error) {
    console.error('Error adding post:', error);
    
  }
};


 
const editPostAction = (postId, updatedPost) => async (dispatch) => {
  try {
    
    const response = await axios.put(`https://node-compy.onrender.com/posts/${postId}`, updatedPost);

   
    dispatch({
      type: 'EDIT_POST',
      payload: { post: response.data },  
    });
  } catch (error) {
    console.error('Error editing post:', error);
    
  }
};

 
const deletePostAction = (postId) => async (dispatch) => {
  try {
     
    await axios.delete(`https://node-compy.onrender.com/posts/${postId}`);

    
    dispatch({
      type: 'DELETE_POST',
      payload: { postId },
    });
  } catch (error) {
    console.error('Error deleting post:', error);
   
  }
};

export { addPostAction, getPost,editPostAction, deletePostAction,loginAction,registerAction ,logoutAction};

