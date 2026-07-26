export default function Section({ id, children, className = '', eyebrow }) {
  return (
    <section id={id} className={`relative py-24 sm:py-28 lg:py-32 ${className}`}>
      {eyebrow && (
        <div className="mx-auto mb-8 flex max-w-7xl items-center gap-3 px-6 md:px-10">
          <span className="h-px w-8 bg-accent" />
          <span className="font-mono-num text-xs uppercase tracking-[0.25em] text-accent">
            {eyebrow}
          </span>
        </div>
      )}
      {children}
    </section>
  )
}
