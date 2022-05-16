import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Checkbox, MenuItem, useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { MdOutlineRemove } from "react-icons/md";

export default function RemoveMenuItem(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null);
  const [removeData, setRemoveData] = useState(false);

  function remove() {
    fetch('/api/jsonrpc', {
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'session.removeTorrent',
        id: 1337,
        params: {
          info_hash: props.infoHash,
          remove_data: removeData
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
              Are you sure? The torrent {removeData && <>and any downloaded data</>} will be removed from Pika.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Checkbox flex='1' isChecked={removeData} onChange={(e) => setRemoveData(e.target.checked)}>Remove data</Checkbox>
              <Button ref={cancelRef} onClick={onClose}>Cancel</Button>
              <Button colorScheme={removeData?'red':'yellow'} ml='3' onClick={remove}>Remove</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}