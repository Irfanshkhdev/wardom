export default function FormCard({ title, children, className = '' }) {
  return (
    <div className={`rounded-[28px] border border-white/10 bg-white/[0.04] p-5 ${className}`.trim()}>
      {title ? <p className="text-sm uppercase tracking-[0.3em] text-white/55">{title}</p> : null}
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  )
}
