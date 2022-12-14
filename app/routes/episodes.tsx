import { MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Episode } from '~/components/Episodes/Episode'

import { getAllPodcastEpisodes } from '~/lib/contentful.server'

export const loader = async () => {
  const episodes = await getAllPodcastEpisodes()

  return {
    episodes,
  }
}

export const meta: MetaFunction = () => ({
  title: 'Episodes | 901 Speaks',
})

export default function Episodes() {
  const { episodes } = useLoaderData<typeof loader>()
  return (
    <section className="container mx-auto mt-16">
      {episodes.map((e) => (
        <Episode key={e.episodeTitle} episode={e} />
      ))}
    </section>
  )
}
