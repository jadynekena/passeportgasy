import { useQuery } from "@tanstack/react-query"
import { FC } from "react"
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  flexRender,
  getSortedRowModel,
} from "@tanstack/react-table"
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Text,
  Box,
} from "@chakra-ui/react"
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"

import type {
  NextPageWithLayout,
  PasseportInformationPerCountry,
} from "src/types"
import SEO from "src/components/seo"
import { getPassportData } from "src/api/passport"

const columnHelper = createColumnHelper<PasseportInformationPerCountry>()
const columns = [
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

const Failure: FC = () => {
  return <p role="alert">Failed to get data</p>
}

const Loading: FC = () => {
  return <p role="progressbar">Loading...</p>
}

const Success: FC<{ data: Awaited<ReturnType<typeof getPassportData>> }> = ({
  data,
}) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })
  return (
    <Table>
      <Thead>
        {table.getHeaderGroups().map((headerGroup) => {
          return (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {header.column.getIsSorted() === "asc" && (
                      <TriangleDownIcon />
                    )}
                    {header.column.getIsSorted() === "desc" && (
                      <TriangleUpIcon />
                    )}
                  </Th>
                )
              })}
            </Tr>
          )
        })}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map((row) => (
          <Tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

const HomePage: NextPageWithLayout = () => {
  const { status, data } = useQuery(["passport"], getPassportData)
  if (status === "loading") return <Loading />
  if (status === "error") return <Failure />
  return <Success data={data} />
}

HomePage.getLayout = (page) => {
  return (
    <>
      <SEO title="Malagasy Passport | Datasets" />
      <Box as="main" padding={10}>
        <Heading as="h1" mb={10}>
          Passport data
        </Heading>
        {page}
      </Box>
    </>
  )
}

export default HomePage
