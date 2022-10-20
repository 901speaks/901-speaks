import { Link, useLocation } from '@remix-run/react'
import cx from 'clsx'
import { HiHome, HiInformationCircle, HiPlay } from 'react-icons/hi2'

export function BottomNavigation() {
  const { pathname } = useLocation()
  return (
    <div className="btm-nav lg:hidden">
      <button
        className={cx({
          active: pathname === '/',
        })}
      >
        <Link to="/">
          <HiHome size={20} className="m-auto" />
          <span className="btm-nav-label">Home</span>
        </Link>
      </button>
      <button
        className={cx({
          active: pathname === '/episodes',
        })}
      >
        <Link to="/episodes">
          <HiPlay size={20} className="m-auto" />
          <span className="btm-nav-label">Episodes</span>
        </Link>
      </button>
      <button
        className={cx({
          active: pathname === '/about',
        })}
      >
        <Link to="/about">
          <HiInformationCircle size={20} className="m-auto" />
          <span className="btm-nav-label">About</span>
        </Link>
      </button>
    </div>
  )
}
