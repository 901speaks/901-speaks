import RSS from 'rss'
import { podcastDescription } from '~/constants/showInfo'
import { getAllPodcastEpisodes } from '~/lib/contentful.server'

export const loader = async () => {
  const TWO_DAYS_IN_MINUTES = 60 * 24 * 2
  const initialFeed = new RSS({
    categories: ['Comedy', 'Stories'],
    feed_url: 'https://901speaks.com',
    description: podcastDescription,
    pubDate: new Date(),
    site_url: 'https://901speaks.com',
    title: '901 Speaks',
    ttl: TWO_DAYS_IN_MINUTES,
  })

  const allEpisodes = await getAllPodcastEpisodes()

  allEpisodes.forEach((episode) => {
    initialFeed.item({
      date: episode.releaseDate,
      description: episode.description,
      title: episode.episodeTitle,
      url: `https://901speaks.com/episode/${episode.slug}`,
    })
  })

  const completeFeed = initialFeed.xml({ indent: true })

  return new Response(completeFeed, {
    status: 200,
    headers: {
      'Content-Type': 'Application/rss+xml',
    },
  })
}
