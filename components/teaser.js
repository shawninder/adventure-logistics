export default function Teaser () {
  return (
    <div id='teaser'>
      <img src='/Rouge-canyon-rapids-from-above.jpg' />
      <style jsx>
        {`
          #teaser {
            margin: 0 auto;
            width: 600px;
            height: 320px;
            background-color: black;
          }
          img {
            width: 100%;
          }
        `}
      </style>
    </div>
  )
}
