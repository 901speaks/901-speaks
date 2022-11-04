import { Link } from '@remix-run/react'
import { motion } from 'framer-motion'
import { SubscribeDropdown } from '../shared/SubscribeDropdown'

export function Header() {
  return (
    <header className="navbar bg-base-100">
      <motion.div
        className="navbar-start"
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{
          bounce: 0,
        }}
      >
        <Link className="btn btn-ghost text-2xl normal-case" to="/">
          901 Speaks
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
