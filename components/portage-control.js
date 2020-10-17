import { useState } from 'react'

const defaultQty = 4
const defaultAvg = 200
const defaultTotal = 2000
const defaultDifficulty = 5

const minQty = 0
const minAvg = 0
const minTotal = 0
const minDifficulty = 0

const maxQty = 1000
const maxAvg = 1000
const maxTotal = 10000
const maxDifficulty = 10

const qtySteps = 2
const avgSteps = 5
const totalSteps = 10
const difficultySteps = 1

function PortageControl () {
  const [qty, setQty] = useState(defaultQty)
  const [avg, setAvg] = useState(defaultAvg)
  const [total, setTotal] = useState(defaultTotal)
  const [difficulty, setDifficulty] = useState(defaultDifficulty)
  function qtyChanged (event) {
    setQty(event.target.value)
  }
  function avgChanged (event) {
    setAvg(event.target.value)
  }
  function totalChanged (event) {
    setTotal(event.target.value)
  }
  function difficultyChanged (event) {
    setDifficulty(event.target.value)
  }
  return (
    <div>
      <label className='title-bar'>Portages</label>
      <label>
        Max quantity: {qty}
        <input
          type='range'
          min={minQty}
          max={maxQty}
          steps={qtySteps}
          defaultValue={defaultQty}
          onChange={qtyChanged}
        />
      </label>
      <label>
        Max average length: {avg}m
        <input
          type='range'
          min={minAvg}
          max={maxAvg}
          steps={avgSteps}
          defaultValue={defaultAvg}
          onChange={avgChanged}
        />
      </label>
      <label>
        Max total length: {total}m
        <input
          type='range'
          min={minTotal}
          max={maxTotal}
          steps={totalSteps}
          defaultValue={defaultTotal}
          onChange={totalChanged}
        />
      </label>
      <label>
        Max difficulty: {difficulty}
        <input
          type='range'
          min={minDifficulty}
          max={maxDifficulty}
          steps={difficultySteps}
          defaultValue={defaultDifficulty}
          onChange={difficultyChanged}
        />
      </label>
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

export default PortageControl
