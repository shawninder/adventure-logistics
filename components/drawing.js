import { useRef } from 'react'

export default function Drawing ({ data }) {
  const pre = useRef(null)
  return (
    <div>
      <pre ref={pre}>{JSON.stringify(data, null, 2)}</pre>
      <button
        onClick={(event) => {
          const range = document.createRange()
          range.selectNodeContents(pre.current)
          var sel = window.getSelection()
          sel.removeAllRanges()
          sel.addRange(range)
          document.execCommand('copy')
        }}
      >
        copy
      </button>
    </div>
  )
}
