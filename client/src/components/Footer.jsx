import Container from './Container'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-white/10 py-14">
      <Container className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <a href="#top" className="font-heading text-2xl text-primaryText" data-cursor-hover>
            WARDOM<span className="text-accent">.</span>
          </a>
          <p className="mt-3 max-w-md text-sm leading-7 text-secondaryText">
            Premium digital experiences for software companies that want their product to feel as refined as their ambition.
          </p>
        </div>

        <div className="flex flex-wrap gap-6 text-sm text-secondaryText">
          <a href="#work" data-cursor-hover className="transition-colors hover:text-primaryText">Work</a>
          <a href="#services" data-cursor-hover className="transition-colors hover:text-primaryText">Services</a>
          <a href="#contact" data-cursor-hover className="transition-colors hover:text-primaryText">Contact</a>
          <a href="/admin" data-cursor-hover className="transition-colors hover:text-accent">Admin</a>
        </div>

        <p className="font-mono-num text-xs uppercase tracking-[0.25em] text-secondaryText">
          © {year} WARDOM Studio
        </p>
      </Container>
    </footer>
  )
}
