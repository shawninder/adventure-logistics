export default function Teaser () {
  return (
    <div id='teaser'>
      <img src='/Shawn-starting-fire.64x48.JPG' />
      <style jsx>
        {`
          #teaser {
            margin: 0 auto;
            width: 100%
            background-color: black;
          }
          img {
            width: 100%;
            image-rendering: pixelated;
          }
        `}
      </style>
    </div>
  )
}
