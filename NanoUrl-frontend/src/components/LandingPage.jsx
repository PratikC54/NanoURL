import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStoreContext } from '../contextApi/ContextApi';
import api from '../api/api'
import { toast } from 'react-hot-toast';

const features = [
  {
    title: 'Paste and go',
    description: 'Copy any long link from your browser, app, or message — paste it here and you are done.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9 9 9 0 00-9 9v3.375c0 .621.504 1.125 1.125 1.125h3.375m0-13.5h.008v.008H12v-.008z" />
      </svg>
    ),
  },
  {
    title: 'Easy to share',
    description: 'Send your short link in texts, posts, emails, or your bio — it fits where long links do not.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
      </svg>
    ),
  },
  {
    title: 'Always works',
    description: 'When someone opens your short link, they land on the same page you shared. No surprises.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Use on any device',
    description: 'Shorten links on your phone, tablet, or computer — the site works great on all of them.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
  },
]

const steps = [
  { num: '1', label: 'Paste your long link', detail: 'Copy the full web address you want to shorten.' },
  { num: '2', label: 'Tap Shorten', detail: 'We create a shorter link that points to the same place.' },
  { num: '3', label: 'Copy and share', detail: 'Send it in a message, post, or anywhere you like.' },
]

const useCases = [
  { label: 'Text messages', emoji: '💬' },
  { label: 'Social posts', emoji: '📱' },
  { label: 'Email', emoji: '✉️' },
  { label: 'Profile bio', emoji: '🔗' },
]

const demoShort = `${import.meta.env.VITE_FRONTEND_URL || 'https://example.com'}/abc123`

