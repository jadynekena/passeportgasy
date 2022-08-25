const API_BASE_URL =
  "https://script.google.com/macros/s/AKfycbxASPbjGUjRiZM7ItRlwhHu3tnzdybaPypoFI3p4jF8AJTs8fmdpqw_ji9k46pm60Uf/exec?_action=rest&APIKEY="

const API_KEY = process.env.API_KEY
const IDSHEET = process.env.IDSHEET

if (typeof API_KEY === "undefined") {
  throw new Error("API_KEY env variable must be set")
}
if (typeof IDSHEET === "undefined") {
  throw new Error("IDSHEET env variable must be set")
}

export const API_URL = `${API_BASE_URL}${API_KEY}&IDESHEET=${IDSHEET}`
