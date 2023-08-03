import type { AppProps } from "next/app"
import "@/styles/globals.css"
import localFont from "next/font/local"
import { Open_Sans } from "next/font/google"
// import { UserProvider } from "@auth0/nextjs-auth0/client"
import React from "react"

const mainFont = Open_Sans({ subsets: ["latin"] })

export const violetSans = localFont({
  src: [
    {
      path: "../fonts/VioletSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
})

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      {/* <UserProvider> */}
      <style jsx global>{`
        * {
          font-family: ${mainFont.style.fontFamily};
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: ${violetSans.style.fontFamily};
        }
      `}</style>
      <main>
        <Component {...pageProps} />
      </main>
      {/* </UserProvider> */}
    </>
  )
}

export default App
