import dayjs from 'dayjs'
import { FaCalendar, FaPlay, FaStopwatch } from 'react-icons/fa'

export function Episode({
  description,
  episodeLength,
  episodeNumber,
  episodeTitle,
  releaseDate,
  seasonNumber,
  slug,
  summary,
}: {
  description: string
  episodeLength: number
  episodeNumber: string
  episodeTitle: string
  releaseDate: string
  seasonNumber: number
  slug: string
  summary: string
}) {
  return (
    <article className="card card-normal mb-20 bg-base-100 shadow-xl duration-300 ease-in-out hover:scale-105 lg:card-side">
      <figure className="pl-6">
        <img src="https://placeimg.com/200/200/arch" alt="Album" />
      </figure>
      <div className="card-body">
        <div className="flex">
          <time className="mr-4 flex items-center">
            <FaCalendar className="mr-2" />
            <span>
              {dayjs('2022-08-06T00:00-05:00').format('MMMM DD, YYYY')}
            </span>
          </time>
          <div className="flex items-center">
            <FaStopwatch className="mr-2" />
            <span>00:02:51</span>
          </div>
        </div>
        <h2 className="card-title">Episode Title</h2>
        <p>
          I videotape every customer that comes in here, so that I may blackmail
          them later. There&apos;s no part of that sentence I didn&apos;t like!
          I&apos;ve got to find a way to escape the horrible ravages of youth.
          Suddenly, I&apos;m going to the bathroom like clockwork, every three
          hours. And those jerks at Social Security stopped sending me checks.
          Now &apos;I&apos;&apos; have to pay &apos;&apos;them&apos;!
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">
            <FaPlay />
          </button>
        </div>
      </div>
    </article>
  )
}
