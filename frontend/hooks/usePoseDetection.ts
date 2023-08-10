import * as poseDetection from "@tensorflow-models/pose-detection"
import "@tensorflow/tfjs-backend-webgl"
import { useState } from "react"

export const usePoseDetection = () => {
  const [imbalances, setImbalances] = useState<string[]>([])
  const [postureProblems, setPostureProblems] = useState<string[]>([])

  const detectorConfig: poseDetection.PosenetModelConfig = {
    architecture: "ResNet50",
    outputStride: 16,
    inputResolution: { width: 257, height: 200 },
    quantBytes: 2,
  }

  let detector: poseDetection.PoseDetector | null = null

  const createDetector = async () => {
    detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.PoseNet,
      detectorConfig
    )
  }

  const drawKeypoints = (
    keypoints: poseDetection.Keypoint[],
    ctx: CanvasRenderingContext2D,
    scale: number = 1
  ) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    keypoints.forEach((keypoint) => {
      if (keypoint.score !== undefined && keypoint.score > 0.5) {
        ctx.beginPath()
        ctx.arc(keypoint.x * scale, keypoint.y * scale, 5, 0, 2 * Math.PI) // draw a circle at the keypoint
        ctx.fillStyle = "blue"
        ctx.fill()
      }
    })
  }

  const analyzeImbalances = async (
    image: HTMLVideoElement,
    ctx: CanvasRenderingContext2D
  ) => {
    setImbalances([])
    const newImbalances: string[] = []

    if (detector) {
      const estimationConfig: poseDetection.PoseNetEstimationConfig = {
        maxPoses: 5,
        flipHorizontal: false,
        scoreThreshold: 0.5,
        nmsRadius: 20,
      }

      const poses = await detector.estimatePoses(image, estimationConfig)

      poses.forEach((pose) => {
        // Shoulders
        const leftShoulder = pose.keypoints.find(
          (kp) =>
            kp.score !== undefined &&
            kp.score > 0.5 &&
            kp.name === "left_shoulder"
        )
        const rightShoulder = pose.keypoints.find(
          (kp) =>
            kp.score !== undefined &&
            kp.score > 0.5 &&
            kp.name === "right_shoulder"
        )

        if (leftShoulder && rightShoulder) {
          const difference = Math.abs(leftShoulder.y - rightShoulder.y)

          if (difference > 2) {
            //TODO: adjust based on findings
            // threshold could be a value like 5 or 10, depending on your requirements
            newImbalances.push("Asymmetry detected in shoulders")
          }
        }

        // Hips
        const leftHip = pose.keypoints.find(
          (kp) =>
            kp.score !== undefined && kp.score > 0.5 && kp.name === "left_hip"
        )
        const rightHip = pose.keypoints.find(
          (kp) =>
            kp.score !== undefined && kp.score > 0.5 && kp.name === "right_hip"
        )

        if (leftHip && rightHip && leftHip.score && rightHip.score) {
          const differenceHip = Math.abs(leftHip.y - rightHip.y)

          if (differenceHip > 2) {
            //TODO: adjust based on findings
            newImbalances.push("Asymmetry detected in hips")
          }
        }
        drawKeypoints(pose.keypoints, ctx)
        setImbalances(newImbalances)
        // Additional logic to identify other asymmetries or imbalances...
      })
    }
  }

  // Function to analyze side profile posture based on keypoints.
  const analyzePosture = async (
    image: HTMLVideoElement,
    ctx: CanvasRenderingContext2D
  ) => {
    setPostureProblems([])
    const newPostureProblems: string[] = []
    const threshold = 2 // Define a threshold for acceptable alignment.
    const idealSpineXPosition = 100 // Example value for ideal spine alignment.

    if (detector) {
      const estimationConfig: poseDetection.PoseNetEstimationConfig = {
        maxPoses: 5,
        flipHorizontal: false,
        scoreThreshold: 0.5,
        nmsRadius: 20,
      }

      const poses = await detector.estimatePoses(image, estimationConfig)

      poses.forEach((pose) => {
        // Find the keypoints for different body parts.
        const ear = pose.keypoints.find(
          (kp) => kp.name === "left_ear" || kp.name === "right_ear"
        )
        const shoulder = pose.keypoints.find(
          (kp) => kp.name === "left_shoulder" || kp.name === "right_shoulder"
        )

        //TODO: add spine
        const spine = pose.keypoints.find((kp) => kp.name === "spine") // Update based on actual keypoint name

        const hip = pose.keypoints.find(
          (kp) => kp.name === "left_hip" || kp.name === "right_hip"
        )
        const knee = pose.keypoints.find(
          (kp) => kp.name === "left_knee" || kp.name === "right_knee"
        )
        const ankle = pose.keypoints.find(
          (kp) => kp.name === "left_ankle" || kp.name === "right_ankle"
        )

        // Check if the keypoints exist before attempting to access their properties.
        if (!ear || !shoulder || !hip || !knee || !ankle) {
          return "Some keypoints are missing"
        }

        // Check alignment and return appropriate messages.
        // You may adjust these checks based on the specific needs of your application.
        if (Math.abs(ear.y - shoulder.y) > threshold) {
          newPostureProblems.push("Head is not aligned with shoulders")
        }

        // if (Math.abs(spine.x - idealSpineXPosition) > threshold) {
        //   newPostureProblems.push("Spine is not aligned")
        // }

        if (
          Math.abs(hip.x - knee.x) > threshold ||
          Math.abs(hip.x - ankle.x) > threshold
        ) {
          newPostureProblems.push("Legs are not aligned")
        }

        setPostureProblems(newPostureProblems)
      })
    }
  }

  return {
    createDetector,
    analyzeImbalances,
    analyzePosture,
    imbalances,
    postureProblems,
  }
}
