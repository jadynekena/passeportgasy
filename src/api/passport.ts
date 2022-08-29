import { API_URL } from "src/constants"
import type { PassportRawData, PasseportInformationPerCountry } from "src/types"

export const getPassportData = async (): Promise<
  PasseportInformationPerCountry[]
> => {
  const response = await fetch(API_URL)
  if (response.ok === false) throw new Error("Could not fetch passport data")

  const data = (await response.json()) as PassportRawData[]
  return data.map((d) => ({
    name: d.Country,
    code: d["Country code"],
    continent: d.Continent,
    requirement: d["Visa requirements"].split("Visa ")[1],
    lastVerified: d["Verification status"],
  }))
}
