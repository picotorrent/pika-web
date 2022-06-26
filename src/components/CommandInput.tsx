import { SearchIcon } from "@chakra-ui/icons";
import { InputGroup, InputLeftElement, Input, InputRightElement, HStack, Kbd } from "@chakra-ui/react";
import { Formik } from "formik";

interface CommandInputProps {
  onExecute: (cmd: string) => void;
}

export default function CommandInput(props: CommandInputProps) {
  return (
    <Formik
      initialValues={{
        cmd: ''
      }}
      onSubmit={(values, { setSubmitting }) => {
        props.onExecute(values.cmd);
        values.cmd = '';
      }}
    >
      {({
        handleChange,
        handleSubmit,
        values
      }) => (
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <InputLeftElement
              pointerEvents={"none"}
              children={<SearchIcon color={"gray.300"} />}
            />
            <Input
              id="cmd"
              name="cmd"
              placeholder="Filter torrents..."
              onChange={handleChange}
              value={values.cmd}
            />
              <InputRightElement pointerEvents={"none"} width="6em">
              <HStack>
                <Kbd>Ctrl</Kbd>
                <Kbd>K</Kbd>
              </HStack>
            </InputRightElement>
          </InputGroup>
        </form>
      )}
    </Formik>
  )
}