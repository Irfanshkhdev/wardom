import MagneticButton from './MagneticButton'

export default function Button({ children, variant = 'primary', href, onClick, type = 'button', className = '', ...props }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-xs sm:text-sm font-semibold tracking-tight transition-all duration-200 active:scale-[0.98]'

  const variants = {
    primary: 'bg-[#5F8D3B] text-white hover:bg-[#527C32] shadow-[0_2px_10px_rgba(95,141,59,0.25)]',
    secondary: 'bg-white text-[#0F0F0F] border border-[#E5E7EB] hover:border-[#D1D5DB] hover:bg-[#FAFAFA]',
    outline: 'bg-transparent text-[#0F0F0F] border border-[#E5E7EB] hover:border-[#5F8D3B] hover:text-[#5F8D3B]',
    ghost: 'text-[#555555] hover:text-[#0F0F0F] hover:bg-[#F4F4F5]',
    dark: 'bg-[#0F0F0F] text-white hover:bg-[#27272A]',
  }

  const classes = `${base} ${variants[variant] || variants.primary} ${className}`

  const content = href ? (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  ) : (
    <button type={type} onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  )

  return <MagneticButton>{content}</MagneticButton>
}
