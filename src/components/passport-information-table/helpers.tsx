import { createColumnHelper } from "@tanstack/react-table"
import { Text } from "@chakra-ui/react"

import type { PasseportInformationPerCountry } from "src/types"

const columnHelper = createColumnHelper<PasseportInformationPerCountry>()
export const columns = [
  columnHelper.accessor("code", {
    header: "Code",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: "Country",
    cell: (info) => info.getValue(),
    enableSorting: true,
    sortingFn: "text",
  }),
  columnHelper.accessor("requirement", {
    header: "Visa",
    cell: (info) => (
      <Text
        textTransform="capitalize"
        color={info.getValue() === "Free" ? "green.500" : "orange.500"}
      >
        {info.getValue()}
      </Text>
    ),
  }),
]
