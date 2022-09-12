import { Link } from '@remix-run/react'
import { SubscribeDropdown } from '../shared/SubscribeDropdown'

export function Header() {
  return (
    <header className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <button className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow">
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
        <Link className="btn btn-ghost text-2xl normal-case" to="/">
          901 Speaks
        </Link>
      </div>
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
