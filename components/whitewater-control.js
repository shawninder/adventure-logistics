import { useState } from 'react'
import Color from 'color'

import legends from '../legends/classification'

function mixedColor (level) {
  const levels = level.split('-')
  return Color(legends[levels[0]]).mix(Color(legends[levels[1]]))
}

function WhitewaterControl () {
  const defaultDifficulty = 0.5
  const [difficulty, setDifficulty] = useState(defaultDifficulty)
  const width = 150
  const height = 150
  const radius = 48
  const center = {
    x: width / 2,
    y: height / 2
  }
  const fontHeight = 8
  const fontRatio = 1
  const fontWidth = fontHeight * fontRatio
  let maxCount = 0
  const rapidCounts = legends.whitewater.reduce((counts, key) => {
    counts[key] = 1
    return counts
  }, {})
  const keys = Object.keys(rapidCounts)
  const sum = keys.reduce((_sum, level) => {
    const count = rapidCounts[level]
    maxCount = Math.max(maxCount, count)
    _sum += count
    return _sum
  }, 0)
  let angle = Math.PI * (1 - (1 / keys.length))
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
      angle += portion * 2 * Math.PI
      const endAngle = angle
      _slices.push({
        count,
        portion,
        level,
        center,
        startAngle,
        endAngle
      })
      return _slices
    }, [])
  function mouseEnter (event) {
    event.target.classList.add('hovered')
  }
  function mouseLeave (event) {
    event.target.classList.remove('hovered')
  }
  function difficultyChanged (event) {
    setDifficulty(event.target.value / 100)
  }
  const bubbleFactor = 0.95
  const maskX = radius * bubbleFactor * (2 * difficulty - 1)
  const maskY = Math.sqrt(radius * radius - maskX * maskX)

  const symbolSize = 24
  const paddlingSize = symbolSize
  const paddlingWidth = paddlingSize * (1 + difficulty)
  const paddlingHeight = paddlingSize * (1 + difficulty)

  const portageSize = paddlingSize
  const portageWidth = portageSize * (2 - difficulty)
  const portageHeight = portageSize * (2 - difficulty)
  // const portageRadius = Math.sqrt(Math.pow(radius, 2) - Math.pow(2 * difficulty - 1, 2))
  const portageRadius = difficulty < 0.5
    ? radius * 2 * (-Math.pow(difficulty, 2) + 2 * difficulty + 0.05)
    : radius * (2 - difficulty + 0.05)
  return (
    <div>
      <label className='title-bar'>Difficulty</label>
      <svg
        version='1.1'
        width={width}
        height={height}
        xmlns='http://www.w3.org/2000/svg'
        style={{ overflow: 'hidden', position: 'relative' }}
      >
        <defs>
          <clipPath id='easy-mask'>
            <path
              fill='none'
              stroke='black'
              d={`M${center.x + maskX},${center.y - maskY}
                q${-maskX},${maskY} ${maskX / radius},${2 * maskY}
                a${radius} ${radius} 0 ${maskX > 0 ? 1 : 0} 1 0 ${-2 * maskY}`}
              strokeWidth='1'
            />
          </clipPath>
        </defs>
        {slices.map(({ level, center, count, portion, startAngle, endAngle }) => {
          const midAngle = (startAngle + endAngle) / 2
          const fontPosition = {
            x: center.x - (fontWidth * level.length / 2) + (radius + fontWidth * 2) * Math.cos(midAngle),
            y: center.y + fontHeight / 2 + (radius + fontHeight * 2) * Math.sin(midAngle)
            // x: center.x + (radius + (fontWidth)) * Math.cos(midAngle) - ((level.length / 2) * fontWidth),
            // y: center.y + (radius + fontHeight) * Math.sin(midAngle) + (fontHeight / 2)
          }
          const fillColor = Color(legends[level]) || mixedColor(level)
          const startX = Math.cos(startAngle)
          const startY = Math.sin(startAngle)
          const slicePath = `
            M${center.x},${center.y}
            L${center.x + radius * startX}
              ,${center.y + radius * startY}
            A${radius}
            ,${radius}
            ,0,0,1
            ,${center.x + radius * Math.cos(endAngle)}
            ,${center.y + radius * Math.sin(endAngle)}
            Z`
          return (
            <g key={level} className='pie-portion'>
              <path
                className='pie-slice-bg'
                fill={fillColor.alpha(0.4).string()}
                stroke='black'
                d={slicePath}
                strokeWidth='0.1'
                onMouseEnter={mouseEnter}
                onMouseLeave={mouseLeave}
              >
                <title>{`${count} ${level}s (${Math.round(portion * 100)}%)`}</title>
              </path>
              <path
                className='pie-slice'
                clipPath='url(#easy-mask)'
                fill={fillColor.string()}
                stroke='black'
                d={slicePath}
                strokeWidth='0.1'
                onMouseEnter={mouseEnter}
                onMouseLeave={mouseLeave}
              >
                <title>{`${count} ${level}s (${Math.round(portion * 100)}%)`}</title>
              </path>
              <text
                className='pie-text nesFont'
                x={fontPosition.x}
                y={fontPosition.y}
              >
                {level}
              </text>
            </g>
          )
        })}
        <path
          className='pie-portage'
          strokeDasharray='5, 5'
          d={`
            M${center.x + maskX},${center.y - maskY}
            A${portageRadius} ${portageRadius}
              0 0 1
              ${center.x + maskX}
              ,${center.y + maskY}
            `}
          strokeWidth='2'
          stroke='#000000aa'
          fill='none'
        />
        <image
          className='pie-symbol'
          href='/paddling.svg'
          width={paddlingWidth}
          height={paddlingHeight}
          x={center.x - radius * (1 - difficulty) - paddlingWidth / 3 - difficulty * paddlingWidth / 3}
          y={center.y - ((0.3 + 0.2 * difficulty) * paddlingHeight)}
        />
        <image
          className='pie-symbol'
          href='/portage.svg'
          width={portageWidth}
          height={portageHeight}
          x={center.x + radius * difficulty - difficulty * portageWidth * 0.6 - (1 - difficulty) * portageWidth * 0.4}
          y={center.y - (portageHeight / 2)}
        />
      </svg>
      <input
        type='range'
        defaultValue={defaultDifficulty * 100}
        onChange={difficultyChanged}
      />
      <style jsx>
        {`
          label, input[type=range], svg {
            display: block;
            width: ${width}px;
            margin: 0 auto;
          }
          .title-bar {
            width: 100%;
            text-align: center;
            font-weight: bold;
          }
          .pie-slice, .pie-text {
            transform-origin: 50% 50%;
          }
          .pie-text {
            font-size: ${fontHeight}px;
          }
        `}
      </style>
    </div>
  )
}

export default WhitewaterControl
