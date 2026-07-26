export default function FormCard({ title, children }) {
  return (
    <div className="mt-8 rounded-2xl border border-[#27272A] bg-[#18181B] p-5">
      {title && <h3 className="mb-4 text-sm font-bold text-white uppercase tracking-wider">{title}</h3>}
      {children}
    </div>
  )
}
