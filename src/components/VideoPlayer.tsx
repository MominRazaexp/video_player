import React, { useState, useRef, useEffect } from 'react';

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

interface VideoPlayerProps {
  video: Video;
  isPlaying: boolean;
  onPlayPause: (playing: boolean) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, isPlaying, onPlayPause }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    onPlayPause(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (videoRef.current) {
      videoRef.current.volume = vol;
    }
    setIsMuted(vol === 0);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      setIsMuted(newMuted);
      videoRef.current.muted = newMuted;
      if (newMuted) {
        videoRef.current.volume = 0;
      } else {
        videoRef.current.volume = volume;
      }
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (videoRef.current?.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const controlsTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current);
    }
    controlsTimeout.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  return (
    <div className="relative bg-black rounded-lg overflow-hidden group">
      <div
        className="relative"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setShowControls(false)}
      >
        <video
          ref={videoRef}
          className="w-full aspect-video"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          poster={video.thumbnail}
        >
          <source src={video.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Play button overlay */}
        {!isPlaying && (
          <button
            onClick={handlePlayPause}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-50 transition-all"
          >
            <div className="w-20 h-20 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors">
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 4.1c-.4-.2-.9 0-1.1.4-.2.4-.2.9.1 1.2l7.4 4.6c.3.2.7.2 1 0l7.4-4.6c.3-.3.3-.8.1-1.2-.2-.4-.7-.6-1.1-.4L12 8.7 6.3 4.1z" transform="rotate(90 10 10)"/>
              </svg>
            </div>
          </button>
        )}

        {/* Controls */}
        <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent transition-opacity duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}>
          <div className="p-4">
            {/* Progress bar */}
            <div className="mb-4">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Play/Pause button */}
                <button
                  onClick={handlePlayPause}
                  className="text-white hover:text-red-500 transition-colors"
                >
                  {isPlaying ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6 4h2v12H6V4zm6 0h2v12h-2V4z"/>
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 4.1c-.4-.2-.9 0-1.1.4-.2.4-.2.9.1 1.2l7.4 4.6c.3.2.7.2 1 0l7.4-4.6c.3-.3.3-.8.1-1.2-.2-.4-.7-.6-1.1-.4L12 8.7 6.3 4.1z" transform="rotate(90 10 10)"/>
                    </svg>
                  )}
                </button>

                {/* Volume controls */}
                <div className="flex items-center space-x-2">
                  <button onClick={toggleMute} className="text-white hover:text-red-500 transition-colors">
                    {isMuted ? (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.798L4.383 13.5H2a1 1 0 01-1-1V7.5a1 1 0 011-1h2.383l4-3.798A1 1 0 019.383 3.076zM16 7a1 1 0 011 1v4a1 1 0 11-2 0V8a1 1 0 011-1z" clipRule="evenodd"/>
                        <path d="M17.293 4.293a1 1 0 011.414 0L20 5.586l1.293-1.293a1 1 0 111.414 1.414L21.414 7l1.293 1.293a1 1 0 01-1.414 1.414L20 8.414l-1.293 1.293a1 1 0 01-1.414-1.414L18.586 7l-1.293-1.293a1 1 0 010-1.414z"/>
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.798L4.383 13.5H2a1 1 0 01-1-1V7.5a1 1 0 011-1h2.383l4-3.798A1 1 0 019.383 3.076zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10a7.971 7.971 0 00-2.343-5.657 1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd"/>
                      </svg>
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Time display */}
                <span className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              {/* Fullscreen button */}
              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-red-500 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;