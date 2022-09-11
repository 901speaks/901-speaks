import { rest } from 'msw'

export const handlers = [
  rest.get(
    'https://cdn.contentful.com/spaces/n72m7j89og7q/environments/master/entries',
    async (req, res, ctx) => {
      return res(
        ctx.status(200),

        ctx.json({
          sys: { type: 'Array' },
          total: 1,
          skip: 0,
          limit: 100,
          items: [
            {
              description: 'string',
              episodeLength: 'number',
              episodeNumber: 'string',
              episodeTitle: 'string',
              releaseDate: 'string',
              seasonNumber: 'number',
              slug: 'string',
              summary: 'string',
              sys: {},
            },
          ],
        })
      )
    }
  ),
]
