import { useState } from 'react'

import Camping from './camping'

const defaultSelected = 4

function CampingControl () {
  const [size, setSize] = useState(defaultSelected)
  function sizeChanged (event) {
    const val = 7 - event.target.value
    setSize(val === 6 ? 'G' : val)
  }
  return (
    <div>
      <label className='title-bar'>Campsites</label>
      <ul className='icons'>
        {[1, 2, 3, 4, 5, 'G'].map((_size) => {
          const selected = _size === 'G' || _size >= size
          return (
            <li
              key={_size}
              style={{
                background: selected ? '#00ff0055' : '#ff000055'
              }}
            >
              <Camping size={_size} />
            </li>
          )
        })}
      </ul>
      <input
        type='range'
        defaultValue={Math.round(defaultSelected)}
        min={1}
        max={6}
        onChange={sizeChanged}
        style={{
          direction: 'rtl'
        }}
      />
      <label className='detail'>Size: {size}</label>
      <style jsx>
        {`
          label, input[type=range] {
            display: block;
            width: 100%;
          }
          .title-bar {
            text-align: center;
            font-weight: bold;
          }
          .detail {
            font-size: smaller;
          }
          .icons {
            list-style: none;
            padding-left: 0;
            display: grid;
            width: 100%;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
            justify-items: center;
          }
        `}
      </style>
    </div>
  )
}

export default CampingControl
