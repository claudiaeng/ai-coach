import React, { useRef, useEffect, use } from "react"
import { usePoseDetection } from "../../hooks/usePoseDetection"
import styles from "@/components/onboarding/Onboarding.module.css"

const PoseDetector: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const {
    createDetector,
    analyzeImbalances,
    analyzePosture,
    imbalances,
    postureProblems,
  } = usePoseDetection()

  useEffect(() => {
    createDetector()

    if (!videoRef.current || !canvasRef.current) {
      return
    }

    const video = videoRef.current
    const ctx = canvasRef.current.getContext("2d")

    if (!ctx) {
      return // Make sure the context is available
    }

    const resolution_vga = {
      width: { exact: 640 },
      height: { exact: 480 },
    }

    const analyzeInterval = setInterval(() => {
      if (
        videoRef.current &&
        canvasRef.current &&
        video.videoWidth > 0 &&
        video.videoHeight > 0
      ) {
        try {
          analyzeImbalances(videoRef.current, ctx)
          analyzePosture(videoRef.current, ctx)
        } catch (error) {
          console.error("Error analyzing imbalances:", error)
        }
      }
    }, 1000)

    navigator.mediaDevices
      .getUserMedia({ video: resolution_vga, audio: false })
      .then((stream) => {
        video.srcObject = stream
        video.onloadedmetadata = () => {
          if (
            canvasRef.current &&
            video.videoWidth > 0 &&
            video.videoHeight > 0
          ) {
            video.width = video.videoWidth
            video.height = video.videoHeight
            canvasRef.current.width = video.videoWidth
            canvasRef.current.height = video.videoHeight
            analyzeImbalances(video, ctx)
            analyzePosture(video, ctx)
          }
        }
      })
      .catch((error) => {
        console.log(error)
        alert("No camera found")
      })

    // Cleanup function to stop the loop when the component unmounts
    return () => {
      clearInterval(analyzeInterval) // Clear the interval
      if (video && video.srcObject) {
        const stream: MediaStream = video.srcObject as MediaStream
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  return (
    <div className={styles.poseDetectorDiv}>
      <>
        <div style={{ position: "relative", width: "640px", height: "480px" }}>
          <video
            ref={videoRef}
            autoPlay
            muted
            style={{ position: "absolute", width: "640px", height: "480px" }}
          />
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              width: "640px",
              height: "480px",
              backgroundColor: "transparent",
            }}
          />
        </div>
      </>
      <div>
        <h3>Findings:</h3>
        {imbalances.map((finding, index) => (
          <p key={index}>{finding}</p>
        ))}
        {postureProblems.map((finding, index) => (
          <p key={index}>{finding}</p>
        ))}
      </div>
    </div>
  )
}

export default PoseDetector
