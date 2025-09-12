import React from 'react';

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

interface PlaylistProps {
  videos: Video[];
  currentVideo: Video;
  onVideoSelect: (video: Video) => void;
}

const Playlist: React.FC<PlaylistProps> = ({ videos, currentVideo, onVideoSelect }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white">Up Next</h3>
        <p className="text-sm text-gray-400">{videos.length} videos</p>
      </div>
      
      <div className="max-h-96 lg:max-h-none lg:h-96 overflow-y-auto">
        {videos.map((video) => (
          <div
            key={video.id}
            onClick={() => onVideoSelect(video)}
            className={`p-3 cursor-pointer hover:bg-gray-700 transition-colors border-l-4 ${
              currentVideo.id === video.id 
                ? 'border-red-500 bg-gray-700' 
                : 'border-transparent'
            }`}
          >
            <div className="flex space-x-3">
              <div className="relative flex-shrink-0">
                <img
                  src={video.thumbnail}
                  alt={video.alt}
                  className="w-20 h-12 object-cover rounded"
                />
                <span className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 rounded">
                  {video.duration}
                </span>
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className={`text-sm font-medium line-clamp-2 ${
                  currentVideo.id === video.id ? 'text-red-400' : 'text-white'
                }`}>
                  {video.title}
                </h4>
                <p className="text-xs text-gray-400 mt-1">{video.channel}</p>
                <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                  <span>{video.views} views</span>
                  <span>•</span>
                  <span>{video.uploadDate}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-700">
        <button className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium">
          Shuffle Playlist
        </button>
      </div>
    </div>
  );
};

export default Playlist;