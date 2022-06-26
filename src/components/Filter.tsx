import { Code, Flex, IconButton } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";

interface FilterProps {
  onRemove: () => void;
  text: string;
}

export default function Filter(props: FilterProps) {
  return (
    <Flex
      alignItems="center"
      borderColor="gray.200"
      borderRadius="3px"
      borderWidth="1px"
      p="0.5"
    >
      <Code fontSize="xs">{props.text}</Code>
      <IconButton
        aria-label="Remove"
        colorScheme="pink"
        icon={<MdDelete />}
        onClick={props.onRemove}
        size="xs"
        variant="ghost"
      />
    </Flex>
  )
}