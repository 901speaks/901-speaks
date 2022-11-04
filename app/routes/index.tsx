import React from 'react'
import type { LinksFunction } from '@remix-run/node'
import { FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa'
import styles from '~/styles/routes/index.css'
import { IconType } from 'react-icons'
import { Episode } from '~/components/Episodes/Episode'
import { LoaderFunction } from '@remix-run/node'
import { getAllPodcastEpisodes } from '~/lib/contentful.server'
import { useLoaderData } from '@remix-run/react'
import { PodcastEpisode } from '~/types/conteful'
import { SubscribeDropdown } from '~/components/shared/SubscribeDropdown'
import { podcastDescription } from '~/constants/showInfo'
import { motion } from 'framer-motion'

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: styles,
  },
  {
    rel: 'preload',
    as: 'image',
    href: 'podcast-cover.jpg',
  },
]

export const loader: LoaderFunction = async () => {
  const episodes = await getAllPodcastEpisodes()

  return {
    episodes,
  }
}

function SocialIcon({ icon: Icon, href }: { icon: IconType; href: string }) {
  return (
    <a href={href} className="mr-4">
      <Icon size={24} fill="#fff" />
    </a>
  )
}

export default function Index() {
  const { episodes } = useLoaderData<{ episodes: PodcastEpisode[] }>()

  return (
    <>
      <div className="homepage-hero py-8">
        <div className="mx-auto flex flex-col items-center justify-start p-4 md:container  md:flex-row md:justify-center md:px-16">
          <motion.img
            initial={{ x: -200, scale: 0.4, opacity: 0.5 }}
            animate={{ x: 0, scale: 1, opacity: 1 }}
            src="/podcast-cover.jpg"
            alt=""
            className="mb-8 aspect-square w-full self-center md:mb-0 md:w-96"
          />

          <motion.div
            className="prose text-white md:pl-16"
            initial={{ x: 200, scale: 0.4, opacity: 0.5 }}
            animate={{ x: 0, scale: 1, opacity: 1 }}
            transition={{ ease: 'backIn', duration: 0.25 }}
          >
            <h1 className="text-white">901 Speaks</h1>
            <p>{podcastDescription}</p>
            <SubscribeDropdown className="dropdown-right" />
            <div className="flex items-center">
              <p className="mr-4 font-bold">Follow Us:</p>
              <div className="flex">
                {/* FIXME Add link to facebook profile */}
                <SocialIcon
                  href="https://www.facebook.com/901speaks"
                  icon={FaFacebook}
                />
                {/* FIXME Add link to twitter profile */}
                <SocialIcon
                  href="https://twitter.com/901_speaks"
                  icon={FaTwitter}
                />
                <SocialIcon
                  href="https://www.youtube.com/channel/UC5xN7cLXc0GmGaaLpQim4Lw"
                  icon={FaYoutube}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <section className="container mx-auto mt-16">
        {episodes.map((e) => (
          <Episode key={e.episodeTitle} episode={e} />
        ))}
      </section>
    </>
  )
}
