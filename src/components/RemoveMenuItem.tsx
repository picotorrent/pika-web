import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Checkbox, MenuItem, useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { MdOutlineRemove } from "react-icons/md";

export default function RemoveMenuItem({ hash }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null);
  const [removeFiles, setRemoveFiles] = useState(false);

  function remove() {
    fetch('/api/jsonrpc', {
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'session.removeTorrent',
        id: 1337,
        params: {
          info_hash: hash,
          remove_files: removeFiles
        }
      }),
      method: 'POST'
    })
    .then((res) => res.json())
    .then(() => onClose());
  }

  return (
    <>
      <MenuItem icon={<MdOutlineRemove />} onClick={onOpen}>Remove</MenuItem>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>
              Remove torrent
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? The torrent {removeFiles && <>and any downloaded data</>} will be removed from Pika.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Checkbox flex='1' isChecked={removeFiles} onChange={(e) => setRemoveFiles(e.target.checked)}>Remove data</Checkbox>
              <Button ref={cancelRef} onClick={onClose}>Cancel</Button>
              <Button colorScheme={removeFiles?'red':'yellow'} ml='3' onClick={remove}>Remove</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
