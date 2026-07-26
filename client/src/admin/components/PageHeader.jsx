export default function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between border-b border-[#27272A] pb-5">
      <div>
        <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#7BAE47]">{eyebrow}</p>
        <h1 className="mt-1 text-2xl font-bold text-white">{title}</h1>
        {description ? <p className="mt-1 max-w-xl text-xs text-zinc-400">{description}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  )
}
