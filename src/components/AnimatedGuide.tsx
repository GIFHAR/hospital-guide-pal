import { useState, useEffect } from 'react';

interface AnimatedGuideProps {
  frames: string[];
  interval?: number;
  width?: number;
  height?: number;
}

const AnimatedGuide = ({ frames, interval = 500, width = 200, height = 200 }: AnimatedGuideProps) => {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    if (frames.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frames.length);
    }, interval);
    return () => clearInterval(timer);
  }, [frames, interval]);

  if (frames.length === 0) return null;

  return (
    <div style={{ width, height }} className="overflow-hidden rounded-xl bg-secondary flex items-center justify-center">
      <img
        src={frames[currentFrame]}
        alt={`Guide frame ${currentFrame + 1}`}
        className="w-full h-full object-contain"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
    </div>
  );
};

export default AnimatedGuide;
