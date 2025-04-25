import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { likePost, unlikePost } from '../redux/thunk/postThunks';
import { formatDistanceToNow } from 'date-fns';
import { FiHeart, FiMessageSquare, FiMoreHorizontal, FiTrash2 } from 'react-icons/fi';

const PostCard = ({ post, currentUserId, onDelete }) => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const [showDropdown, setShowDropdown] = useState(false);
  const [isLiked, setIsLiked] = useState(post.likes?.includes(currentUserId));
  const [likeCount, setLikeCount] = useState(post.likesCount || 0);

  // Toggle Like
  const handleLike = () => {
    if (isLiked) {
      dispatch(unlikePost(post._id));
      setLikeCount(prev => prev - 1);
    } else {
      dispatch(likePost(post._id));
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  // Handle Delete
  const handleDelete = () => {
    setShowDropdown(false);
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      onDelete(post._id);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 border border-gray-100">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <img 
            src={post.user?.profilePic || 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?t=st=1745566519~exp=1745570119~hmac=fb87849ee7bdbecaa1cc160442c8caa1a78cfa9d0fea5611beb7de064d81ca62&w=1380'} 
            alt={post.user?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{post.user?.name}</h3>
            <p className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>

        {/* Dropdown Menu */}
        {post.user?._id === currentUserId && (
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiMoreHorizontal size={20} />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <button
                  onClick={handleDelete}
                  className="flex items-center px-4 py-2 text-sm text-red-500 hover:bg-gray-100 w-full text-left"
                >
                  <FiTrash2 className="mr-2" /> Delete Post
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Post Content */}
      <div className="px-4 pb-2">
        <p className="text-gray-800 mb-3">{post.description}</p>
        {post.image && (
          <img 
            src={`http://localhost:3000/uploads/posts/${post.image}`} 
            alt="Post content" 
            className="w-full h-auto rounded-lg object-cover max-h-96"
          />
        )}
      </div>

      {/* Post Actions */}
      <div className="px-4 py-2 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            <button 
              onClick={handleLike}
              className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
            >
              <FiHeart fill={isLiked ? 'currentColor' : 'none'} />
              <span>{likeCount}</span>
            </button>
            
            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
              <FiMessageSquare />
              <span>{post.comments?.length || 0}</span>
            </button>
          </div>
        </div>

        {/* Comment Input */}
        <div className="mt-3 flex items-center">
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 text-sm border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
