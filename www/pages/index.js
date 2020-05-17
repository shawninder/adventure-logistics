import Head from '../components/head.js'
import Page from '../components/page.js'
import Nav from '../components/nav.js'
import Content from '../texts/index.md'
import Footer from '../components/footer.js'

export default function Home () {
  return (
    <Page>
      <Head>
        <title>Adventure Logistics</title>
      </Head>

      <Nav />
      <main>
        <Content />
      </main>
      <Footer />
    </Page>
  )
}
