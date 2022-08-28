import { useQuery } from "@tanstack/react-query"
import { FC } from "react"

import type { NextPageWithLayout } from "src/types"
import SEO from "src/components/seo"
import { getPassportData } from "src/api/passport"

const Failure: FC = () => {
  return <p role="alert">Failed to get data</p>
}

const Loading: FC = () => {
  return <p role="progressbar">Loading...</p>
}

const Success: FC<{ data: Awaited<ReturnType<typeof getPassportData>> }> = ({
  data,
}) => {
  return (
    <ul>
      {data.map((d) => {
        const { requirement, code, name, continent } = d
        return (
          <li key={name + "-" + code}>
            {continent} {code} {name} -{" "}
            <span
              style={{
                color: requirement === "Visa Free" ? "green" : "orange",
              }}
            >
              {requirement}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

const HomePage: NextPageWithLayout = () => {
  const { status, data } = useQuery(["passport"], getPassportData)
  if (status === "loading") return <Loading />
  if (status === "error") return <Failure />
  return <Success data={data} />
}

HomePage.getLayout = (page) => {
  return (
    <>
      <SEO title="Malagasy Passport | Datasets" />
      <main>
        <h1>Passport data</h1>
        {page}
      </main>
    </>
  )
}

export default HomePage
