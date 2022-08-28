import { createColumnHelper } from "@tanstack/react-table"
import { Text } from "@chakra-ui/react"

import type { PasseportInformationPerCountry } from "src/types"

const columnHelper = createColumnHelper<PasseportInformationPerCountry>()
export const columns = [
  columnHelper.accessor("code", {
    header: "Country Code",
    //size: 10,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: "Country",
    //size: 100,
    cell: (info) => info.getValue(),
    enableSorting: true,
    sortingFn: "text",
  }),
  columnHelper.accessor("requirement", {
    header: "Visa",
    //size: 100,
    cell: (info) => (
      <Text
        color={info.getValue() === "Visa Free" ? "green.500" : "orange.500"}
      >
        {info.getValue()}
      </Text>
    ),
  }),
]
