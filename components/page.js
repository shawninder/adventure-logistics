import Header from './header.js'
import Footer from './footer.js'

export default function Page ({ children }) {
  return (
    <div className='grid'>
      <header>
        <Header />
      </header>
      <main>
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
      <style jsx>
        {`
          .grid {
            display: grid;
            height: 100vh;
            grid-template-rows: 100px 1fr 100px;
            grid-template-areas:
              "header"
              "main"
              "footer";
          }
          header {
            grid-area: header;
          }
          main {
            grid-area: main;
          }
          footer {
            grid-area: footer;
          }
        `}
      </style>
    </div>
  )
}
