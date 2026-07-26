import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader() {
  const [done, setDone] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.random() * 18)
        if (next >= 100) {
          clearInterval(interval)
          window.setTimeout(() => setDone(true), 350)
          return 100
        }
        return next
      })
    }, 120)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <motion.h1
            className="font-heading text-4xl italic text-cream"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            WARDOM
          </motion.h1>
          <div className="mt-6 h-px w-40 overflow-hidden bg-cream/10">
            <motion.div
              className="h-full bg-clay"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="mt-3 font-mono-num text-xs text-cream/50">
            {Math.floor(progress)}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
