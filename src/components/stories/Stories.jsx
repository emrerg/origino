'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import StoriesViewer from './StoriesViewer';

const Stories = ({ stories = [] }) => {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const handleStoryClick = (index) => {
    setSelectedStoryIndex(index);
    setIsViewerOpen(true);
  };

  const handleClose = () => {
    setIsViewerOpen(false);
    setSelectedStoryIndex(null);
  };

  return (
    <>
      <div className="no-scrollbar flex w-full gap-4 overflow-x-auto px-4 py-2">
        {stories.map((story, index) => (
          <motion.div
            key={story.id || `story-${index}`}
            whileTap={{ scale: 0.95 }}
            className="relative flex-shrink-0 cursor-pointer"
            onClick={() => handleStoryClick(index)}
          >
            {/* Story thumbnail */}
            <div className="h-14 w-14 overflow-hidden rounded-full ring-2 ring-blue-500">
              <div
                className="h-full w-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${story.thumbnail || story.url})`,
                }}
              />
            </div>
            {/* Story owner name */}
            <span className="mt-1 block text-center text-xs text-gray-600 dark:text-gray-400">
              {story.owner}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Stories viewer */}
      {isViewerOpen && (
        <StoriesViewer
          stories={stories}
          initialIndex={selectedStoryIndex}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default Stories;
