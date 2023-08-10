import type { AppProps } from "next/app"
import "@/styles/globals.css"
import localFont from "next/font/local"
// import { UserProvider } from "@auth0/nextjs-auth0/client"
import React from "react"

export const font = localFont({
  src: [
    {
      path: "../fonts/HelveticaNeueLTStd.otf",
      weight: "400",
      style: "normal",
    },
  ],
})

export const secondaryFont = localFont({
  src: [
    {
      path: "../fonts/SuisseIntl-Regular.ttf",
      weight: "300",
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
          font-family: ${secondaryFont.style.fontFamily};
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: ${font.style.fontFamily};
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
