export default function Teaser () {
  return (
    <div id='teaser'>
      <img src='/Shawn-starting-fire.JPG' />
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
            image-rendering: pixelated;
          }
        `}
      </style>
    </div>
  )
}
