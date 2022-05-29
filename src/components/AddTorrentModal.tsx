import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Stack, Text, VStack } from "@chakra-ui/react";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import jsonrpc from "../services/jsonrpc";

const readFile = (blob: Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function () {
      const idx = reader.result?.toString().indexOf('base64,')!;
      const data = reader.result?.toString().substring(idx + 'base64,'.length);
      resolve(data);
    };
    reader.onerror = (ev) => reject();
    reader.readAsDataURL(blob);
  })
}

interface AddTorrentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddTorrentModal({ isOpen, onClose }: AddTorrentModalProps) {
  const [error, setError] = useState<any>();
  const [settings, setSettings] = useState<Record<string,string>>({});

  useEffect(() => {
    jsonrpc('config.get', [ 'save_path' ])
      .then(r => setSettings({ ...r }));
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <ModalOverlay />
      <Formik
        enableReinitialize={true}
        initialValues={{
          type: '1',
          ti: Blob,
          magnetLink: '',
          savePath: settings.save_path
        }}
        onSubmit={(values, { setSubmitting }) => {
          const params = {
            magnet_uri: values.magnetLink,
            save_path: values.savePath
          };

          jsonrpc('session.addTorrent', params)
            .then(() => onClose())
            .catch(err => setError(err))
            .then(() => setSubmitting(false));
        }}
      >
        {({
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          values
        }) => (
          <form onSubmit={handleSubmit}>
            <ModalContent>
              <ModalHeader>Add torrent</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack align={'stretch'}>
                  <Box>
                    <RadioGroup value={values.type}>
                      <Stack direction='row' spacing={3}>
                        <Radio name="type" value="1" onChange={handleChange}>File</Radio>
                        <Radio name="type" value="2" onChange={handleChange}>Magnet link</Radio>
                      </Stack>
                    </RadioGroup>
                    <Box mt='2'>
                      { values.type === '1' &&
                        <Input
                          name="ti"
                          type="file"
                          onChange={ev => {
                            const len = ev.currentTarget.files?.length || 0;
                            if (len > 0) {
                              setFieldValue("ti", ev.currentTarget.files![0]);
                            }
                          }} />
                      }
                      { values.type === '2' &&
                        <Input
                          name="magnetLink"
                          placeholder='magnet:?xt=urn:btih:...'
                          onChange={handleChange}
                          value={values.magnetLink}
                        />
                      }
                    </Box>
                  </Box>
                  <Box>
                    <Text>Save path</Text>
                    <Input name="savePath" onChange={handleChange} value={values.savePath} />
                  </Box>
                </VStack>
                { error &&
                  <Alert mr='3' mt='3' status='error' borderRadius='md'>
                    <AlertIcon />
                    <Box>
                      <AlertTitle>Error!</AlertTitle>
                      <AlertDescription>{error.message}</AlertDescription>
                    </Box>
                  </Alert>
                }
              </ModalBody>
              <ModalFooter>
                <Button type='submit'>Add</Button>
              </ModalFooter>
            </ModalContent>
          </form>
        )}
      </Formik>
    </Modal>
  )
}
