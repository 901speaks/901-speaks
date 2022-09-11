import type { LinksFunction, MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import styles from './tailwind.css'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: '901 Speaks',
  viewport: 'width=device-width,initial-scale=1',
})

export default function App() {
  return (
    <html lang="en" className="h-full" data-theme="night">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="min-h-full bg-neutral">
        <Header />
        <div className="min-h-screen">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Footer />
      </body>
    </html>
  )
}
