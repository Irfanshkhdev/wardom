import Container from './Container'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[#E5E7EB] dark:border-[#27272A] bg-white dark:bg-[#090A0F] pt-16 pb-12 text-[#0F0F0F] dark:text-white transition-colors duration-200">
      <Container>
        {/* Massive Brand Name Display Header */}
        <div className="border-b border-[#E5E7EB] dark:border-[#27272A] pb-12 text-center sm:text-left">
          <h2 className="text-6xl font-extrabold tracking-tighter text-[#0F0F0F] dark:text-white sm:text-8xl lg:text-[11rem] leading-none select-none">
            WARDOM<span className="text-[#5F8D3B]">.</span>
          </h2>
          <p className="mt-4 text-xs font-mono font-bold uppercase tracking-widest text-[#999999] dark:text-gray-400">
            DIGITAL PRODUCTS · WEBSITES · FULL-STACK APPS · MOBILE APPS · AI AUTOMATIONS
          </p>
        </div>

        {/* Sub Footer Links & Admin Access */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs font-semibold text-[#555555] dark:text-gray-400">
          <div className="flex flex-wrap items-center gap-6">
            <a href="/projects" className="hover:text-[#5F8D3B] dark:hover:text-[#7BAE47]">Work</a>
            <a href="/pricing" className="hover:text-[#5F8D3B] dark:hover:text-[#7BAE47]">Pricing</a>
            <a href="/about" className="hover:text-[#5F8D3B] dark:hover:text-[#7BAE47]">About</a>
            <a href="#testimonials" className="hover:text-[#5F8D3B] dark:hover:text-[#7BAE47]">Reviews</a>
            <a href="#contact" className="hover:text-[#5F8D3B] dark:hover:text-[#7BAE47]">Contact</a>
            <a href="/admin" className="text-[#5F8D3B] dark:text-[#7BAE47] hover:underline font-bold">Admin Console</a>
          </div>

          <p>© {year} WARDOM Studio. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  )
}
