import { useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useStoreContext } from '../contextApi/ContextApi.jsx'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { token, logout } = useStoreContext()
  const isHome = location.pathname === '/'

  const handleLogout = () => {
    logout()
    setMenuOpen(false)
    toast.success('Logged out successfully')
    navigate('/')
  }

  const handleShorten = () => {
    setMenuOpen(false)
    if (isHome) {
      document.getElementById('shorten')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/#shorten')
    }
  }

  const linkClass = ({ isActive }) =>
    `transition-colors duration-200 ${
      isActive ? 'text-cyan-300 font-semibold' : 'text-slate-400 hover:text-white'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/85 shadow-lg shadow-black/20 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="group flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 text-sm font-bold text-white shadow-lg shadow-violet-500/30 transition-transform duration-300 group-hover:scale-105">
            N
          </span>
          <span className="text-lg font-semibold text-white">
            Nano<span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">Url</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className={linkClass}>
                {item.label}
              </NavLink>
            </li>
          ))}
          {token && (
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `rounded-full border border-white/15 px-4 py-2 transition-all duration-200 hover:border-white/30 hover:text-white ${
                    isActive ? 'text-cyan-300' : 'text-slate-300'
                  }`
                }
              >
                Dashboard
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `rounded-full border border-white/15 px-4 py-2 transition-all duration-200 hover:border-white/30 hover:text-white ${
                  isActive ? 'text-cyan-300' : 'text-slate-300'
                }`
              }
            >
              Log in
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `rounded-full px-5 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                  isActive
                    ? 'bg-gradient-to-r from-violet-500 to-cyan-400 shadow-violet-500/40'
                    : 'bg-gradient-to-r from-violet-600 to-cyan-500 shadow-violet-600/25'
                }`
              }
            >
              Sign up
            </NavLink>
          </li>
          {token && (
            <li>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-red-500/30 px-4 py-2 text-slate-300 transition-all duration-200 hover:border-red-400/50 hover:bg-red-500/10 hover:text-red-300"
              >
                Log out
              </button>
            </li>
          )}
          <li>
            <button
              type="button"
              onClick={handleShorten}
              className="rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Shorten a link
            </button>
          </li>
        </ul>

        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-white/10 md:hidden"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className={`block h-0.5 w-5 bg-white transition-all ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-5 bg-white transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-5 bg-white transition-all ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </nav>

      <div
        className={`overflow-hidden border-t border-white/5 bg-slate-950/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          menuOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="flex flex-col gap-4 px-5 py-4 text-center font-medium">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className={linkClass} onClick={() => setMenuOpen(false)}>
                {item.label}
              </NavLink>
            </li>
          ))}
          {token && (
            <li>
              <NavLink
                to="/dashboard"
                className={linkClass}
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              to="/login"
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              Log in
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register"
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              Sign up
            </NavLink>
          </li>
          {token && (
            <li>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-full border border-red-500/30 py-3 font-semibold text-red-300 transition hover:bg-red-500/10"
              >
                Log out
              </button>
            </li>
          )}
          <li>
            <button
              type="button"
              onClick={handleShorten}
              className="w-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 py-3 font-semibold text-white"
            >
              Shorten a link
            </button>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Navbar
