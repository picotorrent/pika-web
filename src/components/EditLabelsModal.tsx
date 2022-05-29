import { Box, Button, Flex, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack } from "@chakra-ui/react";
import { ErrorMessage, FieldArray, Formik } from "formik";
import { MdAdd, MdLabel, MdRemove } from "react-icons/md";
import jsonrpc from "../services/jsonrpc";
import { Torrent } from "../types"
import * as Yup from 'yup';

interface EditLabelsModalProps {
  onClose: () => void;
  torrent: Torrent;
}

interface LabelItem {
  name: string;
  value: string;
}

const LabelsSchema = Yup.object().shape({
  labels: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Required"),
      value: Yup.string().required("Required")
    })
  )
});

export default function EditLabelsModal({ onClose, torrent }: EditLabelsModalProps) {
  return (
    <Modal isOpen={!!torrent} onClose={onClose} size='lg'>
      <ModalOverlay />
      <Formik
        initialValues={{
          labels: Array<LabelItem>()
        }}
        onSubmit={(values, { setSubmitting }) => {
          const labels: Record<string, string> = {};

          for (const label of values.labels) {
            labels[label.name] = label.value;
          }

          jsonrpc('torrents.setLabels', [{
            info_hash: torrent.info_hash,
            labels
          }]).then(r => onClose());
        }}
        validationSchema={LabelsSchema}
      >
        {({
          errors,
          handleChange,
          handleSubmit,
          values
        }) => (
          <form onSubmit={handleSubmit}>
            <FieldArray
              name="labels"
              render={arrayHelpers => (
                <ModalContent>
                  <ModalHeader>Edit labels</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Flex borderBottom="1px solid #f0f0f0" mb="3" pb="2">
                      <Box flex="1" mr="2"><Text fontWeight="bold">Name</Text></Box>
                      <Box flex="2">
                        <Flex alignItems="center">
                          <Box flex="1"><Text fontWeight="bold">Value</Text></Box>
                          <Box>
                            <IconButton onClick={() => arrayHelpers.push({ name: "foo", value: "bar"})} aria-label="Add label" icon={<MdAdd />} size="xs" variant="outline" colorScheme="gray" />
                          </Box>
                        </Flex>
                      </Box>
                    </Flex>
                    <VStack align="stretch" spacing="2">
                      { values.labels?.length > 0 && values.labels.map((l, index) => (
                        <Flex key={index} alignItems="center">
                          <Box flex="1" mr="2">
                            <Input name={`labels.${index}.name`} onChange={handleChange} value={l.name} size="sm" />
                          </Box>
                          <Box flex="2">
                            <Flex alignItems="center">
                              <Input name={`labels.${index}.value`} onChange={handleChange} value={l.value} flex="1" size="sm" />
                              <IconButton onClick={() => arrayHelpers.remove(index)} aria-label="Remove" icon={<MdRemove />} ml="2" size="xs" variant="outline" colorScheme="gray" />
                            </Flex>
                          </Box>
                        </Flex>
                      ))}
                    </VStack>
                  </ModalBody>
                  <ModalFooter>
                    <Button type="submit" aria-label="" colorScheme="blue" leftIcon={<MdLabel />}>Save labels</Button>
                  </ModalFooter>
                </ModalContent>
              )}
            />
          </form>
        )}
      </Formik>
    </Modal>
  )
}
