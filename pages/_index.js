import Head from '../components/head.js'
import Page from '../components/page.js'
import Main from '../components/main.js'
import KeyFeatures from '../components/keyFeatures.js'
import TagLine from '../components/tagLine.js'

export default function Home () {
  return (
    <Page>
      <Head>
        <title>Adventure Logistics</title>
      </Head>
      <Main>
        <TagLine />
        <KeyFeatures />
      </Main>
    </Page>
  )
}
