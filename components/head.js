import NextHead from 'next/head'

import useTracking from '../use/tracking'

const PROD = process.env.NODE_ENV === 'production'

export default function Head ({ children, dataLayer = {} }) {
  const [HeaderTrackingScript, NoScriptTracking] = PROD ? useTracking(dataLayer) : [null, null]
  return (
    <>
      <NextHead>
        <meta charSet='utf-8' />
        {PROD
          ? (
            <HeaderTrackingScript />
          ) : null}
        {children}
      </NextHead>
      {PROD
        ? (
          <NoScriptTracking />
        ) : null}
    </>
  )
}
