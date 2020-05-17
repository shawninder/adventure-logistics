import Link from 'next/link'

export default function Header () {
  return (
    <header>
      <h1>Adventure Logistics</h1>
      <div id='header-links'>
        <ul id='header-links-info'>
          <li><Link href='/products'><a className='nes-btn'>Products</a></Link></li>
          <li><Link href='/services'><a className='nes-btn'>Services</a></Link></li>
          <li><Link href='/pricing'><a className='nes-btn'>Pricing</a></Link></li>
          <li><Link href='/learn'><a className='nes-btn'>Learn</a></Link></li>
        </ul>
        <ul id='header-links-auth'>
          <li><Link href='/signin'><a className='nes-btn'>Sign In</a></Link></li>
          <li><Link href='/signup'><a className='nes-btn is-primary'>Sign Up</a></Link></li>
        </ul>
      </div>
      <style jsx>
        {`
          header {
            padding: 1rem 1rem 0;
          }
          #header-links {
            width: 100%;
            text-align: right;
          }
          ul {
            list-style: none;
            padding-left: 0;
            display: inline-block;
          }
          #header-links ul:not(:last-of-type) {
            margin-right: 3rem;
          }
          ul > li {
            display: inline-block;
            vertical-align: top;
            margin: 1rem;
          }
        `}
      </style>
    </header>
  )
}
