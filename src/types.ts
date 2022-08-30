import type { ReactElement, ReactNode } from "react"
import type { NextPage } from "next"
import type { AppProps } from "next/app"

export type NextPageWithLayout = NextPage & {
  // eslint-disable-next-line no-unused-vars
  getLayout?: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export interface PassportRawData {
  Continent: string
  Country: string
  "Country code": string
  "Visa requirements": string
  "Verification status": string
  "Max length of stay (days)": number
  "Visa References": string
  "Any malagasy traveled over there and testified": string
  "Distance (km)": number
  "Average direct flight duration (hours)": number
  "Direct flights available": string
  _GSHEET_ROW_NUMBER: number
}

export interface PasseportInformationPerCountry {
  name: string
  code: string
  continent: string
  requirement: string
  lastVerified: string
  maxLengthStay: number
  source: string
}
