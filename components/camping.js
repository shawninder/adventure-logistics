const width = 48
const height = 48

function Camping ({ size, selected }) {
  const unit = {
    href: '/camping.svg',
    width: 5 * width / 16,
    height: 5 * width / 16
  }
  const tiny = {
    href: '/camping.svg',
    width: 3 * width / 16,
    height: 3 * width / 16
  }
  const unknown = {
    href: '/camping.svg',
    width: 3 * width / 4,
    height: 3 * height / 4
  }
  const fontSize = 3 * unit.width / 4
  const fontRatio = 1
  const semiWidth = width / 2
  const semiHeight = height / 2
  const icons = {
    1: (
      <svg width={width} height={height}>
        <image
          {...unit}
          x={semiWidth - unit.width / 2}
          y={semiHeight - unit.height / 2}
        />
      </svg>
    ),
    2: (
      <svg width={width} height={height}>
        <image
          {...unit}
          x={width / 2 - 3 * unit.width / 4}
          y={height / 2 - 5 * unit.height / 8}
        />
        <image
          {...unit}
          x={width / 2 - unit.width / 4}
          y={height / 2 - 3 * unit.height / 8}
        />
      </svg>
    ),
    3: (
      <svg width={width} height={height}>
        <image
          {...unit}
          x={width / 2 - 7 * unit.width / 8}
          y={height / 2 - 3 * unit.height / 4}
        />
        <image
          {...unit}
          x={width / 2 - unit.width / 2}
          y={height / 2 - unit.height / 2}
        />
        <image
          {...unit}
          x={width / 2 - unit.width / 8}
          y={height / 2 - unit.height / 4}
        />
      </svg>
    ),
    4: (
      <svg width={width} height={height}>
        <image
          {...unit}
          x={width / 2 - 7 * unit.width / 8}
          y={height / 2 - 7 * unit.height / 8}
        />
        <image
          {...unit}
          x={width / 2 - 1 * unit.width / 8}
          y={height / 2 - 7 * unit.height / 8}
        />
        <image
          {...unit}
          x={width / 2 - 7 * unit.width / 8}
          y={height / 2 - 1 * unit.height / 8}
        />
        <image
          {...unit}
          x={width / 2 - 1 * unit.width / 8}
          y={height / 2 - 1 * unit.height / 8}
        />
      </svg>
    ),
    5: (
      <svg width={width} height={height}>
        <image
          {...tiny}
          x={width / 2 - tiny.width / 2}
          y={height / 2 - tiny.height / 2}
          transform={`translate(${tiny.width / 2}, ${-3 * tiny.height / 4})`}
        />
        <image
          {...tiny}
          x={width / 2 - tiny.width / 2}
          y={height / 2 - tiny.height / 2}
          transform={`translate(${-tiny.width / 2}, ${-3 * tiny.height / 4})`}
        />
        <image
          {...tiny}
          x={width / 2 - tiny.width / 2}
          y={height / 2 - 3 * tiny.height / 4}
          transform-origin='center'
          transform='rotate(180)'
        />
        <image
          {...tiny}
          x={width / 2 - tiny.width / 2}
          y={height / 2 - tiny.height / 2}
          transform={`translate(${tiny.width / 2}, ${3 * tiny.height / 4})`}
        />
        <image
          {...tiny}
          x={width / 2 - tiny.width / 2}
          y={height / 2 - tiny.height / 2}
          transform={`translate(${-tiny.width / 2}, ${3 * tiny.height / 4})`}
        />
      </svg>
    ),
    G: (
      <svg width={width} height={height}>
        <defs>
          <radialGradient id='fadeGradient' cx='0.5' cy='0.3' r='0.6'>
            <stop offset='0' stop-color='white' stop-opacity='1' />
            <stop offset='1' stop-color='white' stop-opacity='0.1' />
          </radialGradient>

          <mask id='fade' maskContentUnits='objectBoundingBox'>
            <rect width='1' height='1' fill='url(#fadeGradient)' />
          </mask>
        </defs>
        <g mask='url(#fade)'>
          <image
            {...tiny}
            x={width / 2 - tiny.width / 2}
            y={height / 2 - 1.4 * tiny.height}
          />
          <image
            {...tiny}
            x={width / 2 - 1.2 * tiny.width}
            y={height / 2 - 0.4 * tiny.height}
          />
          <image
            {...tiny}
            x={width / 2 - tiny.width / 2}
            y={height / 2 - 0.6 * tiny.height}
            transform-origin='center'
            transform='rotate(180)'
          />
          <image
            {...tiny}
            x={width / 2 + 0.2 * tiny.width}
            y={height / 2 - 0.4 * tiny.height}
          />
          <image
            {...tiny}
            x={width / 2 - 1.85 * tiny.width}
            y={height / 2 + 0.7 * tiny.height}
          />
          <image
            {...tiny}
            x={width / 2 + 0.2 * tiny.width}
            y={height / 2 - 1.6 * tiny.height}
            transform-origin='center'
            transform='rotate(180)'
          />
          <image
            {...tiny}
            x={width / 2 - tiny.width / 2}
            y={height / 2 + 0.6 * tiny.height}
          />
          <image
            {...tiny}
            x={width / 2 - 1.2 * tiny.width}
            y={height / 2 - 1.6 * tiny.height}
            transform-origin='center'
            transform='rotate(180)'
          />
          <image
            {...tiny}
            x={width / 2 + 0.85 * tiny.width}
            y={height / 2 + 0.7 * tiny.height}
          />
        </g>
      </svg>
    ),
    unknown: (
      <svg width={width} height={height}>
        <image
          {...unknown}
          x={width / 2 - unknown.width / 2}
          y={height / 2 - unknown.height / 2}
        />
        <text
          className='nesFont'
          x={width / 2 - fontRatio * fontSize / 2}
          y={height / 2 + 7 * fontSize / 2}
        >
          ?
        </text>
        <style jsx>
          {`
            text {
              font-size: ${fontSize}px;
            }
          `}
        </style>
      </svg>
    )
  }
  return icons[size] ? icons[size] : icons.unknown
}

export default Camping
