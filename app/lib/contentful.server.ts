import { createClient, EntryCollection } from 'contentful'
import { PodcastEpisode } from '~/types/conteful'

const contentfulAccessToken = process.env.CONTENTFUL_ACCESS_TOKEN
const contentfulSpaceId = process.env.CONTENTFUL_SPACE_ID

const client = createClient({
  accessToken: contentfulAccessToken!,
  space: contentfulSpaceId!,
})

export async function getAllPodcastEpisodes() {
  const episodes = await client.getEntries<PodcastEpisode>({
    content_type: 'episode',
    order: '-fields.releaseDate',
  })

  return episodes.items.map((item) => item.fields)
}

export async function getPodcastEpisodeBySlug(slug: string) {
  const maybeEpisode = await client.getEntries<PodcastEpisode>({
    content_type: 'episode',
    'fields.slug': slug,
  })

  const episodeNotFound = !maybeEpisode?.items?.length
  if (episodeNotFound) {
    throw new Error(`Post for slug ${slug} not found`)
  }

  const foundPost = maybeEpisode.items[0].fields
  return foundPost
}
