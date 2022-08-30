import { createColumnHelper } from "@tanstack/react-table"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  Text,
  useDisclosure,
  IconButton,
  Link,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  Flex,
} from "@chakra-ui/react"

import type { PasseportInformationPerCountry } from "src/types"
import { FC, ReactNode } from "react"
import { ExternalLinkIcon, InfoOutlineIcon } from "@chakra-ui/icons"

const columnHelper = createColumnHelper<PasseportInformationPerCountry>()
export const columns = [
  columnHelper.display({
    id: "actions",
    header: "Détails",
    cell: (info) => {
      const visaRequirement = info.row.getValue("requirement") as string
      const continent = info.row.getValue("continent") as string
      const country = info.row.getValue("name") as string
      const stay = info.row.getValue("maxLengthStay") as string
      const lastVerified = info.row.getValue("lastVerified") as string
      const source = info.row.getValue("source") as string
      return (
        <DetailModal>
          <Flex sx={{ gap: 4 }} direction="column">
            <Text
              fontWeight="bold"
              textTransform="uppercase"
              color={visaRequirement === "free" ? "green.600" : "red.600"}
            >
              Visa {visaRequirement}
            </Text>
            <FormControl isReadOnly>
              <FormLabel>Country</FormLabel>
              <Input value={`${country} (${continent})`} variant="outline" />
            </FormControl>
            <FormControl isReadOnly>
              <FormLabel>Stay</FormLabel>
              <Input value={`${stay} days`} variant="outline" />
            </FormControl>
            <Text as="small" fontSize="sm" color="gray.600">
              {lastVerified} -{" "}
              <Link isExternal href={source}>
                Source <ExternalLinkIcon />
              </Link>
            </Text>
          </Flex>
        </DetailModal>
      )
    },
  }),
  columnHelper.accessor("requirement", {
    header: "Visa",
    cell: (info) => (
      <Text
        textTransform="uppercase"
        fontWeight="bold"
        color={info.getValue() === "free" ? "green.600" : "red.600"}
      >
        {info.getValue()}
      </Text>
    ),
  }),
  columnHelper.accessor("name", {
    header: "Country",
    cell: (info) => info.getValue(),
    enableSorting: true,
    sortingFn: "text",
  }),
  columnHelper.accessor("continent", {
    header: "Continent",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("maxLengthStay", {
    header: "Stay",
    cell(info) {
      return <Text>{info.getValue()} days</Text>
    },
  }),
  columnHelper.accessor("lastVerified", {
    header: "Last verified at",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("source", {
    header: "Source",
    cell(info) {
      return (
        <Link href={info.getValue()} isExternal>
          Source <ExternalLinkIcon />
        </Link>
      )
    },
  }),
]

const DetailModal: FC<{ children: ReactNode }> = ({ children }) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  return (
    <>
      <IconButton
        onClick={onOpen}
        colorScheme="blue"
        aria-label="See details"
        icon={<InfoOutlineIcon />}
        variant="ghost"
        title="See details"
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Button
              onClick={onClose}
              variant="solid"
              colorScheme="blue"
              width="100%"
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
