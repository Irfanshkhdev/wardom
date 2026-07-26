export default function EmptyState({ title, description, action }) {
  return (
    <div className="rounded-[24px] border border-dashed border-white/10 bg-black/10 p-8 text-center">
      <p className="text-lg font-semibold text-white">{title}</p>
      {description ? <p className="mt-2 text-sm leading-7 text-white/60">{description}</p> : null}
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </div>
  )
}
