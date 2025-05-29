import "@/styles/globals.css";
import { AnimatePresence, MotionConfig } from "motion/react"

export default function App({ Component, pageProps, router }) {
  return (
    <MotionConfig reducedMotion="user">
      <Component key={router.route} {...pageProps} />
    </MotionConfig>
  )
}
