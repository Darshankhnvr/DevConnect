import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../redux/thunk/postThunks';
import { PaperAirplaneIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { toast }  from 'sonner';

export default function CreatePost({ onCreateSuccess }) {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!content.trim() && !image) {
      setError('Please add some content or an image');
      toast.error("Please add some content or an image")
      return;
    }

    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('description', content);
      if (image) {
        formData.append('image', image); 
      }
      await dispatch(createPost(formData));
      resetForm();
      if (onCreateSuccess) {
        onCreateSuccess();
        toast.success("Post created successfully")
      }
    } catch (err) {
      setError(err.message || 'Failed to create post');
      toast.error(err.message || 'Failed to create post')
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match('image.*')) {
      setError('Please upload an image file (JPEG, PNG)');
      toast.error('Please upload an image file (JPEG, PNG)')
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      toast.error('Image size should be less than 5MB') 
      return;
    }

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
    setError(null);
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const resetForm = () => {
    setContent('');
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6 border border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-start space-x-3">
          {/* User Avatar */}
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-indigo-600 font-medium">
                {/* Replace with dynamic user initial */}
                U
              </span>
            </div>
          </div>

          {/* Post Content */}
          <div className="flex-1 space-y-3">
            <textarea
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              rows={3}
              disabled={isSubmitting}
            />
            
            {/* Image Preview */}
            {imagePreview && (
              <div className="relative rounded-lg overflow-hidden border border-gray-200">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full max-h-80 object-contain"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70 transition-colors"
                  aria-label="Remove image"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            )}
            
            {/* Action Bar */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-4">
                {/* Image Upload Button */}
                <label className="cursor-pointer text-gray-500 hover:text-indigo-600 transition-colors">
                  <PhotoIcon className="h-6 w-6" />
                  <input
                    type="file"
                    ref={fileInputRef}
                    name="media"  // Must match Multer's field name
                    accept="image/jpeg, image/png"
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={isSubmitting}
                  />
                </label>
                
                {/* Character Counter (optional) */}
                <span className="text-sm text-gray-400">
                  {content.length}/500
                </span>
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={(!content.trim() && !image) || isSubmitting}
                className={`flex items-center px-4 py-2 rounded-full font-medium ${
                  (!content.trim() && !image) || isSubmitting
                    ? 'bg-indigo-300 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                } transition-colors`}
              >
                {isSubmitting ? (
                  'Posting...'
                ) : (
                  <>
                    <PaperAirplaneIcon className="h-5 w-5 mr-1" />
                    Post
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-sm mt-2 px-2">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}