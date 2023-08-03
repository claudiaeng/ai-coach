import { useEffect, useState } from "react"
import styles from "@/styles/Home.module.css"

const Home = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <div className={`${styles.container} ${loaded ? styles.rise : ""}`}>
      <h1 className={styles.typewriter}>Welcome to My App</h1>
    </div>
  )
}

export default Home
