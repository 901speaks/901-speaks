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
    <article className="card-normal card mb-20 bg-base-100 shadow-xl duration-300 ease-in-out hover:scale-105 lg:card-side">
      <figure className="pl-6">
        <img src="https://placeimg.com/200/200/arch" alt="Album" />
      </figure>
      <div className="card-body">
        <div className="flex text-primary">
          <time className="mr-4 flex items-center">
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
        <h2 className="card-title capitalize">{episode.episodeTitle}</h2>
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
