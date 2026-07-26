export default function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-white/55">{eyebrow}</p>
        <h1 className="mt-2 text-2xl font-semibold text-white">{title}</h1>
        {description ? <p className="mt-2 max-w-2xl text-sm leading-7 text-white/65">{description}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  )
}
