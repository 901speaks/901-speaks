import axios from 'axios'
import { z } from 'zod'

const Submission = z.object({
  firstName: z.optional(z.string().max(40, 'First name is too long')),
  email: z
    .string({ required_error: 'Please enter an email address' })
    .email('Please enter a valid email address'),
})

type Submission = z.infer<typeof Submission>

type NewsletterRequestBody = {
  api_key: string
  email: string
  first_name?: string
}

const subscribeToNewsletter = async ({ firstName, email }: Submission) => {
  if (typeof process.env.CONVERTKIT_API_KEY !== 'string') {
    throw new Error('CONTENTFUL_API_KEY is not defined')
  }

  const submissionData = await Submission.parseAsync({ firstName, email })
  console.log({ submissionData })

  const newsletterRequestBody: NewsletterRequestBody = {
    api_key: process.env.CONVERTKIT_API_KEY,
    email,
  }

  if (firstName) {
    newsletterRequestBody.first_name = firstName
  }

  await axios.post(
    'https://api.convertkit.com/v3/forms/3768487/subscribe',
    newsletterRequestBody
  )
}

export { Submission, subscribeToNewsletter }
