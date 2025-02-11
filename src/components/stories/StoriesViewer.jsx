import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from 'react-use-gesture';
import Plyr from 'plyr-react';
import 'plyr-react/plyr.css';

const StoriesViewer = ({ stories = [], onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const playerRef = useRef(null);
  const progressRef = useRef(null);
  const timeoutRef = useRef(null);

  // Spring animation for swipe gestures
  const [{ x }, api] = useSpring(() => ({ x: 0 }));

  // Gesture binding for swipe actions
  const bind = useDrag(({ down, movement: [mx], direction: [xDir], velocity }) => {
    const trigger = velocity > 0.2;
    const isSwipeLeft = xDir > 0;

    if (!down && trigger) {
      if (isSwipeLeft && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      } else if (!isSwipeLeft && currentIndex < stories.length - 1) {
        setCurrentIndex(prev => prev + 1);
      }
    }
    api.start({ x: down ? mx : 0, immediate: down });
  }, { axis: 'x' });

  // Progress bar animation
  useEffect(() => {
    if (!isPaused && playerRef.current) {
      const duration = playerRef.current.duration || 30; // Default to 30s if duration not available
      progressRef.current = anime({
        targets: '.progress-bar',
        width: '100%',
        duration: duration * 1000,
        easing: 'linear',
        complete: () => {
          if (currentIndex < stories.length - 1) {
            setCurrentIndex(prev => prev + 1);
          } else {
            onClose();
          }
        }
      });
    }
    return () => {
      if (progressRef.current) {
        progressRef.current.pause();
      }
    };
  }, [currentIndex, isPaused, stories.length, onClose]);

  // Handle video events
  const handleVideoEnd = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const handleTap = (e) => {
    const { clientX } = e;
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const clickPosition = (clientX - left) / width;

    if (clickPosition < 0.3 && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else if (clickPosition > 0.7 && currentIndex < stories.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const currentStory = stories[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="relative h-full w-full">
          {/* Progress bars */}
          <div className="absolute top-0 z-10 flex w-full gap-1 p-2">
            {stories.map((_, index) => (
              <div
                key={index}
                className="h-1 flex-1 rounded-full bg-gray-600"
              >
                <div
                  className={`h-full rounded-full bg-white transition-all ${
                    index === currentIndex ? 'progress-bar w-0' : 
                    index < currentIndex ? 'w-full' : 'w-0'
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Video player */}
          <animated.div
            {...bind()}
            onClick={handleTap}
            style={{ x }}
            className="h-full w-full touch-pan-y"
          >
            <Plyr
              ref={playerRef}
              source={{
                type: 'video',
                sources: [{ src: currentStory.url, type: 'video/mp4' }],
              }}
              options={{
                controls: [],
                clickToPlay: false,
                muted: false,
                autopause: true,
                autoplay: true,
              }}
              onEnded={handleVideoEnd}
              onPause={() => setIsPaused(true)}
              onPlay={() => setIsPaused(false)}
            />
          </animated.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StoriesViewer;
