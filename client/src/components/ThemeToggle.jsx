import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle color theme"
      data-cursor-hover
      className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition-colors hover:border-clay hover:text-clay"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
