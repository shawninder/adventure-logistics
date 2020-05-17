import NextHead from 'next/head'

export default function Head ({ children }) {
  return (
    <NextHead>
      {children}
    </NextHead>
  )
}
