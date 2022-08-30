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
} from "@chakra-ui/react"

import type { PasseportInformationPerCountry } from "src/types"
import { FC, ReactNode } from "react"
import { ExternalLinkIcon, InfoOutlineIcon } from "@chakra-ui/icons"

const columnHelper = createColumnHelper<PasseportInformationPerCountry>()
export const columns = [
  //columnHelper.accessor("code", {
  //  header: "Code",
  //  cell: (info) => info.getValue(),
  //}),
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
        color={info.getValue() === "Free" ? "green.600" : "red.600"}
      >
        {info.getValue()}
      </Text>
    ),
  }),
  columnHelper.accessor("source", {
    header: "Source",
    cell(props) {
      return (
        <Link href={props.getValue()} isExternal>
          Source <ExternalLinkIcon />
        </Link>
      )
    },
  }),
  columnHelper.display({
    id: "actions",
    header: "Détails",
    cell: (props) => {
      return (
        <DetailModal>
          <Text>{props.row.getValue("name")}</Text>
          <Text>{props.row.getValue("name")}</Text>
        </DetailModal>
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
          <ModalHeader>Country details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
