import { Link } from 'react-router-dom'
import Container from '../components/Container'
import Section from '../components/Section'

export default function NotFound() {
  return (
    <Section id="not-found" eyebrow="404">
      <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="font-mono-num text-sm uppercase tracking-[0.3em] text-accent">Page not found</p>
        <h1 className="mt-4 font-heading text-4xl text-primaryText md:text-6xl">This page doesn’t exist.</h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-secondaryText">
          The URL may be outdated or the page may have moved. Return to the studio home and continue exploring.
        </p>
        <Link to="/" className="mt-8 inline-flex items-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-background">
          Back home
        </Link>
      </Container>
    </Section>
  )
}
