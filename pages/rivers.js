import { useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import Color from 'color'

import Head from '../components/head.js'
import Page from '../components/page.js'
import AreaControl from '../components/area-control'
import WhitewaterControl from '../components/whitewater-control'
import PortageControl from '../components/portage-control'
import CampingControl from '../components/camping-control'
import DaysControl from '../components/days-control'

import rivers from '../rivers/'
import classColors from '../legends/classification'

const alpha = 0.8
const center = [-75.32013916661728, 46.04069632621855]
function Home ({ mapboxToken }) {
  useEffect(() => {
    mapboxgl.accessToken = mapboxToken
    const map = new mapboxgl.Map({
      container: 'river-browser-map',
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: center,
      zoom: 8
    })
    // MapboxDraw provided via CDN
    const Draw = new MapboxDraw({ // eslint-disable-line no-undef
      userProperties: true
    })

    map.addControl(Draw, 'top-right')

    let campingImageLoaded = false
    let putInImageLoaded = false
    let mapLoaded = false

    map.on('load', () => {
      mapLoaded = true
      maybeDraw()
    })

    map.loadImage(
      'camping.png',
      function (error, image) {
        if (error) {
          throw error
        }
        map.addImage('camping', image)
        campingImageLoaded = true
        maybeDraw()
      }
    )

    map.loadImage(
      'put-in.png',
      function (error, image) {
        if (error) {
          throw error
        }
        map.addImage('put-in', image)
        putInImageLoaded = true
        maybeDraw()
      }
    )

    map.on('draw.create', updateDrawing)
    map.on('draw.delete', updateDrawing)
    map.on('draw.update', updateDrawing)

    function updateDrawing (e) {
      const data = Draw.getAll()
      console.log(data.features)
    }

    function maybeDraw () {
      if (campingImageLoaded && putInImageLoaded && mapLoaded) {
        drawStuff()
      }
    }

    function drawStuff () {
      map.addSource('dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.terrain-rgb'
      })
      // map.addLayer({
      //   id: 'hillshading',
      //   source: 'dem',
      //   type: 'hillshade'
      // }, 'hillshade')
      Object.keys(rivers).forEach((key) => {
        const riverSourceId = `${key}-path`
        map.addSource(riverSourceId, {
          type: 'geojson',
          data: rivers[key].path
        })
        map.addLayer({
          id: `${key}-path-line`,
          type: 'line',
          source: riverSourceId,
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': 'rgba(0,0,255,0.4)',
            'line-width': 3
          }
        })
        if (rivers[key].features.length > 0) {
          const featuresSourceId = `${key}-features`
          map.addSource(featuresSourceId, {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: rivers[key].features
            }
          })
          map.addLayer({
            id: featuresSourceId,
            type: 'circle',
            source: featuresSourceId,
            paint: {
              'circle-radius': {
                base: 1,
                stops: [
                  [1, 0.5],
                  [8, 2.5],
                  [22, 20]
                ]
              },
              'circle-color': [
                'match',
                ['get', 'class'],
                'EV',
                addAlpha(classColors.EV, alpha),
                'EV-R1',
                addAlpha(mixColors(classColors.EV, classColors.R1), alpha),
                'R1',
                addAlpha(classColors.R1, alpha),
                'R1-R2',
                addAlpha(mixColors(classColors.R1, classColors.R2), alpha),
                'R2',
                addAlpha(classColors.R2, alpha),
                'R2-R3',
                addAlpha(mixColors(classColors.R2, classColors.R3), alpha),
                'R3',
                addAlpha(classColors.R3, alpha),
                'R3-R4',
                addAlpha(mixColors(classColors.R3, classColors.R4), alpha),
                'R4',
                addAlpha(classColors.R4, alpha),
                'R4-R5',
                addAlpha(mixColors(classColors.R4, classColors.R5), alpha),
                'R5',
                addAlpha(classColors.R5, alpha),
                'R5-R6',
                addAlpha(mixColors(classColors.R5, classColors.R6), alpha),
                'R6',
                addAlpha(classColors.R6, alpha),
                'S1',
                addAlpha(classColors.S1, alpha),
                'S1-S2',
                addAlpha(mixColors(classColors.S1, classColors.S2), alpha),
                'S2',
                addAlpha(classColors.S2, alpha),
                'S2-S3',
                addAlpha(mixColors(classColors.S2, classColors.S3), alpha),
                'S3',
                addAlpha(classColors.S3, alpha),
                'S3-S4',
                addAlpha(mixColors(classColors.S3, classColors.S4), alpha),
                'S4',
                addAlpha(classColors.S4, alpha),
                'S4-S5',
                addAlpha(mixColors(classColors.S4, classColors.S5), alpha),
                'S5',
                addAlpha(classColors.S5, alpha),
                'C',
                addAlpha(classColors.C, alpha),
                // fallback
                addAlpha(classColors.unknown, alpha)
              ]
            }
          })
        }
        if (rivers[key].classification.length > 0) {
          const classSourceId = `${key}-classification`
          map.addSource(classSourceId, {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: rivers[key].classification
            }
          })
          map.addLayer({
            id: classSourceId,
            type: 'fill',
            source: classSourceId,
            paint: {
              'fill-color': [
                'case',
                ['==', ['get', 'class'], 'EV'], classColors.EV,
                ['==', ['get', 'class'], 'EV-R1'], mixColors(classColors.EV, classColors.R1),
                ['==', ['get', 'class'], 'R1'], classColors.R1,
                ['==', ['get', 'class'], 'R1-R2'], mixColors(classColors.R1, classColors.R2),
                ['==', ['get', 'class'], 'R2'], classColors.R2,
                ['==', ['get', 'class'], 'R2-R3'], mixColors(classColors.R2, classColors.R3),
                ['==', ['get', 'class'], 'R3'], classColors.R3,
                ['==', ['get', 'class'], 'R3-R4'], mixColors(classColors.R3, classColors.R4),
                ['==', ['get', 'class'], 'R4'], classColors.R4,
                ['==', ['get', 'class'], 'R4-R5'], mixColors(classColors.R4, classColors.R5),
                ['==', ['get', 'class'], 'R5'], classColors.R5,
                ['==', ['get', 'class'], 'R5-R6'], mixColors(classColors.R5, classColors.R6),
                ['==', ['get', 'class'], 'R6'], classColors.R6,
                ['==', ['get', 'class'], 'S1'], classColors.S1,
                ['==', ['get', 'class'], 'S1-S2'], mixColors(classColors.S1, classColors.S2),
                ['==', ['get', 'class'], 'S2'], classColors.S2,
                ['==', ['get', 'class'], 'S2-S3'], mixColors(classColors.S2, classColors.S3),
                ['==', ['get', 'class'], 'S3'], classColors.S3,
                ['==', ['get', 'class'], 'S3-S4'], mixColors(classColors.S3, classColors.S4),
                ['==', ['get', 'class'], 'S4'], classColors.S4,
                ['==', ['get', 'class'], 'S4-S5'], mixColors(classColors.S4, classColors.S5),
                ['==', ['get', 'class'], 'S5'], classColors.S5,
                ['==', ['get', 'class'], 'C'], classColors.C,
                '#cccccc'
              ],
              'fill-outline-color': 'black'
            }
          })
        }
        if (rivers[key].putIns.length > 0) {
          const putInsSourceId = `${key}-putIns`
          map.addSource(putInsSourceId, {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: rivers[key].putIns
            }
          })
          map.addLayer({
            id: putInsSourceId,
            type: 'symbol',
            source: putInsSourceId,
            layout: {
              'icon-image': 'put-in',
              'icon-size': ['interpolate', ['exponential', 1.3], ['zoom'], 0, 0, 22, 5],
              'icon-allow-overlap': true
            }
          })
          map.on('click', putInsSourceId, function (event) {
            const coordinates = event.features[0].geometry.coordinates.slice()
            const popup = event.features[0].properties.popup

            if (popup) {
              // Ensure that if the map is zoomed out such that multiple
              // copies of the feature are visible, the popup appears
              // over the copy being pointed to.
              while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360
              }

              new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(popup)
                .addTo(map)
            }
          })
          map.on('mouseenter', putInsSourceId, function () {
            map.getCanvas().style.cursor = 'pointer'
          })
          map.on('mouseleave', putInsSourceId, function () {
            map.getCanvas().style.cursor = ''
          })
        }
        if (rivers[key].campings.length > 0) {
          const campingsSourceId = `${key}-campings`
          map.addSource(campingsSourceId, {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: rivers[key].campings
            }
          })
          map.addLayer({
            id: campingsSourceId,
            type: 'symbol',
            source: campingsSourceId,
            layout: {
              'icon-image': 'camping',
              'icon-size': ['interpolate', ['exponential', 1.3], ['zoom'], 0, 0, 22, 10],
              'icon-allow-overlap': true
            }
          })
          map.on('click', campingsSourceId, function (event) {
            const coordinates = event.features[0].geometry.coordinates.slice()
            const popup = event.features[0].properties.popup

            if (popup) {
              // Ensure that if the map is zoomed out such that multiple
              // copies of the feature are visible, the popup appears
              // over the copy being pointed to.
              while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360
              }

              new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(popup)
                .addTo(map)
            }
          })
          map.on('mouseenter', campingsSourceId, function () {
            map.getCanvas().style.cursor = 'pointer'
          })
          map.on('mouseleave', campingsSourceId, function () {
            map.getCanvas().style.cursor = ''
          })
        }
      })
    }
  })
  return (
    <Page>
      <Head>
        <title>River Browser</title>
        <script src='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.2.0/mapbox-gl-draw.js' />
        <link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css' type='text/css' />
        <link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.2.0/mapbox-gl-draw.css' type='text/css' />
      </Head>
      <div className='grid'>
        <section id='area-control' className='control'>
          <AreaControl />
        </section>
        <section id='whitewater-control' className='control'>
          <WhitewaterControl />
        </section>
        <section id='portage-control' className='control'>
          <PortageControl />
        </section>
        <section id='camping-control' className='control'>
          <CampingControl />
        </section>
        <section id='days-control' className='control'>
          <DaysControl />
        </section>
        <section id='river-browser-results'>
          <div id='river-browser-map' />
        </section>
      </div>
      <style jsx>
        {`
          .grid {
            height: 100%;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 33% 33% 33% 33% 33% 80vh;
            grid-template-areas:
              "area"
              "ww"
              "portages"
              "campings"
              "days"
              "map";
          }
          @media (min-width: 600px) {
            .grid {
              grid-template-columns: 1fr 1fr;
              grid-template-rows: 33vh 33vh 33vh 100vh;
              grid-template-areas:
                "area     ww"
                "portages camping"
                "days     days"
                "map      map"
            }
          }
          @media (min-width: 900px) {
            .grid {
              grid-template-columns: 1fr 1fr 1fr;
              grid-template-rows: 50vh 50vh 100vh;
              grid-template-areas:
                "area    ww      portages"
                "camping camping days"
                "map     map     map"
            }
          }
          @media (min-width: 1500px) {
            .grid {
              grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
              grid-template-rows: 30% 70%;
              grid-template-areas:
                "area ww  portages campings days"
                "map  map map      map      map"
            }
          }
          .control {
            overflow: scroll;
          }
          #area-control {
            grid-area: area;
          }
          #whitewater-control {
            grid-area: ww;
          }
          #camping-control {
            grid-area: campings
          }
          #days-control {
            grid-area: days;
          }
          #river-browser-results {
            grid-area: map;
            border: 1px solid red !important;
          }
          #river-browser-map {
            width: 100%;
            height: 100%;
            display: none;
          }
        `}
      </style>
    </Page>
  )
}

function addAlpha (color, alpha) {
  return Color(color).alpha(alpha).string()
}
function mixColors (A, B) {
  return Color(A).mix(Color(B)).string()
}
Home.getInitialProps = () => {
  return {
    mapboxToken: process.env.MAPBOX_TOKEN
  }
}
export default Home
