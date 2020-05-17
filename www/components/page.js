export default function Page ({ children }) {
  return (
    <div className='container'>
      {children}
      <style jsx>
        {`
          .container {
            padding: 4rem 8rem;
          }
        `}
      </style>
    </div>
  )
}
