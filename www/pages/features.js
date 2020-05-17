import Head from '../components/head'
import Page from '../components/page.js'
import Nav from '../components/nav.js'
import Content from '../texts/features.md'
import Footer from '../components/footer.js'

const Features = function ({ features }) {
  return (
    <Page>
      <Head>
        <title>Adventure Logistics Features</title>
      </Head>
      <Nav />
      <main>
        <Content />
      </main>
      <Footer />
    </Page>
  )
}

export default Features
