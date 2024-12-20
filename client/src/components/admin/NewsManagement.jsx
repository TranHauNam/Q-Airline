import React, { useState } from 'react';
import { postApi } from '../../services/modules/admin/post/post.api';

const NewsManagement = () => {
  const [post, setPost] = useState({
    title: '',
    content: '',
    postType: 'News',
    image: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postApi.createPost(post);
      alert(response.data.message);
      setPost({
        title: '',
        content: '',
        postType: 'News',
        image: ''
      });
    } catch (error) {
      alert(error.response?.data?.message || 'Có lỗi xảy ra');
    }
  };

  return (
    <div className="form-container">
      <h1>Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Post Type</label>
          <select
            value={post.postType}
            onChange={(e) => setPost({...post, postType: e.target.value})}
            required
          >
            <option value="Tin tức">News</option>
            <option value="Khuyến mãi">Promotion</option>
            <option value="Thông báo">Notification</option>
          </select>
        </div>

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={post.title}
            onChange={(e) => setPost({...post, title: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Content</label>
          <textarea
            value={post.content}
            onChange={(e) => setPost({...post, content: e.target.value})}
            required
            rows={10}
          />
        </div>

        <div className="form-group">
          <label>Image link</label>
          <input
            type="text"
            value={post.image}
            onChange={(e) => setPost({...post, image: e.target.value})}
            required
            placeholder="Enter image path"
          />
        </div>

        <button type="submit" className="submit-button">Post</button>
      </form>
    </div>
  );
};

export default NewsManagement; 