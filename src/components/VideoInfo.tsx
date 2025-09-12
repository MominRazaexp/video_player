import React, { useState } from 'react';

interface Video {
  id: number;
  title: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  description: string;
  views: string;
  uploadDate: string;
  channel: string;
  alt: string;
}

interface VideoInfoProps {
  video: Video;
}

const VideoInfo: React.FC<VideoInfoProps> = ({ video }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDisliked, setIsDisliked] = useState<boolean>(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [showFullDescription, setShowFullDescription] = useState<boolean>(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (isDisliked) setIsDisliked(false);
  };

  const handleDislike = () => {
    setIsDisliked(!isDisliked);
    if (isLiked) setIsLiked(false);
  };

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 space-y-4">
      <div>
        <h1 className="text-xl lg:text-2xl font-bold text-white mb-2">{video.title}</h1>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span>{video.views} views</span>
            <span>•</span>
            <span>{video.uploadDate}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 px-3 py-1 rounded-full transition-colors ${
                isLiked ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
              </svg>
              <span className="text-sm">Like</span>
            </button>
            
            <button
              onClick={handleDislike}
              className={`flex items-center space-x-2 px-3 py-1 rounded-full transition-colors ${
                isDisliked ? 'bg-gray-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <svg className="w-5 h-5 transform rotate-180" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
              </svg>
              <span className="text-sm">Dislike</span>
            </button>
            
            <button className="flex items-center space-x-2 px-3 py-1 bg-gray-700 text-gray-300 hover:bg-gray-600 rounded-full transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              <span className="text-sm">Share</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between py-4 border-t border-gray-700">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              {video.channel.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="text-white font-semibold">{video.channel}</h3>
            <p className="text-sm text-gray-400">1.2M subscribers</p>
          </div>
        </div>
        
        <button
          onClick={handleSubscribe}
          className={`px-6 py-2 rounded-full font-medium transition-colors ${
            isSubscribed 
              ? 'bg-gray-700 text-white hover:bg-gray-600' 
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          {isSubscribed ? 'Subscribed' : 'Subscribe'}
        </button>
      </div>
      
      <div className="border-t border-gray-700 pt-4">
        <div className={`text-gray-300 ${showFullDescription ? '' : 'line-clamp-3'}`}>
          {video.description}
        </div>
        <button
          onClick={() => setShowFullDescription(!showFullDescription)}
          className="text-gray-400 hover:text-white text-sm mt-2 transition-colors"
        >
          {showFullDescription ? 'Show less' : 'Show more'}
        </button>
      </div>
      
      <div className="border-t border-gray-700 pt-4">
        <h4 className="text-white font-semibold mb-3">Comments (24)</h4>
        <div className="space-y-4">
          <div className="flex space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-semibold">JD</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-white font-medium text-sm">John Doe</span>
                <span className="text-gray-500 text-xs">2 hours ago</span>
              </div>
              <p className="text-gray-300 text-sm mt-1">
                Amazing video! The quality is incredible and really captures the beauty of nature.
              </p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-semibold">SM</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-white font-medium text-sm">Sarah Miller</span>
                <span className="text-gray-500 text-xs">5 hours ago</span>
              </div>
              <p className="text-gray-300 text-sm mt-1">
                This is exactly what I needed for relaxation. Thank you for sharing!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoInfo;