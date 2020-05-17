import Link from 'next/link'

export default function Nav () {
  return (
    <nav>
      <ul className='nes-list is-disc'>
        <li><Link href='/'><a>Home</a></Link></li>
        <li><Link href='/features'><a>Features</a></Link></li>
      </ul>
    </nav>
  )
}
