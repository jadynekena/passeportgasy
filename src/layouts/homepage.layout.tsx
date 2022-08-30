import { FC, ReactNode } from "react"
import { Flex, Heading } from "@chakra-ui/react"

import SEO from "src/components/seo"

const HomePageLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <SEO title="Malagasy Passport | Datasets" />
      <Flex as="main" padding={5} direction="column" sx={{ gap: 10 }}>
        <Heading as="h1">Passport data</Heading>
        {children}
      </Flex>
    </>
  )
}

export default HomePageLayout
