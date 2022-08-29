import type { FC } from "react"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  getFilteredRowModel,
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
  })
  return (
    <Table>
      <Thead>
        {table.getHeaderGroups().map((headerGroup) => {
          return (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                if (header.id === "actions")
                  return <Th key={header.id} colSpan={header.colSpan} />
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
                      <Box>
                        <InputGroup size="sm">
                          <InputLeftElement pointerEvents="none">
                            <Search2Icon color="gray.200" />
                          </InputLeftElement>
                          <Input
                            value={
                              (header.column.getFilterValue() ?? "") as string
                            }
                            onChange={(e) =>
                              header.column.setFilterValue(e.target.value)
                            }
                          />
                        </InputGroup>
                      </Box>
                    ) : null}
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

export default PassportInformationTable
