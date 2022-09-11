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

  return episodes
}
