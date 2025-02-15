"use client"

import { useState, useRef, useEffect } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

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
    videoId: "7_K3gzTatl0",
    title: "Picked",
    location: "Northwest of Iznik Lake, Bursa, Turkiye"
  },
  {
    id: "2",
    type: "video",
    videoId: "dQw4w9WgXcQ",
    title: "Pressed",
    location: "Miras Olive Oil Mill, Bursa, Turkiye"
  },
  {
    id: "3",
    type: "video",
    videoId: "dNzdc-5ivKA",
    title: "Packed",
    location: "Biziz Foods Ltd, Bursa, Turkiye"
  },
  {
    id: "4",
    type: "video",
    videoId: "rk5Y0q4HUso",
    title: "Picked",
    location: "Northwest of Iznik Lake, Bursa, Turkiye"
  }
]

export default function Stories() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const playerRef = useRef(null)
  const progressInterval = useRef(null)

  const initializeYouTubePlayer = () => {
    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

      window.onYouTubeIframeAPIReady = () => {
        loadVideo(currentIndex)
      }
    } else {
      loadVideo(currentIndex)
    }
  }

  useEffect(() => {
    initializeYouTubePlayer()
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy()
      }
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }
  }, [])

  const loadVideo = (index) => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current)
    }

    if (playerRef.current) {
      playerRef.current.destroy()
      playerRef.current = null
    }

    console.log(`Loading video ${index}: ${reels[index].videoId}`)

    playerRef.current = new window.YT.Player(`player-container`, {
      videoId: reels[index].videoId,
      height: '100%',
      width: '100%',
      playerVars: {
        autoplay: 1,
        controls: 0,
        rel: 0,
        showinfo: 0,
        modestbranding: 1,
        playsinline: 1,
        mute: 1,
        enablejsapi: 1,
        loop: 0
      },
      events: {
        onReady: (event) => {
          console.log(`Video ${index} ready`)
          event.target.playVideo()
          updateProgress(event.target)
        },
        onStateChange: (event) => {
          console.log(`Video ${index} state changed to: ${event.data}`)
          if (event.data === 0) {
            console.log('Video ended, going to next')
            goToNext()
          }
        },
        onError: (event) => {
          console.error(`Error loading video ${index}:`, event)
          goToNext()
        }
      }
    })
  }

  const updateProgress = (player) => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current)
    }

    progressInterval.current = setInterval(() => {
      try {
        if (player && typeof player.getCurrentTime === 'function' && typeof player.getDuration === 'function') {
          const currentTime = player.getCurrentTime()
          const duration = player.getDuration()
          if (duration > 0) {
            const calculatedProgress = (currentTime / duration) * 100
            setProgress(calculatedProgress)

            if (duration - currentTime <= 0.5) {
              console.log('Video near end, preparing next')
              goToNext()
            }
          }
        }
      } catch (error) {
        console.error('Error updating progress:', error)
      }
    }, 100)
  }

  const goToNext = () => {
    console.log('Going to next video, current index:', currentIndex)
    const nextIndex = (currentIndex + 1) % reels.length
    console.log('Next index will be:', nextIndex)
    setCurrentIndex(nextIndex)
    setProgress(0)
    
    setTimeout(() => {
      loadVideo(nextIndex)
    }, 100)
  }

  const goToPrevious = () => {
    // Use modulo for previous as well to allow circular navigation
    const prevIndex = (currentIndex - 1 + reels.length) % reels.length
    setCurrentIndex(prevIndex)
    setProgress(0)
    loadVideo(prevIndex)
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  const currentReel = reels[currentIndex]

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="relative w-full h-full">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 z-20 text-white hover:bg-white/20 p-2 rounded-full"
          onClick={handleClose}
        >
          <X className="h-6 w-6" />
        </button>

        {/* Video Container */}
        <div className="relative w-full h-full">
          <div id="player-container" className="w-full h-full" />

          {/* Navigation overlay */}
          <div className="absolute inset-0 flex items-center justify-between">
            <div className="w-1/2 h-full cursor-pointer" onClick={goToPrevious} />
            <div className="w-1/2 h-full cursor-pointer" onClick={goToNext} />
          </div>

          {/* Title and Progress Bar Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-4">
            {/* Title with Icon in pill */}
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
                <span className="text-white text-lg">{currentReel.title}</span>
              </div>
            </div>

            {/* Progress bars */}
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

