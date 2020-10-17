import { useState, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'

import Head from '../components/head.js'
import Page from '../components/page.js'
import Main from '../components/main.js'
import Drawing from '../components/drawing.js'

// const LON = 0
// const LAT = 1
const center = [-74.939629, 46.875258]
export default function Home () {
  const [drawings, setDrawings] = useState([])
  useEffect(() => {
    mapboxgl.accessToken = process.env.MAPBOX_TOKEN
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: center,
      zoom: 9
    })
    // MapboxDraw provided via CDN
    const Draw = new MapboxDraw() // eslint-disable-line no-undef

    map.addControl(Draw, 'top-right')
    map.on('load', function () {
      map.addSource('dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.terrain-rgb'
      })
      map.addLayer({
        id: 'hillshading',
        source: 'dem',
        type: 'hillshade'
      }, 'hillshade')
    })
    map.on('draw.create', updateDrawing)
    map.on('draw.delete', updateDrawing)
    map.on('draw.update', updateDrawing)

    function updateDrawing (e) {
      const data = Draw.getAll()
      setDrawings(data.features)
    }
  }, [])
  return (
    <Page>
      <Head>
        <title>Drawing</title>
        <script src='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.2.0/mapbox-gl-draw.js' />
        <link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css' type='text/css' />
        <link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.2.0/mapbox-gl-draw.css' type='text/css' />
      </Head>
      <Main>
        <section id='map-container'>
          <div id='map' />
        </section>
        <section>
          <ul id='features'>
            {drawings.map((drawing) => {
              return (
                <li key={drawing.id}>
                  <Drawing data={drawing} />
                </li>
              )
            })}
          </ul>
        </section>
      </Main>
      <style jsx>
        {`
          #map-container {
            height: 50vh;
          }
          #map {
            width: 100%;
            height: 100%;
          }
          #features {
            list-style: none;
            padding-left: 0;
          }
        `}
      </style>
    </Page>
  )
}
