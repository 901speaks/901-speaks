import { ActionArgs, json, LoaderArgs, redirect } from '@remix-run/node'
import { Form, useFetcher } from '@remix-run/react'
import React, { useEffect, useRef, useState } from 'react'
import { z, ZodError, ZodIssue } from 'zod'
import { subscribeToNewsletter } from '~/lib/newsletter.server'

type FieldErrors = {
  email?: string
  firstName?: string
}

export const action = async (params: ActionArgs) => {
  try {
    const formData = await params.request.formData()
    const firstName = formData.get('firstName')
    const email = formData.get('email')
    const errors: FieldErrors = {}

    await subscribeToNewsletter({
      firstName: firstName as string,
      email: email as string,
    })

    if (Object.keys(errors).length) {
      throw json({ errors })
    }

    return redirect(params.request.url)
  } catch (err) {
    if (err instanceof z.ZodError) {
      const zodErr = err.flatten()
      console.log(zodErr)
      throw json({ errors: zodErr.fieldErrors })
    }
  }
}

export const loader = (params: LoaderArgs) => {
  return redirect('/')
}

export function NewsletterSignupForm() {
  const fetcher = useFetcher()
  const emailRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [email, setEmail] = useState('')
  console.log(fetcher)

  useEffect(() => {
    if (fetcher.type === 'done') {
      setEmail(emailRef.current?.value ?? '')
      formRef.current?.reset()

      setTimeout(() => {
        setEmail('')
      }, 4000)
    }
  }, [fetcher.type])

  return (
    <section className="rounded-md bg-base-300 pb-12 shadow-md">
      <div className="mb-12 bg-accent-focus py-8 text-center text-white">
        <div className="mb-4 text-4xl font-bold uppercase">
          Join the Newsletter
        </div>
        <div className="text-2xl">
          Subscribe to get notified about new episodes!
        </div>
      </div>
      <fetcher.Form
        method="post"
        className="max-w-2xl pl-4 md:pl-12"
        action="/newsletter/subscribe"
        ref={formRef}
      >
        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="firstName">
            <span className="label-text">What is your first name?</span>
          </label>
          <input
            type="text"
            placeholder="First Name"
            className="input-bordered input w-full max-w-xs"
            name="firstName"
            id="firstName"
            ref={emailRef}
          />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="email">
            <span className="label-text">What is your email address?</span>
          </label>
          <input
            type="text"
            placeholder="Email"
            className="input-bordered input w-full max-w-xs"
            name="email"
            id="email"
            ref={emailRef}
          />
        </div>
        <button
          className="btn-primary btn mt-8 w-24"
          type="submit"
          disabled={fetcher.state === 'submitting'}
        >
          Sign Up
        </button>
      </fetcher.Form>
      {email && (
        <div className="toast-center toast toast-top min-w-full">
          <div className="alert alert-success">
            <div>
              <span>
                Subscribed successfully! Please check <strong>{email}</strong>{' '}
                to confirm.
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
