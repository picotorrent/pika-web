import { Button, FormControl, FormHelperText, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { MdSettings } from "react-icons/md";
import { string } from "yup";
import jsonrpc from "../services/jsonrpc";

interface Settings {
  save_path?: string;
}

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [settings, setSettings] = useState<Settings>({});

  useEffect(() => {
    jsonrpc('config.get', ['save_path'])
      .then(r => {
        setSettings({ ...r });
      });
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <Formik
        enableReinitialize={true}
        initialValues={settings}
        onSubmit={(values, { setSubmitting }) => {
          jsonrpc('config.set', {
            ...values
          }).then(onClose);
        }}
      >
        {({
          handleChange,
          handleSubmit,
          values
        }) => (
          <form onSubmit={handleSubmit}>
            <ModalContent>
              <ModalHeader>Settings</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel htmlFor="save_path">Save path</FormLabel>
                  <Input
                    id="save_path"
                    name="save_path"
                    onChange={handleChange}
                    value={values.save_path}
                  />
                  <FormHelperText>The default save path for new torrents.</FormHelperText>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button type="submit" aria-label="" colorScheme="blue" leftIcon={<MdSettings />}>Save settings</Button>
              </ModalFooter>
            </ModalContent>
          </form>
        )}
      </Formik>
    </Modal>
  )
}
