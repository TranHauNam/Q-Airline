import React, { useState } from 'react';
import { postApi } from '../../services/modules/admin/post/post.api';

const NewsManagement = () => {
  const [post, setPost] = useState({
    title: '',
    content: '',
    postType: 'Tin tức',
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
        postType: 'Tin tức',
        image: ''
      });
    } catch (error) {
      alert(error.response?.data?.message || 'Có lỗi xảy ra');
    }
  };

  return (
    <div className="form-container">
      <h2>Đăng tin tức</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Loại bài đăng</label>
          <select
            value={post.postType}
            onChange={(e) => setPost({...post, postType: e.target.value})}
            required
          >
            <option value="Tin tức">Tin tức</option>
            <option value="Khuyến mãi">Khuyến mãi</option>
            <option value="Thông báo">Thông báo</option>
          </select>
        </div>

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

        <div className="form-group">
          <label>Link ảnh</label>
          <input
            type="text"
            value={post.image}
            onChange={(e) => setPost({...post, image: e.target.value})}
            required
            placeholder="Nhập đường dẫn ảnh"
          />
        </div>

        <button type="submit" className="submit-button">Đăng bài</button>
      </form>
    </div>
  );
};

export default NewsManagement; 