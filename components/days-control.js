import { useState } from 'react'

const defaultPaddling = 4

function DaysControl () {
  const [paddling, setPaddling] = useState(defaultPaddling)

  function paddlingChanged (event) {
    setPaddling(event.target.value)
  }

  return (
    <div>
      <label className='title-bar'>Days</label>
      <label>Paddling days: {paddling}</label>
      <input
        type='range'
        min={1}
        max={60}
        steps={1}
        defaultValue={defaultPaddling}
        onChange={paddlingChanged}
      />
      <style jsx>
        {`
          label, input {
            display: block;
            width: 100%;
          }
          .title-bar {
            text-align: center;
            font-weight: bold;
          }
        `}
      </style>
    </div>
  )
}

export default DaysControl
