import type { LinksFunction, MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from '@remix-run/react'
import { useEffect, useRef } from 'react'
import { HydratedProvider } from './components/contexts/HydratedProvider'
import { BottomNavigation } from './components/layout/BottomNavigation'
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
  const location = useLocation()
  const justMounted = useRef(false)

  useEffect(() => {
    // @ts-expect-error TODO: define gtag
    window.gtag('event', 'page_view', location.pathname)
  }, [location])

  useEffect(() => {
    justMounted.current = true
  }, [])

  return (
    <html lang="en" className="h-full" data-theme="night">
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-P2BGHNVW8M"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-P2BGHNVW8M', {
    send_page_view: false
  });
`,
          }}
        ></script>
        <Meta />
        <Links />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="min-h-full bg-neutral">
        <HydratedProvider.Provider value={justMounted.current}>
          <Header />
          <div className="min-h-screen">
            <Outlet />
          </div>
          <BottomNavigation />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
          <Footer />
        </HydratedProvider.Provider>
      </body>
    </html>
  )
}
