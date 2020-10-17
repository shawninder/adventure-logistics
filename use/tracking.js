import { useEffect } from 'react'

import { GAID, GTMID } from '../constants/google'

function gtag () {
  window.dataLayer.push(arguments)
}

export default function useTracking (dataLayer) {
  useEffect(() => {
    // Google Analytics tag
    window.dataLayer = window.dataLayer || []
    gtag('js', new Date())
    gtag('config', GAID)
    // End Google Analytics tag

    window.dataLayer = window.dataLayer.concat(dataLayer)

    // Google Tag Manager
    ;(
      function (w, d, s, l, i) {
        w[l] = w[l] || []
        w[l].push({
          'gtm.start': new Date().getTime(),
          event: 'gtm.js'
        })
        var f = d.getElementsByTagName(s)[0]
        var j = d.createElement(s)
        var dl = l !== 'dataLayer' ? '&l=' + l : ''
        j.async = true
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
        f.parentNode.insertBefore(j, f)
      }
    )(window, document, 'script', 'dataLayer', GTMID)
    // End Google Tag Manager
  }, [])

  const noscriptDataLayer = []
  Object.keys(dataLayer).forEach((key) => {
    noscriptDataLayer.push(`${key}=${dataLayer[key]}`)
  })

  return [
    () => {
      return (
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GAID}`} />
      )
    },
    () => {
      return (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTMID}&${noscriptDataLayer}`}
            height='0'
            width='0'
            style='display: none; visibility: hidden'
          />
        </noscript>
      )
    }
  ]
}
