import { Link } from 'react-router-dom'
import { FaLink, FaShareAlt, FaShieldAlt, FaBolt } from 'react-icons/fa'

const highlights = [
  {
    icon: FaLink,
    title: 'Simple URL shortening',
    description:
      'Create short, memorable links in just a few clicks. Our clean layout means you can start shortening without reading instructions.',
    gradient: 'from-blue-500/20 to-blue-600/5',
    iconColor: 'text-blue-400',
    ring: 'ring-blue-500/30',
  },
  {
    icon: FaShareAlt,
    title: 'Share anywhere',
    description:
      'Send links in texts, posts, emails, or your bio. Short URLs fit where long ones break the layout or get cut off.',
    gradient: 'from-emerald-500/20 to-emerald-600/5',
    iconColor: 'text-emerald-400',
    ring: 'ring-emerald-500/30',
  },
  {
    icon: FaShieldAlt,
    title: 'Reliable & safe',
    description:
      'Every short link opens the page you shared. Fast redirects and dependable uptime keep your audience on track.',
    gradient: 'from-violet-500/20 to-violet-600/5',
    iconColor: 'text-violet-400',
    ring: 'ring-violet-500/30',
  },
  {
    icon: FaBolt,
    title: 'Fast and responsive',
    description:
      'Lightning-quick redirects on phone or desktop. Your links stay ready whenever someone taps them.',
    gradient: 'from-amber-500/20 to-orange-600/5',
    iconColor: 'text-amber-400',
    ring: 'ring-amber-500/30',
  },
]

const values = [
  { label: 'Free to use', detail: 'No paywall for basic shortening' },
  { label: 'No jargon', detail: 'Built for real people, not developers' },
  { label: 'Works everywhere', detail: 'Phone, tablet, and desktop' },
]

function AboutPage() {
  return (
    <div className="relative min-h-[calc(100vh-64px)] overflow-x-hidden bg-slate-950 text-slate-200 antialiased">
      {/* Ambient background — matches landing */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -right-20 top-20 h-[26rem] w-[26rem] rounded-full bg-violet-600/20 blur-[110px] animate-pulse-slow" />
        <div className="absolute -left-24 bottom-1/4 h-[22rem] w-[22rem] rounded-full bg-cyan-500/15 blur-[100px] animate-pulse-slow animation-delay-2000" />
        <div className="absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 rounded-full bg-fuchsia-600/10 blur-[90px] animate-pulse-slow animation-delay-4000" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px)`,
            backgroundSize: '56px 56px',
          }}
        />
      </div>

      {/* Hero */}
      <section className="px-5 pb-12 pt-10 sm:px-8 sm:pt-16 lg:pb-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-violet-300 opacity-0 animate-fade-up">
            Our story
          </p>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-white opacity-0 animate-fade-up animation-delay-150 sm:text-4xl md:text-5xl lg:text-6xl">
            About{' '}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
              NanoUrl
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 opacity-0 animate-fade-up animation-delay-300 sm:text-lg">
            We built NanoUrl for anyone who has ever copied a link too long to text. Paste it in, get something
            short, and share it anywhere — no account required to get started, no technical skills needed.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 opacity-0 animate-fade-up animation-delay-450">
            {values.map((item) => (
              <span
                key={item.label}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm backdrop-blur-sm"
              >
                <span className="font-medium text-white">{item.label}</span>
                <span className="mx-2 text-slate-600">·</span>
                <span className="text-slate-400">{item.detail}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Mission card */}
      <section className="px-5 pb-16 sm:px-8">
        <div className="mx-auto max-w-4xl opacity-0 animate-fade-up animation-delay-600">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-violet-950/30 to-slate-900/90 p-8 shadow-2xl shadow-violet-900/20 backdrop-blur-xl sm:p-10 lg:p-12">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-violet-500/20 blur-2xl" />
            <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-cyan-500/15 blur-2xl" />
            <div className="relative">
              <h2 className="text-xl font-bold text-white sm:text-2xl">Why we made NanoUrl</h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">
                Long URLs are awkward in messages, bios, and posts. They get truncated, look messy, and are hard to
                remember. NanoUrl exists to fix that one simple problem: turn a long address into a short one you can
                share with confidence. We focus on speed, clarity, and a experience that feels effortless from the
                first visit.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { stat: '3 steps', text: 'Paste, shorten, share' },
                  { stat: 'Seconds', text: 'Not minutes' },
                  { stat: 'Any link', text: 'Articles, shops, videos' },
                ].map((item) => (
                  <div
                    key={item.stat}
                    className="rounded-2xl border border-white/5 bg-slate-950/50 px-4 py-5 text-center transition-colors hover:border-violet-500/20"
                  >
                    <p className="text-lg font-bold text-transparent bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text sm:text-xl">
                      {item.stat}
                    </p>
                    <p className="mt-1 text-xs text-slate-500 sm:text-sm">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature highlights */}
      <section className="border-t border-white/5 px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">What you get with NanoUrl</h2>
            <p className="mt-3 text-slate-400">Everything we offer, explained in plain language.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
            {highlights.map((item, i) => {
              const Icon = item.icon
              return (
                <article
                  key={item.title}
                  className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-slate-900/50 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-white/10 hover:shadow-xl hover:shadow-violet-900/10 sm:p-8 opacity-0 animate-fade-up`}
                  style={{ animationDelay: `${750 + i * 100}ms` }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                  />
                  <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-950/80 ring-1 ${item.ring} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className={`text-2xl ${item.iconColor}`} />
                    </div>
                    <div className="min-w-0 text-left">
                      <h3 className="text-lg font-semibold text-white sm:text-xl">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="px-5 pb-20 sm:px-8 sm:pb-28">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-8 text-center backdrop-blur-sm sm:p-12">
            <h2 className="text-xl font-bold text-white sm:text-2xl">Made for everyday sharing</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
              Students sharing assignment links, small businesses posting product pages, creators dropping links in
              their bio, or friends sending articles — if you have a long URL, NanoUrl is for you.
            </p>
            <ul className="mt-8 flex flex-wrap justify-center gap-3">
              {['💬 Texts', '📱 Social', '✉️ Email', '🔗 Bio links', '📋 Flyers'].map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-white/5 bg-white/[0.03] px-4 py-2 text-sm text-slate-300"
                >
                  {tag}
                </li>
              ))}
            </ul>
            <Link
              to="/#shorten"
              className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-10 py-4 text-sm font-semibold text-white shadow-xl shadow-violet-600/25 transition-all duration-300 hover:scale-[1.03] hover:shadow-violet-500/35 active:scale-[0.98]"
            >
              Try it now — shorten a link
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} NanoUrl — shorten links, share with ease.
          </p>
          <Link to="/" className="text-sm text-slate-400 transition-colors hover:text-white">
            Back to home
          </Link>
        </div>
      </footer>
    </div>
  )
}

export default AboutPage
