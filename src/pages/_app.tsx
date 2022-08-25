// VENDORS
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"
import type { AppType } from "next/dist/shared/lib/utils"

import type { AppPropsWithLayout } from "src/types"
import "src/styles/reset.css"

const MyApp = (({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ??
    ((page) => {
      return <>{page}</>
    })

  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      {getLayout(<Component {...pageProps} />)}
    </QueryClientProvider>
  )
}) as AppType

export default MyApp
