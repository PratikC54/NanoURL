function StatCard({ icon: Icon, label, value, hint, accent = "violet" }) {
  const accents = {
    violet: "from-violet-500/20 to-violet-600/5 border-violet-500/30 text-violet-300",
    cyan: "from-cyan-500/20 to-cyan-600/5 border-cyan-500/30 text-cyan-300",
    fuchsia: "from-fuchsia-500/20 to-fuchsia-600/5 border-fuchsia-500/30 text-fuchsia-300",
  };

  return (
    <div
      className={`rounded-2xl border bg-gradient-to-br p-5 shadow-lg backdrop-blur-sm ${accents[accent]}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            {label}
          </p>
          <p className="mt-2 text-3xl font-bold text-white sm:text-4xl">{value}</p>
          {hint && <p className="mt-1 text-sm text-slate-400">{hint}</p>}
        </div>
        {Icon && (
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-lg">
            <Icon />
          </span>
        )}
      </div>
    </div>
  );
}

export default StatCard;
