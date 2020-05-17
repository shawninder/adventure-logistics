import Header from './header.js'
import Footer from './footer.js'

export default function Page ({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
