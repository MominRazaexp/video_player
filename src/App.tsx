import React, { useState } from 'react';
import VideoPlayer from './components/VideoPlayer';
import Playlist from './components/Playlist';
import VideoInfo from './components/VideoInfo';

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

const App: React.FC = () => {
  const [videos] = useState<Video[]>([
    {
      id: 1,
      title: `Nature's Beautiful Landscapes`,
      duration: '5:24',
      thumbnail: 'https://picsum.photos/320/180?random=1',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      description: `Explore the most breathtaking landscapes from around the world, featuring stunning mountain views, serene lakes, and vibrant forests.`,
      views: '2.1M',
      uploadDate: '2 days ago',
      channel: 'Nature Explorer',
      alt: 'Beautiful landscape with mountains and lakes'
    },
    {
      id: 2,
      title: `Ocean Waves Relaxation`,
      duration: '8:15',
      thumbnail: 'https://picsum.photos/320/180?random=2',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
      description: `Peaceful ocean waves sounds perfect for meditation and relaxation. Let the calming sounds wash away your stress.`,
      views: '856K',
      uploadDate: '1 week ago',
      channel: 'Relax & Unwind',
      alt: 'Peaceful ocean waves on a sandy beach'
    },
    {
      id: 3,
      title: `City Lights at Night`,
      duration: '3:42',
      thumbnail: 'https://picsum.photos/320/180?random=3',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      description: `Experience the vibrant energy of city nightlife with spectacular light displays and urban architecture.`,
      views: '1.5M',
      uploadDate: '3 days ago',
      channel: 'Urban Vibes',
      alt: 'Vibrant city lights and skyscrapers at night'
    },
    {
      id: 4,
      title: `Wildlife Adventure`,
      duration: '6:33',
      thumbnail: 'https://picsum.photos/320/180?random=4',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
      description: `Join us on an incredible wildlife safari adventure featuring exotic animals in their natural habitat.`,
      views: '3.2M',
      uploadDate: '5 days ago',
      channel: 'Wild Discovery',
      alt: 'Wildlife animals in their natural safari habitat'
    },
    {
      id: 5,
      title: `Mountain Climbing Journey`,
      duration: '12:18',
      thumbnail: 'https://picsum.photos/320/180?random=5',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      description: `Follow our team as we embark on an epic mountain climbing expedition to reach the summit.`,
      views: '987K',
      uploadDate: '1 day ago',
      channel: 'Adventure Seekers',
      alt: 'Mountain climbers ascending a snowy peak'
    }
  ]);

  const [currentVideo, setCurrentVideo] = useState<Video>(videos[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleVideoSelect = (video: Video) => {
    setCurrentVideo(video);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 px-4 py-3 border-b border-gray-700">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-red-500">VideoStream</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-4">
            <VideoPlayer
              video={currentVideo}
              isPlaying={isPlaying}
              onPlayPause={setIsPlaying}
            />
            <VideoInfo video={currentVideo} />
          </div>
          <div className="lg:col-span-1">
            <Playlist
              videos={videos}
              currentVideo={currentVideo}
              onVideoSelect={handleVideoSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;