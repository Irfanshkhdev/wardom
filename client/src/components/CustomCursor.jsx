import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const cx = useMotionValue(-100)
  const cy = useMotionValue(-100)
  const springX = useSpring(cx, { stiffness: 500, damping: 40 })
  const springY = useSpring(cy, { stiffness: 500, damping: 40 })

  useEffect(() => {
    const move = (e) => {
      cx.set(e.clientX)
      cy.set(e.clientY)
    }
    const over = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) setIsHovering(true)
    }
    const out = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) setIsHovering(false)
    }
    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
    }
  }, [cx, cy])

  return (
    <motion.div
      className="custom-cursor pointer-events-none fixed left-0 top-0 z-[70] rounded-full mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        backgroundColor: '#F4F1EC',
      }}
      animate={{
        width: isHovering ? 56 : 14,
        height: isHovering ? 56 : 14,
        opacity: isHovering ? 0.9 : 0.6,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    />
  )
}
