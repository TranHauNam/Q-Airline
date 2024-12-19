import React, { useState } from 'react';
import { postApi } from '../../services/modules/admin/post/post.api';

const NewsManagement = () => {
  const [post, setPost] = useState({
    title: '',
    content: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postApi.createPost(post);
      alert(response.data.message);
      setPost({ title: '', content: '' });
    } catch (error) {
      alert(error.response?.data?.message || 'Có lỗi xảy ra');
    }
  };

  return (
    <div className="form-container">
      <h2>Đăng tin tức</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tiêu đề</label>
          <input
            type="text"
            value={post.title}
            onChange={(e) => setPost({...post, title: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Nội dung</label>
          <textarea
            value={post.content}
            onChange={(e) => setPost({...post, content: e.target.value})}
            required
            rows={10}
          />
        </div>
        <button type="submit" className="submit-button">Đăng bài</button>
      </form>
    </div>
  );
};

export default NewsManagement; 