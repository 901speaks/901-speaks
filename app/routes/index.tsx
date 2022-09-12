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
  const { items: episodes } = await getAllPodcastEpisodes()

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
  console.log(episodes)
  return (
    <>
      <div className="homepage-hero py-8">
        <div className="mx-auto flex flex-col justify-start p-4 md:container md:flex-row  md:justify-center md:px-16">
          <img
            src="/podcast-cover.jpg"
            alt=""
            className="mb-8 w-full self-center md:mb-0 md:w-auto"
          />

          <div className="prose text-white md:pl-16">
            <h1 className="text-white">901 Speaks</h1>
            <p>
              Struggle to fall asleep? Relax and fall to sleep with original
              sleep meditations, Bedtime stories and Sleep hypnosis. Jump into
              bed, press play and drift away to deep and restful sleep. Hosted
              by Karissa Vacker, an award-winning voice and meditation guide,
              and Jessica Porter, a hypnotherapist of 22 years bringing you two
              original episodes per week. Sleep Wave has been designed with
              love, to help you relax and fall asleep quickly and peacefully
              each night, so you can wake up happ y.
            </p>
            <SubscribeDropdown />
            <div className="flex items-center">
              <p className="mr-4 font-bold">Follow Us:</p>
              <div className="flex">
                {/* FIXME Add link to facebook profile */}
                <SocialIcon href="#" icon={FaFacebook} />
                {/* FIXME Add link to twitter profile */}
                <SocialIcon href="#" icon={FaTwitter} />
                {/* FIXME Add link to youtube profile */}
                <SocialIcon href="#" icon={FaYoutube} />
              </div>
            </div>
          </div>
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
