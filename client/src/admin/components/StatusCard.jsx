export default function StatusCard({ label, value, tint = 'border-zinc-700 bg-zinc-800/40 text-white' }) {
  return (
    <div className={`rounded-xl border p-5 ${tint}`}>
      <span className="font-mono text-[11px] font-bold uppercase tracking-wider block opacity-80">
        {label}
      </span>
      <div className="mt-2 text-3xl font-extrabold text-white">{value}</div>
    </div>
  )
}
