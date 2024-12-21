import React, { useState } from 'react';
import { postApi } from '../../services/modules/admin/post/post.api';
import Dialog from '../common/Dialog';
import './Admin.css';

const NewsManagement = () => {
  const [post, setPost] = useState({
    title: '',
    content: '',
    postType: 'News',
    image: ''
  });

  const [dialog, setDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postApi.createPost(post);
      setDialog({
        isOpen: true,
        title: 'Success',
        message: 'Posted successfully',
        type: 'success'
      });
      setPost({
        title: '',
        content: '',
        postType: 'News',
        image: ''
      });
    } catch (error) {
      setDialog({
        isOpen: true,
        title: 'Error',
        message: error.response?.data?.message || 'An error occurred while posting.',
        type: 'error'
      });
    }
  };

  return (
    <div className="form-container">
      {/* <h2 className='h2-admin'>Post</h2> */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Post Type</label>
          <select
            value={post.postType}
            onChange={(e) => setPost({...post, postType: e.target.value})}
            required
          >
            <option value="News">News</option>
            <option value="Promotion">Promotion</option>
            <option value="Notification">Notification</option>
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

      <Dialog
        isOpen={dialog.isOpen}
        onClose={() => setDialog({ ...dialog, isOpen: false })}
        title={dialog.title}
        message={dialog.message}
        type={dialog.type}
      />
    </div>
  );
};

export default NewsManagement; 