import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import './News.css';

const NewsCard = ({ post, onOpenDialog }) => {
  const ref = React.useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "70%"]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;
    
    if (interval > 1) return Math.floor(interval) + ' năm trước';
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' tháng trước';
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' ngày trước';
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' giờ trước';
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' phút trước';
    return Math.floor(seconds) + ' giây trước';
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onClick={() => onOpenDialog(post)}
      initial="initial"
      whileInView="visible"
      whileHover="hover"
      variants={{
        initial: { 
          y: 48, 
          opacity: 0 
        },
        visible: { 
          y: 0, 
          opacity: 1,
          transition: {
            ease: "easeOut",
            duration: 0.5
          }
        },
        hover: {
          scale: 1.02,
          transition: {
            duration: 0.3
          }
        }
      }}
      className="news-card-motion"
    >
      <div className="news-content-wrapper">
        <dir className="news-meta">
          <span className="news-type-motion">{post.postType}</span>
          <span className="news-time-ago">{getTimeAgo(post.createdAt)}</span>
        </dir>
        <motion.h3 className="news-title-motion">
          {post.title}
        </motion.h3>
        <span className="news-date-motion">
          {new Date(post.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          })}
        </span>
      </div>

      <motion.img
        style={{
          top,
          left,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={{
          initial: { scale: 0 },
          hover: { scale: 1.1, rotate: "3deg" },
        }}
        transition={{ type: "spring", stiffness: 200 }}
        src={post.image}
        className="news-image-motion"
        alt={post.title}
      />

      <motion.div
        variants={{
          initial: { x: 20, opacity: 0 },
          hover: { x: 0, opacity: 1 },
        }}
        className="news-arrow-motion"
      >
        <FiArrowRight />
      </motion.div>
    </motion.div>
  );
};

const NewsDialog = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <div className="news-dialog-overlay" onClick={onClose}>
      <div className="news-dialog-content" onClick={e => e.stopPropagation()}>
        <div className="news-dialog-type">{post.postType}</div>
        <button className="news-dialog-close" onClick={onClose}>×</button>
        <img src={post.image} alt={post.title} className="news-dialog-image" />
        <h2>{post.title}</h2>
        <div className="news-dialog-meta">
          <span>{new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
        </div>
        <div className="news-dialog-body">{post.content}</div>
      </div>
    </div>
  );
};

const News = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/post');
        const data = await response.json();
        setPosts(data.posts.slice(0, 5)); // Chỉ lấy 5 bài đu tiên
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleOpenDialog = (post) => {
    setSelectedPost(post);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseDialog = () => {
    setSelectedPost(null);
    document.body.style.overflow = 'unset';
  };

  if (loading) return <div className="loading">Đang tải...</div>;

  return (
    <div className="news-section">
      <div className="news-container">
        <motion.div 
          className="news-header"
          initial={{ y: 48, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.75 }}
          viewport={{ once: true }}
        >
          <h2>Latest News</h2>
          <Link to="/news" className="see-all">
            See all <FiArrowRight />
          </Link>
        </motion.div>
        <div className="news-list">
          {posts.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ y: 48, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ 
                ease: "easeInOut", 
                duration: 0.75,
                delay: index * 0.1 // Thêm delay để tạo hiệu ứng lần lượt
              }}
              viewport={{ once: true }}
            >
              <NewsCard 
                post={post} 
                onOpenDialog={handleOpenDialog}
              />
            </motion.div>
          ))}
        </div>
      </div>
      <NewsDialog post={selectedPost} onClose={handleCloseDialog} />
    </div>
  );
};

export default News;
