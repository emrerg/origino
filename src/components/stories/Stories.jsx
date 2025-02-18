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

const videoSets = {
  picked: [
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
      src: "https://origino-journey.s3.us-east-2.amazonaws.com/picking-videos/picking-video-3.MOV",
      title: "Picked",
      location: "Northwest of Iznik Lake, Bursa, Turkiye"
    },
    {
      id: "3",
      type: "video",
      src: "https://origino-journey.s3.us-east-2.amazonaws.com/picking-videos/picking-video-4.MOV",
      title: "Picked",
      location: "Northwest of Iznik Lake, Bursa, Turkiye"
    },
    {
      id: "4",
      type: "video",
      src: "https://origino-journey.s3.us-east-2.amazonaws.com/picking-videos/picking-video-5.MOV",
      title: "Picked",
      location: "Northwest of Iznik Lake, Bursa, Turkiye"
    }
  ],
  packed: [
    {
      id: "1",
      type: "video",
      src: "https://origino-journey.s3.us-east-2.amazonaws.com/pressing-videos/pressing-video-1.MOV",
      title: "Packed",
      location: "Biziz Foods Ltd, Bursa, Turkiye"
    },
    {
      id: "2",
      type: "video",
      src: "https://origino-journey.s3.us-east-2.amazonaws.com/pressing-videos/pressing-video-2.MOV",
      title: "Packed",
      location: "Biziz Foods Ltd, Bursa, Turkiye"
    },
    {
      id: "3",
      type: "video",
      src: "https://origino-journey.s3.us-east-2.amazonaws.com/pressing-videos/pressing-video-3.MOV",
      title: "Packed",
      location: "Biziz Foods Ltd, Bursa, Turkiye"
    },
    {
      id: "4",
      type: "video",
      src: "https://origino-journey.s3.us-east-2.amazonaws.com/pressing-videos/pressing-video-4.MOV",
      title: "Packed",
      location: "Biziz Foods Ltd, Bursa, Turkiye"
    },
    {
      id: "5",
      type: "video",
      src: "https://origino-journey.s3.us-east-2.amazonaws.com/pressing-videos/pressing-video-5.MOV",
      title: "Packed",
      location: "Biziz Foods Ltd, Bursa, Turkiye"
    }
  ]
}

export default function Stories({ section = 'picked', onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const videoRef = useRef(null)
  const progressInterval = useRef(null)

  const reels = videoSets[section] || []

  useEffect(() => {
    if (!videoSets[section]) {
      console.error(`No videos found for section: ${section}`);
      setError(`No videos available for ${section} section`);
      return;
    }

    const loadAndPlayVideo = async () => {
      if (videoRef.current) {
        try {
          setIsLoading(true)
          setError(null)

          // Reset video
          videoRef.current.currentTime = 0
          await videoRef.current.load()

          // Try to play
          await videoRef.current.play()
          setIsLoading(false)
          updateProgress()
        } catch (error) {
          console.error("Video playback failed:", error)
          setError("Failed to play video")
          setIsLoading(false)
        }
      }
    }

    loadAndPlayVideo()

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
      if (videoRef.current) {
        videoRef.current.pause()
      }
    }
  }, [currentIndex, section])

  const updateProgress = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current)
    }

    progressInterval.current = setInterval(() => {
      if (videoRef.current) {
        try {
          const currentTime = videoRef.current.currentTime
          const duration = videoRef.current.duration
          if (duration > 0) {
            setProgress((currentTime / duration) * 100)
          }
        } catch (error) {
          console.error("Error updating progress:", error)
        }
      }
    }, 100)
  }

  const goToNext = () => {
    if (currentIndex < reels.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      handleClose()
    }
    setProgress(0)
  }

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setProgress(0)
    }
  }

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
    setIsVisible(false)
    if (onClose) onClose()
  }

  const handleVideoEnd = () => {
    goToNext()
  }

  if (!isVisible) return null

  const currentReel = reels[currentIndex]

  return (
    <div className="fixed inset-0 bg-black z-50">
      <div className="relative w-full h-full">
        <button
          className="absolute top-4 right-4 z-20 text-white hover:bg-white/20 p-2 rounded-full"
          onClick={handleClose}
          aria-label="Close stories"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="relative w-full h-full">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white">Loading...</div>
            </div>
          )}
          
          {error && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white bg-red-500 p-4 rounded">{error}</div>
            </div>
          )}

          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src={currentReel?.src}
            playsInline
            muted
            preload="auto"
            onEnded={handleVideoEnd}
            onError={(e) => {
              console.error("Video error:", e)
              setError("Failed to load video")
              setIsLoading(false)
            }}
            onLoadStart={() => setIsLoading(true)}
            onLoadedData={() => setIsLoading(false)}
          />

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

          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-4">
            <div className="inline-flex items-center">
              <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center space-x-2">
                {currentReel?.title === "Picked" && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {currentReel?.title === "Packed" && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" />
                  </svg>
                )}
                <span className="text-white">
                  {currentReel?.title} - {currentReel?.location}
                </span>
              </div>
            </div>

            <div className="flex gap-1">
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

