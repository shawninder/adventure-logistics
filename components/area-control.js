import { useState } from 'react'

const defaultMaxDrive = 4

function AreaControl () {
  const [maxDrive, setMaxDrive] = useState(defaultMaxDrive)

  function maxDriveChanged (event) {
    setMaxDrive(event.target.value)
  }

  return (
    <div>
      <label className='title-bar'>Area</label>
      <input
        className='address'
        type='text'
        placeholder='Address or City'
      />
      <label>Max driving time: {maxDrive}h</label>
      <input
        type='range'
        min={1}
        max={24}
        steps={1}
        defaultValue={defaultMaxDrive}
        onChange={maxDriveChanged}
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
          .address {
            padding-left: 30px;
            line-height: 24px;
            background-image: url('/home.svg');
            background-repeat: no-repeat;
            background-position: top left 3px;
            background-size: 24px;
          }
        `}
      </style>
    </div>
  )
}

export default AreaControl
