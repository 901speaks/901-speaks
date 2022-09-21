import { rest } from 'msw'
import { faker } from '@faker-js/faker'

const NUMBER_OF_EPISODES = 12

export const handlers = [
  rest.get(
    'https://cdn.contentful.com/spaces/n72m7j89og7q/environments/master/entries',
    async (req, res, ctx) => {
      if (req.url.searchParams.get('fields.slug')) {
        return res(
          ctx.status(200),
          ctx.json({
            sys: { type: 'Array' },
            total: 1,
            skip: 0,
            limit: 100,
            items: [
              {
                fields: {
                  description: faker.lorem.lines(40),
                  episodeLength: `${faker.random.numeric(
                    2
                  )}:${faker.random.numeric(2)}:${faker.random.numeric(2)}`,
                  episodeNumber: faker.random.numeric(1),
                  episodeTitle: faker.random.words(6),
                  releaseDate: faker.date.recent(),
                  seasonNumber: faker.random.numeric(1),
                  slug: 'test-slug',
                  summary: faker.lorem.lines(6),
                },
                sys: {},
              },
            ],
          })
        )
      }
      return res(
        ctx.status(200),

        ctx.json({
          sys: { type: 'Array' },
          total: NUMBER_OF_EPISODES,
          skip: 0,
          limit: 100,
          items: Array.from(Array(NUMBER_OF_EPISODES).keys()).map(() => ({
            fields: {
              description: faker.random.words(6),
              episodeLength: `${faker.random.numeric(2)}:${faker.random.numeric(
                2
              )}:${faker.random.numeric(2)}`,
              episodeNumber: faker.random.numeric(1),
              episodeTitle: faker.random.words(6),
              releaseDate: faker.date.recent(),
              seasonNumber: faker.random.numeric(1),
              slug: 'test-slug',
              summary: faker.lorem.lines(6),
            },
            sys: {},
          })),
        })
      )
    }
  ),
]
