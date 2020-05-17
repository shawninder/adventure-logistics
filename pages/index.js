import Head from '../components/head.js'
import Page from '../components/page.js'
import Main from '../components/main.js'
import Content from '../texts/comingSoon.md'

export default function Home () {
  return (
    <Page>
      <Head>
        <title>Adventure Logistics</title>
      </Head>
      <Main>
        <Content />
      </Main>
      <style jsx>
        {`
        `}
      </style>
    </Page>
  )
}
