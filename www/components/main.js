export default function Main ({ children }) {
  return (
    <main>
      {children}
      <style jsx>
        {`
          main {
            padding: 0 2rem 0 1rem;
          }
        `}
      </style>
    </main>
  )
}
