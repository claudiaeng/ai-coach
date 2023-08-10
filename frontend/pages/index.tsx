import { useEffect, useState } from "react"
import styles from "@/styles/Home.module.css"

const Home = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <>
      <div className={`${styles.container} ${loaded ? styles.rise : ""}`}>
        <div className={styles.text}>
          <h1 className={styles.typewriter}>Good morning, John</h1>
          <br />
          <h1 className={styles.typewriter}>
            <span>7-8am</span> start your day:
          </h1>
          <h1 className={styles.typewriter}>
            — <span>Meditate</span>, 5 minutes
          </h1>
          <h1 className={styles.typewriter}>
            — <span>Creative task</span>, 5 minutes
          </h1>
          <h1 className={styles.typewriter}>
            — Alternating <span>hot and cold shower</span>
          </h1>
          <h1 className={styles.typewriter}>
            — <span>Light stretching</span> before work
          </h1>
          <br />
          <h1 className={styles.typewriter}>
            <span>12-1pm</span> lunchtime:
          </h1>
          <h1 className={styles.typewriter}>
            — Your ideal lunch today is <span>salmon and quinoa</span>
          </h1>
          <h1 className={styles.typewriter}>
            — <span>Box breathing</span>, 5 minutes
          </h1>
          <h1 className={styles.typewriter}>
            — Supplement <span>amino acids</span>
          </h1>
          <br />
          <h1 className={styles.typewriter}>
            Your exercise routine is attached below. <br />* The ideal time to
            go is 4-5pm.
          </h1>
          <br />
          <h1 className={styles.typewriter}>
            <span>6-8pm</span> evening:
          </h1>
          <h1 className={styles.typewriter}>
            — <span>Evaluate day and goals</span>, 15 minutes
          </h1>

          <br />

          <h1 className={styles.typewriter}>
            Is there anything you want to work on tomorrow?
          </h1>
          <br />
          <br />
        </div>
      </div>
      <div className={styles.cta}>
        <div className={styles.ctaText}>
          <h1 className={styles.normalText}>
            Get a message like this <span>every morning.</span>
            <br /> Tailored to <span>your</span> goals and lifestyle.
            <br />
            <br />
            <br />
            The smartest health and wellness AI coach is
            <span> finally here.</span>
            <br />
            It will replace your:
            <br />
            <div className={styles.list}>
              <br />
              <p>Apps</p>
              <p>Spreadsheets</p> <p>Health coaches</p>
              <p>Life coaches</p> <p>Trainers</p>
            </div>
            <br />
            <br />
            Only AI and ML can give you the power to:
            <div className={styles.list}>
              <br />
              <p>
                Understand your health holistically <span>and</span>{" "}
                scientifically
              </p>
              <p>Make progress every single day</p>{" "}
              <p>
                Keep <span>all</span> your health goals in mind at once
              </p>
              <p>Focus on accomplishing instead of planning</p>{" "}
              <p>Compound your progress and see results faster</p>
            </div>
          </h1>
        </div>
      </div>
    </>
  )
}

export default Home
