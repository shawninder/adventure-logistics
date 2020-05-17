import Head from '../components/head.js'
import Page from '../components/page.js'
import Main from '../components/main.js'
import GetStarted from '../components/getStarted.js'
import Teaser from '../components/teaser.js'
import Content from '../texts/index.md'

export default function Home () {
  return (
    <Page>
      <Head>
        <title>Adventure Logistics</title>
      </Head>
      <Main>
        <section id='section-1'>
          <div id='getStarted'>
            <GetStarted />
          </div>
          <div id='teaser'>
            <Teaser />
          </div>
        </section>
        <Content />
      </Main>
      <style jsx>
        {`
          #section-1 {
            display: grid;
            grid-template-areas:
              "getstarted teaser";
            grid-template-columns: 1fr 2fr;
            grid-template-rows: 1fr;
            align-items: center;
            justify-items: center;
          }
          #getStarted {
            grid-area: getstarted;
          }
          #teaser {
            grid-area: teaser;
          }
        `}
      </style>
    </Page>
  )
}
