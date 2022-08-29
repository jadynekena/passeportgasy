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
} from "@chakra-ui/react"

import type { PasseportInformationPerCountry } from "src/types"
import { FC, ReactNode } from "react"
import { InfoOutlineIcon } from "@chakra-ui/icons"

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
        color={info.getValue() === "Free" ? "green.500" : "orange.500"}
      >
        {info.getValue()}
      </Text>
    ),
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
