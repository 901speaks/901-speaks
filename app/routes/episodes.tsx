import { LoaderFunction, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Episode } from '~/components/Episodes/Episode'
import { NewsletterSignUpForm } from '~/components/shared/NewsletterSignUpForm'
import { getAllPodcastEpisodes } from '~/lib/contentful.server'
import { PodcastEpisode } from '~/types/conteful'

export const loader: LoaderFunction = async () => {
  const episodes = await getAllPodcastEpisodes()

  return {
    episodes,
  }
}

export const meta: MetaFunction = () => ({
  title: 'Episodes | 901 Speaks',
})

export default function Episodes() {
  const { episodes } = useLoaderData<{ episodes: PodcastEpisode[] }>()
  return (
    <section className="container mx-auto mt-16">
      {!episodes.length && <NewsletterSignUpForm />}
      {episodes.map((e) => (
        <Episode key={e.episodeTitle} episode={e} />
      ))}
    </section>
  )
}
