import { Link } from '@remix-run/react'
import { motion } from 'framer-motion'
import { SubscribeDropdown } from '../shared/SubscribeDropdown'

export function Header() {
  return (
    <header className="navbar bg-secondary p-4 text-primary">
      <motion.div
        className="navbar-start"
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{
          bounce: 0,
        }}
      >
        <Link to="/">
          <img src="/logo.png" alt="901 Speaks Logo" className="h-16" />
        </Link>
      </motion.div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            {/* FIXME Add about page */}
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/episodes">Episodes</Link>
          </li>
          <li></li>
        </ul>
      </div>
      <div className="navbar-end">
        <SubscribeDropdown />
      </div>
    </header>
  )
}
