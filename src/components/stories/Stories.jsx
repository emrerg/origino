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
 */

/** @type {Reel[]} */
const reels = [
  {
    id: "1",
    type: "video",
    videoId: "7_K3gzTatl0",
    title: "Olive Oil Production",
  },
  {
    id: "2",
    type: "video",
    videoId: "eqA_voXY_gA",
    title: "Olive Oil Production",
  },
  {
    id: "3",
    type: "video",
    videoId: "eqA_voXY_gA",
    title: "Olive Oil Production",
  },
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
    }

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
      },
      events: {
        onReady: (event) => {
          event.target.playVideo()
          updateProgress(event.target)
        },
        onStateChange: (event) => {
          if (event.data === window.YT.PlayerState.ENDED) {
            goToNext()
          }
        }
      }
    })
  }

  const updateProgress = (player) => {
    progressInterval.current = setInterval(() => {
      const currentTime = player.getCurrentTime()
      const duration = player.getDuration()
      const calculatedProgress = (currentTime / duration) * 100
      setProgress(calculatedProgress)
    }, 100)
  }

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % reels.length
    setCurrentIndex(nextIndex)
    setProgress(0)
    loadVideo(nextIndex)
  }

  const goToPrevious = () => {
    const prevIndex = (currentIndex - 1 + reels.length) % reels.length
    setCurrentIndex(prevIndex)
    setProgress(0)
    loadVideo(prevIndex)
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="relative w-full h-full max-w-3xl mx-auto">
        <button
          className="absolute top-4 right-4 z-20 text-white hover:bg-white/20 p-2 rounded-full"
          onClick={handleClose}
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Close</span>
        </button>

        <div className="relative w-full h-full">
          <div id="player-container" className="w-full h-full" />

          {/* Navigation overlay */}
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <div className="w-1/2 h-full cursor-pointer" onClick={goToPrevious} />
            <div className="w-1/2 h-full cursor-pointer" onClick={goToNext} />
          </div>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <h2 className="text-white text-lg font-semibold">{reels[currentIndex].title}</h2>
          </div>

          {/* Progress bars */}
          <div className="absolute top-0 left-0 right-0 flex gap-1 p-4">
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
  )
}

