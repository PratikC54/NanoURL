function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="relative min-h-[calc(100svh-4rem)] overflow-x-hidden bg-slate-950 text-slate-200 antialiased">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -left-32 top-0 h-[28rem] w-[28rem] rounded-full bg-violet-600/25 blur-[120px] animate-pulse-slow" />
        <div className="absolute right-0 top-1/4 h-[24rem] w-[24rem] rounded-full bg-cyan-500/20 blur-[100px] animate-pulse-slow animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 h-[20rem] w-[20rem] rounded-full bg-fuchsia-600/15 blur-[90px] animate-pulse-slow animation-delay-4000" />
      </div>

      <main className="flex min-h-[calc(100svh-4rem)] items-center justify-center px-5 py-12 sm:px-8">
        <div className="w-full max-w-md opacity-0 animate-fade-up">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {title.split(' ').map((word, i, arr) =>
                i === arr.length - 1 ? (
                  <span
                    key={word}
                    className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent"
                  >
                    {word}
                  </span>
                ) : (
                  <span key={word}>{word} </span>
                )
              )}
            </h1>
            {subtitle && (
              <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">{subtitle}</p>
            )}
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-2xl shadow-violet-900/20 backdrop-blur-xl sm:rounded-3xl sm:p-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}

export default AuthLayout
