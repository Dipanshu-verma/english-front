import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addPostAction, getPost } from "../redux/actions"; 

const CreatePost = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [latitude, setLatitude] = useState("");  
  const [longitude, setLongitude] = useState("");  
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(true);
  const { userId, token } = useSelector((state) => state);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    dispatch(
      addPostAction(
        {
          title: postTitle,
          body: postBody,
          active: isActive,
            latitude,
            longitude,
          
        },
        token
      )
    );
  };


 
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-4">Create Post</h1>

      <form
        onSubmit={handleCreatePost}
        className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="postTitle"
            className="block text-gray-600 font-semibold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="postBody"
            className="block text-gray-600 font-semibold mb-2"
          >
            Body
          </label>
          <textarea
            id="postBody"
            name="postBody"
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            htmlFor="latitude"
            className="block text-gray-600 font-semibold mb-2"
          >
            Latitude
          </label>
          <input
            type="number"
            id="latitude"
            name="latitude"
            value={latitude}
            onChange={(e) => setLatitude(parseFloat(e.target.value))}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="longitude"
            className="block text-gray-600 font-semibold mb-2"
          >
            Longitude
          </label>
          <input
            type="number"
            id="longitude"
            name="longitude"
            value={longitude}
            onChange={(e) => setLongitude(parseFloat(e.target.value))}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="isActive" className="block text-gray-600 font-semibold mb-2">Active</label>
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={isActive}
            onChange={() => setIsActive(!isActive)}
            className="border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
