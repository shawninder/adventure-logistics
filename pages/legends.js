import Head from '../components/head.js'
import Page from '../components/page.js'
import Main from '../components/main.js'
import WhitewaterControl from '../components/whitewater-control'

import legends from '../legends/classification'
import rivers from '../rivers/'

export default function LegendsPage () {
  const singleCount = legends.whitewater.reduce((counts, key) => {
    counts[key] = 1
    return counts
  }, {})
  return (
    <Page>
      <Head>
        <title>Legends</title>
      </Head>
      <Main>
        <h2>Map Overlays</h2>
        <div className='grid'>
          <section>
            <h3>Waters</h3>
            {legends.waters.map((key) => {
              return <Pellet key={key} label={key} color={legends[key]} />
            })}
          </section>
          <section>
            <h3>Rapids</h3>
            {legends.rapids.map((key) => {
              return <Pellet key={key} label={key} color={legends[key]} />
            })}
          </section>
          <section>
            <h4>with portage</h4>
            {legends.rapids.map((key) => {
              return <Pellet key={key} label={key} color={legends[key]} hasPortage />
            })}
          </section>
          <section>
            <h3>Ledges</h3>
            {legends.ledges.map((key) => {
              return <Pellet key={key} label={key} color={legends[key]} />
            })}
          </section>
          <section>
            <h4>Ledges with portage</h4>
            {legends.ledges.map((key) => {
              return <Pellet key={key} label={key} color={legends[key]} hasPortage />
            })}
          </section>
          <section>
            <h3>Put-Ins</h3>
            <img className='map-symbol' src='./put-in.png' />
          </section>
          <section>
            <h3>Campings</h3>
            <img className='map-symbol' src='./camping.png' />
          </section>
          <section>
            <h3>Portages</h3>
            <img className='map-symbol' src='./portage.png' />
          </section>
          <section>
            <h3>Paddling</h3>
            <img className='map-symbol' src='./paddling.png' />
          </section>
        </div>
        <h2>Whitewater Summaries</h2>
        <div className='grid'>
          <div>
            <WhitewaterSummary
              rapidCounts={singleCount}
            />
            <br />
            Whitewaters
          </div>
          {Object.keys(rivers).map((name) => {
            const rapidCounts = rivers[name].features.reduce((counts, feature) => {
              const key = feature.properties.class
              const parts = key.split('-')
              if (parts.length > 1) {
                if (typeof counts[parts[0]] === 'undefined') {
                  counts[parts[0]] = 0.5
                } else {
                  counts[parts[0]] += 0.5
                }
                if (typeof counts[parts[1]] === 'undefined') {
                  counts[parts[1]] = 0.5
                } else {
                  counts[parts[1]] += 0.5
                }
              } else {
                if (typeof counts[key] === 'undefined') {
                  counts[key] = 1
                } else {
                  counts[key] += 1
                }
              }
              return counts
            }, {})
            return (
              <div key={name}>
                <WhitewaterSummary rapidCounts={rapidCounts} />
                <br />
                {name}
              </div>
            )
          })}
        </div>
        <h2>Filters</h2>
        <h3>Rapids</h3>
        <WhitewaterControl />
      </Main>
      <style jsx>
        {`
          h2 {
            margin-top: 1em;
          }
          .grid {
            display: grid;
            grid-gap: 10px;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
          }
          .map-symbol {
            height: 24px;
          }
        `}
      </style>
    </Page>
  )
}

function Pellet ({ label, color, hasPortage }) {
  const classes = ['pellet']
  if (hasPortage) {
    classes.push('has-portage')
  }
  return (
    <div className={classes.join(' ')} style={{ background: color }}>
      {label}
      <style jsx>
        {`
          .pellet {
            width: 24px;
            height: 24px;
            border-radius: 12px;
            line-height: 24px;
            text-align: center;
            font-size: 12px;
            text-shadow: 1px 1px 2px white;
            margin: 6px;
          }
          .has-portage {
            border: 3px dashed black;
            border-width: 0 3px 0 0;
          }
        `}
      </style>
    </div>
  )
}
function WhitewaterSummary ({ rapidCounts }) {
  const hoverScaleFactor = 1.3
  const fontHeight = 12
  const fontRatio = 0.7
  const fontWidth = fontHeight * fontRatio
  const width = 150
  const height = 150
  const radius = 48
  const center = {
    x: width / 2,
    y: height / 2
  }
  let maxCount = 0
  const sum = Object.keys(rapidCounts).reduce((_sum, level) => {
    const count = rapidCounts[level]
    maxCount = Math.max(maxCount, count)
    _sum += count
    return _sum
  }, 0)
  let angle = Math.PI
  let nextX
  let nextY
  const slices = [
    ...legends.whitewater
  ]
    .reduce((_slices, level) => {
      const count = rapidCounts[level]
      if (typeof count === 'undefined') {
        return _slices
      }
      const portion = count / sum
      const startAngle = angle
      const lineX = nextX || center.x + radius * Math.cos(startAngle)
      const lineY = nextY || center.y + radius * Math.sin(startAngle)
      angle += portion * 2 * Math.PI
      const endAngle = angle
      nextX = center.x + radius * Math.cos(endAngle)
      nextY = center.y + radius * Math.sin(endAngle)
      const midAngle = (startAngle + endAngle) / 2
      _slices.push({
        count,
        portion,
        level,
        center: `${center.x},${center.y}`,
        line: `${lineX},${lineY}`,
        arc: `${radius},${radius},0,0,1,${nextX},${nextY}`,
        text: {
          x: center.x + (radius + (fontWidth)) * Math.cos(midAngle) - ((level.length / 2) * fontWidth),
          y: center.y + (radius + fontHeight) * Math.sin(midAngle) + (fontHeight / 2)
        }
      })
      return _slices
    }, [])
  function mouseEnter (event) {
    event.target.classList.add('hovered')
  }
  function mouseLeave (event) {
    event.target.classList.remove('hovered')
  }
  return (
    <svg
      version='1.1'
      width={width}
      height={height}
      xmlns='http://www.w3.org/2000/svg'
      style={{ overflow: 'hidden', position: 'relative' }}
    >
      {slices.map(({ level, center, line, arc, count, portion, text }) => {
        const pathData = `M${center}L${line}A${arc}Z`
        return (
          <g key={level} className='pie-portion'>
            <path
              className='pie-slice'
              d={pathData}
              stroke='black'
              strokeWidth='0.1'
              fill={legends[level]}
              onMouseEnter={mouseEnter}
              onMouseLeave={mouseLeave}
            >
              <title>{`${count} ${level}s (${Math.round(portion * 100)}%)`}</title>
            </path>
            <text
              className='pie-text'
              x={text.x}
              y={text.y}
            >
              {level}
            </text>
          </g>
        )
      })}
      <style jsx>
        {`
          .pie-slice, .pie-text {
            transform-origin: 50% 50%;
            transition-property: transform;
            transition-duration: 0.4s;
            transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
          }
          .pie-slice.hovered {
            transform: scale(${hoverScaleFactor});
          }
          .pie-text {
            font-size: ${fontHeight}px;
          }
        `}
      </style>
    </svg>
  )
}
