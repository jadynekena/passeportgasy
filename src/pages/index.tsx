import { useQuery } from "@tanstack/react-query"
import { FC } from "react"

import type { NextPageWithLayout } from "src/types"
import { getPassportData } from "src/api/passport"
import PassportInformationTable from "src/components/passport-information-table"
import HomePageLayout from "src/layouts/homepage.layout"
import { Spinner } from "@chakra-ui/react"

const Failure: FC = () => {
  return <p role="alert">Failed to get data</p>
}

const Loading: FC = () => {
  return (
    <Spinner
      mx="auto"
      size="xl"
      color="blue.500"
      emptyColor="gray.200"
      role="progressbar"
    />
  )
}

const Success: FC<{ data: Awaited<ReturnType<typeof getPassportData>> }> = ({
  data,
}) => {
  return <PassportInformationTable data={data} />
}

const HomePage: NextPageWithLayout = () => {
  const { status, data } = useQuery(["passport"], getPassportData)
  if (status === "loading") return <Loading />
  if (status === "error") return <Failure />
  return <Success data={data} />
}

HomePage.getLayout = (page) => <HomePageLayout>{page}</HomePageLayout>

export default HomePage