function LandingPage() {
  const [url, setUrl] = useState('')
  const [shortened, setShortened] = useState(false)
  const [copied, setCopied] = useState(false)
  const { token } = useStoreContext();

  const navigate = useNavigate()

  const frontendOrigin = import.meta.env.VITE_FRONTEND_URL || window.location.origin
  const backendOrigin = (import.meta.env.VITE_BACKEND_URL || window.location.origin).replace(/\/$/, '')

  const [displayShortLink, setDisplayShortLink] = useState('')
  const [backendShortLink, setBackendShortLink] = useState('')

  const handleShorten = async (e) => {
    
    e.preventDefault()
    if (!url.trim()) return

    if (!token) {
      // require authentication to shorten — send user to login
      navigate('/login')
      return
    }

    try {
      const res = await api.post('/api/urls/shorten', { originalUrl: url }, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const shortUrl = res?.data?.shorturl || res?.data?.shortUrl || res?.data?.short_url
      if (shortUrl) {
        const display = `${frontendOrigin}/${shortUrl}`
        const backend = `${backendOrigin}/${shortUrl}`
        setDisplayShortLink(display)
        setBackendShortLink(backend)
        setShortened(true)
        setCopied(false)
      }
    } catch (error) {
      navigate('/error', )
      toast.error('Failed to shorten the link. Please try again.')
    }
  }
  
  const handleCopy = () => {
    navigator.clipboard?.writeText(backendShortLink || displayShortLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const scrollToShorten = () => {
    document.getElementById('shorten')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-200 antialiased">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -left-32 top-0 h-[28rem] w-[28rem] rounded-full bg-violet-600/25 blur-[120px] animate-pulse-slow" />
        <div className="absolute right-0 top-1/4 h-[24rem] w-[24rem] rounded-full bg-cyan-500/20 blur-[100px] animate-pulse-slow animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 h-[20rem] w-[20rem] rounded-full bg-fuchsia-600/15 blur-[90px] animate-pulse-slow animation-delay-4000" />
      </div>

      <main>
        {/* Hero — shortener first */}
        <section id="shorten" className="scroll-mt-24 px-5 pb-16 pt-10 sm:px-8 sm:pt-14">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-white opacity-0 animate-fade-up sm:text-4xl md:text-5xl">
              Turn long links into{' '}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                short ones
              </span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-400 opacity-0 animate-fade-up animation-delay-150 sm:text-lg">
              Have a link that is too long to text or post? Paste it below, get a shorter link, and share it anywhere.
            </p>

            <form
              onSubmit={handleShorten}
              className="group relative mt-10 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-2 text-left shadow-2xl shadow-violet-900/20 backdrop-blur-xl transition-all duration-500 hover:border-violet-500/30 sm:rounded-3xl sm:p-3 opacity-0 animate-fade-up animation-delay-300"
            >
              <label htmlFor="long-url" className="sr-only">
                Your long link
              </label>
              <div className="flex flex-col gap-3">
                <div className="rounded-xl bg-slate-950/80 px-4 py-4 sm:rounded-2xl">
                  <p className="mb-2 text-left text-xs font-medium text-slate-500">Your long link</p>
                  <input
                    id="long-url"
                    type="url"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value)
                      setShortened(false)
                    }}
                    placeholder="https://example.com/very/long/link..."
                    className="w-full min-w-0 bg-transparent text-base text-slate-100 outline-none placeholder:text-slate-600"
                    aria-label="Paste your long link"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!url.trim()}
                  className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 py-4 text-base font-semibold text-white transition-all duration-300 hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 sm:rounded-2xl"
                >
                  Shorten my link
                </button>
              </div>

              <div
                className={`overflow-hidden transition-all duration-500 ${
                  shortened ? 'mt-3 max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-4 sm:rounded-2xl">
                  <p className="text-left text-xs font-medium text-cyan-400/90">Your short link is ready</p>
                  <p className="mt-2 break-all text-left text-lg font-medium text-white">{displayShortLink}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="flex-1 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15 sm:flex-none sm:px-6"
                    >
                      {copied ? 'Copied!' : 'Copy link'}
                    </button>
                    <a
                      href={backendShortLink || displayShortLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:text-white"
                    >
                      Test link
                    </a>
                  </div>
                </div>
              </div>
            </form>

            <p className="mt-5 text-sm text-slate-500 opacity-0 animate-fade-up animation-delay-450">
              Free to use · No technical skills needed · Works in seconds
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 opacity-0 animate-fade-up animation-delay-600">
              {useCases.map((item) => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.03] px-4 py-2 text-sm text-slate-400"
                >
                  <span aria-hidden="true">{item.emoji}</span>
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="scroll-mt-24 border-t border-white/5 px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">How it works</h2>
            <p className="mt-3 text-center text-slate-400">Three simple steps — anyone can do it.</p>

            <ol className="mt-12 flex flex-col gap-5">
              {steps.map((step) => (
                <li
                  key={step.num}
                  className="flex items-start gap-4 rounded-2xl border border-white/5 bg-slate-900/40 p-5 backdrop-blur-sm"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 text-lg font-bold text-white">
                    {step.num}
                  </span>
                  <div className="text-left">
                    <h3 className="font-semibold text-white">{step.label}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-400">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Why NanoUrl */}
        <section id="why-nanourl" className="scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Why people use NanoUrl</h2>
              <p className="mt-3 text-slate-400">Made for everyday sharing — not for coding projects.</p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {features.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 text-left backdrop-blur-sm transition-all duration-500 hover:border-violet-500/20"
                >
                  <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 p-3 text-violet-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Example comparison */}
        <section className="px-5 pb-20 sm:px-8">
          <div className="mx-auto max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-violet-950/30 p-6 sm:p-10">
            <h2 className="text-center text-xl font-bold text-white sm:text-2xl">See the difference</h2>
            <div className="mt-8 space-y-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Before — hard to share</p>
                <p className="mt-2 break-all rounded-xl bg-slate-950/80 p-4 text-sm text-slate-500 line-through decoration-slate-600">
                  https://www.example.com/products/summer-sale?utm_source=newsletter&ref=abc123&page=2
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-cyan-400/80">After — easy to share</p>
                <p className="mt-2 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4 text-lg font-medium text-cyan-200">
                  {demoShort}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={scrollToShorten}
              className="mt-8 w-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 py-4 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-all duration-300 hover:scale-[1.01] active:scale-[0.98]"
            >
              Shorten your link now
            </button>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} NanoUrl — shorten links, share with ease.
          </p>
          <Link to="/about" className="text-sm text-slate-400 transition-colors hover:text-white">
            About us
          </Link>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
