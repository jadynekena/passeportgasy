import { FC } from "react"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  getFilteredRowModel,
  getFacetedUniqueValues,
  getFacetedRowModel,
  Column,
} from "@tanstack/react-table"
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Flex,
  InputGroup,
  InputLeftElement,
  Box,
  TableContainer,
} from "@chakra-ui/react"
import {
  Search2Icon,
  TriangleDownIcon,
  TriangleUpIcon,
  UpDownIcon,
} from "@chakra-ui/icons"

import type { PasseportInformationPerCountry } from "src/types"
import { columns } from "./helpers"

const PassportInformationTable: FC<{
  data: PasseportInformationPerCountry[]
}> = ({ data }) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedRowModel: getFacetedRowModel(),
  })
  return (
    <TableContainer>
      <Table size="sm">
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  switch (header.id) {
                    case "actions":
                    case "source":
                    case "lastVerified":
                    case "maxLengthStay":
                      return <Th key={header.id} colSpan={header.colSpan} />
                    default:
                      return (
                        <Th key={header.id} colSpan={header.colSpan}>
                          <Flex
                            alignItems="center"
                            mb={2}
                            sx={{ gap: 2 }}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {{
                              asc: <TriangleDownIcon />,
                              desc: <TriangleUpIcon />,
                            }[header.column.getIsSorted() as string] ?? (
                              <UpDownIcon />
                            )}
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </Flex>
                          {header.column.getCanFilter() ? (
                            <Filter column={header.column} />
                          ) : null}
                        </Th>
                      )
                  }
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
    </TableContainer>
  )
}

const Filter: FC<{
  column: Column<PasseportInformationPerCountry, unknown>
}> = ({ column }) => {
  const uniqueValuesSorted = Array.from(
    column.getFacetedUniqueValues().keys()
  ).sort()

  return (
    <Box>
      <InputGroup size="sm">
        <InputLeftElement pointerEvents="none">
          <Search2Icon color="gray.200" />
        </InputLeftElement>
        <datalist id={column.id + "list"}>
          {uniqueValuesSorted.map((v) => (
            <option value={v} key={v}>
              {v}
            </option>
          ))}
        </datalist>
        <Input
          list={column.id + "list"}
          value={(column.getFilterValue() ?? "") as string}
          onChange={(e) => column.setFilterValue(e.target.value)}
        />
      </InputGroup>
    </Box>
  )
}

export default PassportInformationTable
