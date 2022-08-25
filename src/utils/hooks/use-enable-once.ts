import { useReducer } from "react"

export default function useEnableOnce() {
  return useReducer(() => true, false)
}
