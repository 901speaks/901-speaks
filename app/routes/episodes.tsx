import { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Episode } from '~/components/Episodes/Episode'
import { getAllPodcastEpisodes } from '~/lib/contentful.server'
import { PodcastEpisode } from '~/types/conteful'

export const loader: LoaderFunction = async () => {
  const { items: episodes } = await getAllPodcastEpisodes()

  return {
    episodes,
  }
}

export default function Episodes() {
  const { episodes } = useLoaderData<{ episodes: PodcastEpisode[] }>()
  return (
    <section className="container mx-auto mt-16">
      {episodes.map((e) => (
        <Episode key={e.episodeTitle} episode={e} />
      ))}
    </section>
  )
}
