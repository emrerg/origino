"use client"

import { useState, useRef, useEffect } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { event } from '@/lib/gtag'

/**
 * @typedef {Object} Reel
 * @property {string} id
 * @property {"video" | "image"} type
 * @property {string} videoId
 * @property {number} likes
 * @property {number} comments
 * @property {string} title
 * @property {string} src
 * @property {string} location
 * @property {string} date
 */

/** @type {Reel[]} */
const reels = [
  {
    id: "1",
    type: "video",
    src: "https://origino-journey.s3.us-east-2.amazonaws.com/picking-videos/picking-video-2.MOV",
    title: "Picked",
    location: "Northwest of Iznik Lake, Bursa, Turkiye"
  },
  {
    id: "2",
    type: "video",
    src: "https://origino-journey.s3.us-east-2.amazonaws.com/pressing-videos/pressing-video-1.MOV",
    title: "Pressed",
    location: "Miras Olive Oil Mill, Bursa, Turkiye"
  },
  {
    id: "3",
    type: "video",
    src: "https://origino-journey.s3.us-east-2.amazonaws.com/packing-videos/packing-video-1.MOV",
    title: "Packed",
    location: "Biziz Foods Ltd, Bursa, Turkiye"
  }
]

export default function Stories() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef(null)
  const progressInterval = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video playback failed:", error)
      })
      
      updateProgress()
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }
  }, [currentIndex])

  const updateProgress = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current)
    }

    progressInterval.current = setInterval(() => {
      if (videoRef.current) {
        const currentTime = videoRef.current.currentTime
        const duration = videoRef.current.duration
        if (duration > 0) {
          setProgress((currentTime / duration) * 100)
        }
      }
    }, 100)
  }

  const goToNext = () => {
    handleStoryInteraction('next_story', currentIndex)
    const nextIndex = (currentIndex + 1) % reels.length
    setCurrentIndex(nextIndex)
    setProgress(0)
  }

  const goToPrevious = () => {
    handleStoryInteraction('previous_story', currentIndex)
    const prevIndex = (currentIndex - 1 + reels.length) % reels.length
    setCurrentIndex(prevIndex)
    setProgress(0)
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  const handleVideoEnd = () => {
    handleVideoProgress(1, currentIndex)
    goToNext()
  }

  const handleStoryInteraction = (action, storyIndex) => {
    event({
      action: action,
      category: 'story_engagement',
      label: `story_${storyIndex + 1}`,
      value: storyIndex
    })
  }

  const handleVideoProgress = (progress, storyIndex) => {
    event({
      action: 'video_progress',
      category: 'story_engagement',
      label: `story_${storyIndex + 1}`,
      value: Math.floor(progress * 100)
    })
  }

  if (!isVisible) return null

  const currentReel = reels[currentIndex]

  return (
    <div 
      className="fixed inset-0 bg-black z-50" 
      role="dialog"
      aria-modal="true"
      aria-label="Story viewer"
    >
      <div className="relative w-full h-full">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 z-20 text-white hover:bg-white/20 p-2 rounded-full"
          onClick={handleClose}
          aria-label="Close stories"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Video Container */}
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src={currentReel.src}
            autoPlay
            playsInline
            muted
            onEnded={handleVideoEnd}
            aria-label={`Story ${currentIndex + 1} of ${reels.length}: ${currentReel.title}`}
          />

          {/* Navigation overlay */}
          <div className="absolute inset-0 flex items-center justify-between">
            <button 
              className="w-1/2 h-full cursor-pointer" 
              onClick={goToPrevious}
              aria-label="Previous story"
            />
            <button 
              className="w-1/2 h-full cursor-pointer" 
              onClick={goToNext}
              aria-label="Next story"
            />
          </div>

          {/* Title and Progress Bar Overlay */}
          <div 
            className="absolute bottom-0 left-0 right-0 p-4 space-y-4"
            aria-live="polite"
          >
            <div className="inline-flex items-center">
              <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center space-x-2">
                {currentReel.title === "Picked" && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {currentReel.title === "Pressed" && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
                {currentReel.title === "Packed" && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" />
                  </svg>
                )}
                <span className="text-white text-lg" role="status">
                  {currentReel.title} - {currentReel.location}
                </span>
              </div>
            </div>

            {/* Progress bars */}
            <div 
              className="flex gap-1" 
              role="progressbar" 
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={progress}
              aria-label={`Story progress: ${Math.round(progress)}%`}
            >
              {reels.map((_, index) => (
                <div key={index} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-100 ease-linear"
                    style={{
                      width: index === currentIndex ? `${progress}%` : 
                             index < currentIndex ? '100%' : '0%'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

