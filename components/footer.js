import Link from 'next/link'

export default function Footer () {
  return (
    <footer>
      <ul id='footer-links'>
        <li>
          <h6><Link href='/'><a>Adventure Logistics</a></Link></h6>
          {/* <ul>
            <li><Link href='/about'><a>About Us</a></Link></li>
            <li><Link href='/apps'><a>Apps</a></Link></li>
            <li><Link href='/pricing'><a>Pricing</a></Link></li>
            <li><Link href='/careers'><a>Careers</a></Link></li>
            <li><Link href='/contact'><a>Contact Us</a></Link></li>
            <li><Link href='/roadmap'><a>Roadmap</a></Link></li>
            <li><Link href='/status'><a>Status</a></Link></li>
          </ul> */}
        </li>
        {/* <li>
          <h6><Link href='/features'><a>Features</a></Link></h6>
          <ul>
            <li><Link href='/features/core'><a>Core Features</a></Link></li>
            <li><Link href='/features/free'><a>Free Features</a></Link></li>
            <li><Link href='/features/paid'><a>Paid Features</a></Link></li>
            <li><Link href='/features/subscriptions'><a>Subscriptions</a></Link></li>
          </ul>
        </li>
        <li>
          <h6><Link href='/services'><a>Services</a></Link></h6>
          <ul>
            <li><Link href='/apis'><a>APIs</a></Link></li>
          </ul>
        </li>
        <li>
          <h6><Link href='/conformance'><a>Conformance</a></Link></h6>
          <ul>
            {/* <li>
              <a
                href='https://www.w3.org/WAI/WCAG2AAA-Conformance'
                title='Explanation of WCAG 2.0 Level Triple-A Conformance'
              >
                <img
                  height='32'
                  width='88'
                  src='https://www.w3.org/WAI/wcag2AAA'
                  alt='Level Triple-A conformance, W3C WAI Web Content Accessibility Guidelines 2.0'
                />
              </a>
            </li>
            <li><Link href='/compliance/gdpr'><a>GDPR</a></Link></li>
          </ul>
        </li> */}
      </ul>
      {/* <ul id='footer-deal-breakers'>
        <li>© 2020 Adventure Logistics</li>
        <li><Link href='/security'><a>Security</a></Link></li>
        <li><Link href='/privacy'><a>Your Privacy</a></Link></li>
        <li><Link href='/terms'><a>Terms</a></Link></li>
      </ul> */}
      <style jsx>
        {`
          ul {
            list-style: none;
            padding-left: 0;
          }
          footer {
            font-size: smaller;
            padding: 4rem 2rem 3rem 1rem;
          }
          #footer-links {
            text-align: center;
          }
          #footer-links > li {
            display: inline-block;
            vertical-align: top;
            text-align: left;
          }
          #footer-links > li:not(:last-of-type) {
            margin-right: 10rem;
          }
          #footer-deal-breakers {
            text-align: right;
            font-size: smaller;
          }
          #footer-deal-breakers li {
            display: inline-block;
            vertical-align: top;
          }
          #footer-deal-breakers li:not(:last-of-type)::after {
            content: '|';
            margin: 0 0.2rem;
          }
        `}
      </style>
    </footer>
  )
}
