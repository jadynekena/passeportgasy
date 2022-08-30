import Head from "next/head"
import { FC } from "react"

const SEO: FC<{ title: string }> = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  )
}

export default SEO
