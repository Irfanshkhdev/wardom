export default function StatusCard({ label, value, tint = 'bg-white/10 text-white' }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
      <div className={`inline-flex rounded-full px-3 py-1 text-xs uppercase tracking-[0.24em] ${tint}`}>
        {label}
      </div>
      <div className="mt-4 text-3xl font-semibold text-white">{value}</div>
    </div>
  )
}
