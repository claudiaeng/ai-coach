import React, { useRef, useEffect } from "react"
import styles from "@/components/onboarding/Onboarding.module.css"
import PoseDetector from "@/components/onboarding/PoseDetector"

const Onboarding: React.FC = () => {
  return (
    <>
      <div className={styles.mainDiv}>
        <div className={styles.titleDiv}>
          <h1>Form</h1>
        </div>
        <div className={styles.greyDiv}>
          <div className={styles.aboutDiv}>
            <div>
              <h2>Let's learn about your body</h2>
              <br />
              <span>
                Power your workouts with AI to finally solve asymmetries and
                muscular imbalances [while getting stronger].
              </span>
              <br /> <br />
            </div>

            <p>
              Say goodbye to injuries, undertraining, overtraining, feeling
              weak, guesswork, wasted time, and wasted money.
            </p>
          </div>
          <div className={styles.webcamDiv}>
            <PoseDetector />
          </div>
        </div>
      </div>
    </>
  )
}

export default Onboarding
