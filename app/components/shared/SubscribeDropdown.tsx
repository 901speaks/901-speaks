import clsx from 'clsx'
import {
  SiApplepodcasts,
  SiGooglepodcasts,
  SiSpotify,
  SiRss,
} from 'react-icons/si'

export function SubscribeDropdown({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        'dropdown-end not-prose dropdown dropdown-hover',
        className
      )}
    >
      <button tabIndex={0} className="btn btn-primary">
        Subscribe
      </button>
      <ul className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow">
        <li>
          {/* FIXME Add link to apple podcast */}
          <a href="#" className="flex">
            <SiApplepodcasts />
            <span>Apple Podcasts</span>
          </a>
        </li>
        <li>
          {/* FIXME Add link to google podcast */}
          <a href="#" className="flex">
            <SiGooglepodcasts />
            <span>Google Podcasts</span>
          </a>
        </li>
        <li>
          {/* FIXME Add link to spotify podcast */}
          <a href="#" className="flex">
            <SiSpotify />
            <span>Spotify</span>
          </a>
        </li>
        <li>
          {/* FIXME Add link to RSS feed */}
          <a href="#" className="flex">
            <SiRss />
            <span>RSS</span>
          </a>
        </li>
      </ul>
    </div>
  )
}
