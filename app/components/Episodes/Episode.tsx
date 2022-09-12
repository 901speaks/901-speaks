import { Link } from '@remix-run/react'
import dayjs from 'dayjs'
import {
  FaCalendar,
  FaGlobeAmericas,
  FaPlay,
  FaStopwatch,
} from 'react-icons/fa'
import { PodcastEpisode } from '~/types/conteful'

export function Episode({ episode }: { episode: PodcastEpisode }) {
  return (
    <article className="card mb-20 bg-base-100 p-8 shadow-xl duration-300 ease-in-out hover:scale-105 md:p-0 lg:card-side">
      <figure className="md:pl-6">
        <img
          src="/podcast-cover.jpg"
          alt="Album"
          className="aspect-square h-full w-full md:h-40 md:w-40"
        />
      </figure>
      <div className="card-body mobile-only:px-0">
        <div className="flex text-primary">
          <time className="mr-2 flex items-center">
            <FaCalendar className="mr-2" />
            <span>{dayjs(episode.releaseDate).format('MMMM DD, YYYY')}</span>
          </time>
          <div className="mr-4 flex items-center">
            <FaStopwatch className="mr-2" />
            <span>{episode.episodeLength}</span>
          </div>
          <div className="flex items-center">
            <FaGlobeAmericas className="mr-2" />
            <span>
              S{episode.seasonNumber}E
              {String(episode.episodeNumber).padStart(2, '0')}
            </span>
          </div>
        </div>
        <h2 className="card-title capitalize">
          <Link to={`/episode/${episode.slug}`}>{episode.episodeTitle}</Link>
        </h2>
        <p>{episode.summary}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">
            <FaPlay />
          </button>
        </div>
      </div>
    </article>
  )
}
