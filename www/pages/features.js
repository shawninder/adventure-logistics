import Head from '../components/head'
import Page from '../components/page.js'
import Main from '../components/main.js'
import Content from '../texts/features.md'

const Features = function ({ features }) {
  return (
    <Page>
      <Head>
        <title>Adventure Logistics Features</title>
      </Head>
      <Main>
        <Content />
      </Main>
    </Page>
  )
}

export default Features
