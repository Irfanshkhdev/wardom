export default function Badge({ children, variant = 'default', className = '', icon: Icon }) {
  const base = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all"
  
  const variants = {
    default: "bg-[#F9FAFB] text-[#666666] border border-[#EAEAEA]",
    green: "bg-[#5F8D3B]/10 text-[#5F8D3B] border border-[#5F8D3B]/20",
    accent: "bg-[#7BAE47]/10 text-[#5F8D3B] border border-[#7BAE47]/20",
    dark: "bg-[#111111] text-white",
    outline: "bg-white text-[#111111] border border-[#EAEAEA] shadow-subtle"
  }

  return (
    <span className={`${base} ${variants[variant] || variants.default} ${className}`}>
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </span>
  )
}
