import { API_URL } from "src/constants"
import type { PassportData } from "src/types"

export const getPassportData = async () => {
  const response = await fetch(API_URL)
  if (response.ok === false) throw new Error("Could not fetch passport data")
  return response.json() as Promise<PassportData[]>
}
