export default function Section({ id, children, className = '', label, title, description, centered = false }) {
  return (
    <section id={id} className={`relative py-24 lg:py-36 ${className}`}>
      {(label || title || description) && (
        <div className={`mx-auto mb-16 max-w-7xl px-6 md:px-10 ${centered ? 'text-center' : ''}`}>
          {label && (
            <span className={`mb-3 inline-block font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#5F8D3B] ${centered ? 'mx-auto' : ''}`}>
              {label}
            </span>
          )}
          {title && (
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0F0F0F] sm:text-4xl lg:text-5xl leading-[1.1]">
              {title}
            </h2>
          )}
          {description && (
            <p className={`mt-4 max-w-2xl text-base leading-relaxed text-[#555555] sm:text-lg ${centered ? 'mx-auto' : ''}`}>
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  )
}
