import { json, LoaderArgs, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import dayjs from 'dayjs'
import { FaCalendar, FaStopwatch, FaGlobeAmericas } from 'react-icons/fa'
import { getPodcastEpisodeBySlug } from '~/lib/contentful.server'

export const loader = async ({ params }: LoaderArgs) => {
  const episodeSlug = params.slug

  if (!episodeSlug) {
    throw json({
      message: 'Episode not found',
    })
  }

  try {
    const episode = await getPodcastEpisodeBySlug(episodeSlug)
    return {
      episode,
    }
  } catch (error) {
    console.error({
      error,
      message: 'Error when fetching single episode',
    })
  }
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return {
      title: 'Episode Not Found | 901 Speaks',
    }
  } else {
    const { episode } = data
    return {
      description: episode.summary,
      title: `${episode.episodeTitle} | 901 Speaks`,
    }
  }
}

export default function Episodes() {
  const { episode } = useLoaderData<typeof loader>()

  return (
    <section className="container mx-auto mt-16 px-8">
      <img
        src="/podcast-cover.jpg"
        alt=""
        className="mx-auto mb-12 w-96 md:mx-0"
      />
      <div className="text-center text-primary">
        <div className="mb-4 flex">
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
      </div>
      <div className="prose">
        <h1 className="capitalize">{episode.episodeTitle}</h1>
        <p>
          Watch episodes on YouTube:{' '}
          <a
            href="https://www.youtube.com/c/DrewDeDude/"
            target="_blank"
            rel="noreferrer"
          >
            https://www.youtube.com/c/DrewDeDude/
          </a>
        </p>
        <h2>Buy Me a Coffee ☕️</h2>
        <p>
          If you enjoy the podcast, then you can donate a small amount here as a
          token of your appreciation:{' '}
          <a
            href="https://www.buymeacoffee.com/andrewusher"
            target="_blank"
            rel="noreferrer"
          >
            https://www.buymeacoffee.com/andrewusher
          </a>
        </p>
        <p>{episode.description}</p>
      </div>
    </section>
  )
}
