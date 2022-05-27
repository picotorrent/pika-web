import { Button, FormControl, FormHelperText, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { Formik } from "formik";
import { MdDriveFileMove } from "react-icons/md";
import jsonrpc from "../services/jsonrpc";
import { Torrent } from "../types"

interface MoveTorrentModalProps {
  onClose: () => void;
  torrent: Torrent;
}

export default function MoveTorrentModal({ onClose, torrent }: MoveTorrentModalProps) {
  return (
    <Modal isOpen={!!torrent} onClose={onClose}>
      <ModalOverlay />
      <Formik
        initialValues={{
          targetPath: torrent.save_path
        }}
        onSubmit={(values, { setSubmitting }) => {
          jsonrpc('torrents.moveStorage', {
            info_hash: torrent.info_hash_v1,
            save_path: values.targetPath
          })
          .then(res => {
            setSubmitting(false);
            onClose();
          })
          .catch(err => {
            console.error(err);
          });
        }}
      >
        {({
          handleChange,
          handleSubmit,
          values
        }) => (
          <form onSubmit={handleSubmit}>
            <ModalContent>
              <ModalHeader>Move {torrent.name}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel htmlFor="targetPath">Target path</FormLabel>
                  <Input
                    id="targetPath"
                    name="targetPath"
                    onChange={handleChange}
                    value={values.targetPath}
                  />
                  <FormHelperText>The path on disk where the torrent will be moved.</FormHelperText>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button type="submit" aria-label="" colorScheme="blue" leftIcon={<MdDriveFileMove />}>Move</Button>
              </ModalFooter>
            </ModalContent>
          </form>
        )}
      </Formik>
    </Modal>
  )
}
