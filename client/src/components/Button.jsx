import MagneticButton from './MagneticButton'

export default function Button({ children, variant = 'primary', href, onClick, type = 'button', className = '' }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium font-body tracking-wide transition-all duration-300'

  const variants = {
    primary: 'bg-accent text-background hover:bg-[#f0c67f]',
    outline: 'border border-white/12 bg-white/[0.04] text-primaryText hover:border-accent hover:text-accent',
    ghost: 'text-secondaryText hover:text-primaryText',
  }

  const classes = `${base} ${variants[variant]} ${className}`

  const content = href ? (
    <a href={href} className={classes}>
      {children}
    </a>
  ) : (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  )

  return <MagneticButton>{content}</MagneticButton>
}
