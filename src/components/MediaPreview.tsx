
import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MediaPreviewProps {
  mediaUrl: string;
  mediaType: string;
  title?: string;
  downloadable?: boolean;
}

const MediaPreview = ({ 
  mediaUrl, 
  mediaType, 
  title = "", 
  downloadable = true 
}: MediaPreviewProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // Reset playing state when media URL changes
    setIsPlaying(false);
    setProgress(0);
  }, [mediaUrl]);

  const handlePlayPause = () => {
    if (mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.pause();
      } else {
        mediaRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (mediaRef.current) {
      mediaRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (mediaRef.current) {
      const percentage = (mediaRef.current.currentTime / mediaRef.current.duration) * 100;
      setProgress(isNaN(percentage) ? 0 : percentage);
    }
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = mediaUrl;
    a.download = title || `download-${mediaType}-${Date.now()}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (mediaType === "image") {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden rounded-md">
        <div className="relative w-full flex-grow">
          <img 
            src={mediaUrl} 
            alt={title || "Generated image"} 
            className="w-full h-full object-contain"
          />
          {downloadable && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-black/40 hover:bg-black/60 text-white rounded-full"
              onClick={handleDownload}
            >
              <DownloadIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
        {title && <p className="text-sm text-center mt-2">{title}</p>}
      </div>
    );
  }

  if (mediaType === "video") {
    return (
      <div className="w-full h-full flex flex-col relative">
        <video 
          src={mediaUrl} 
          className="w-full h-full object-contain rounded-md" 
          muted={isMuted}
          autoPlay={false}
          loop
          ref={mediaRef as React.RefObject<HTMLVideoElement>}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
          <div className="w-full bg-gray-200 h-1 rounded-full mb-2">
            <div 
              className="bg-primary h-1 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 text-white" 
                onClick={handlePlayPause}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 text-white" 
                onClick={handleMuteToggle}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <div className="text-white text-xs">{title || "AI Generated Video"}</div>
            </div>
            {downloadable && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-white"
                onClick={handleDownload}
              >
                <DownloadIcon className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (mediaType === "audio") {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-6">
        <div className="w-full max-w-sm bg-muted/50 rounded-full h-24 flex items-center justify-center">
          <div className="audio-visualization flex items-end justify-center w-3/4 h-16 gap-1">
            {Array(20).fill(0).map((_, idx) => (
              <div 
                key={idx} 
                className="bg-primary/80 w-2 rounded-t-sm" 
                style={{ 
                  height: `${Math.max(10, Math.floor(Math.random() * 60))}px`,
                  animationDelay: `${idx * 0.05}s`,
                  animation: isPlaying ? 'pulse 1s infinite' : 'none'
                }}
              ></div>
            ))}
          </div>
        </div>
        
        <audio 
          src={mediaUrl} 
          className="w-full hidden" 
          controls={false}
          muted={isMuted}
          ref={mediaRef as React.RefObject<HTMLAudioElement>}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        
        <div className="w-full bg-gray-200 h-1 rounded-full mb-2">
          <div 
            className="bg-primary h-1 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-10 w-10 p-0 rounded-full" 
              onClick={handlePlayPause}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-10 w-10 p-0 rounded-full" 
              onClick={handleMuteToggle}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            {title && <div className="text-sm">{title}</div>}
          </div>
          
          {downloadable && (
            <Button
              variant="outline"
              size="sm"
              className="h-10 w-10 p-0 rounded-full"
              onClick={handleDownload}
            >
              <DownloadIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default MediaPreview;
