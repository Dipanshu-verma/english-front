import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from '../redux/actions';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const userId = useSelector((state) => state.userId);
  const navigate = useNavigate();
 const [countdata,setCountData] = useState({
    active:0,
inactive:0 })
  useEffect(() => {
    dispatch(getPost());

    async function getcount(){
        try{
            const countdata=  await axios.get("https://node-compy.onrender.com/dashboard")
            console.log(countdata);
            setCountData({active:countdata.data.activeCount, inactive:countdata.data.inactiveCount})
        }catch(error){
             console.error(error);
        }

    }
    getcount();
  }, [dispatch]);

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  const renderButtons = (post) => {
    if (post.created_by === userId) {
      return (
        <>
          <button
            onClick={() => handleEditPost(post._id)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeletePost(post._id)}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
          >
            Delete
          </button>
        </>
      );
    }
    return null;
  };

  const handleEditPost = (postId) => {
    // Implement your logic to navigate to the edit page
    // You can use the `navigate` function or Link from 'react-router-dom'
  };

  const handleDeletePost = (postId) => {
    // Implement your logic to delete the post
    // You can use an action to dispatch the delete request
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>

      {!posts ? (
        <p className="text-gray-500">No posts available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <h1>Active Posts:{countdata.active}</h1>
        <h1>Inactive Posts:{countdata.inactive}</h1>
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
              onClick={() => handlePostClick(post._id)}
            >
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.body}</p>
               
              <p className={`text-${post.active ? 'green' : 'red'}-500`}>
                {post.active ? 'Active' : 'Inactive'}
              </p>
              <p className="text-gray-500">
              latitude: {post?.geo_location?.latitude}
              </p>

              <p className="text-gray-500">
              longitude:{post?.geo_location?.longitude}
              </p>
             
              {renderButtons(post)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
