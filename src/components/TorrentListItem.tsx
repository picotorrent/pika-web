import './TorrentListItem.css';

import { Box, Flex, HStack, Icon, IconButton, Menu, MenuButton, MenuGroup, MenuItem, MenuList, Progress, Tag, Text } from "@chakra-ui/react";
import { MdOutlineFindReplace, MdCloudUpload, MdFolder, MdDownload, MdUpload, MdPeople, MdSettings, MdOutlineFolder, MdLabel, MdPause, MdDriveFileMove, MdCloudDownload } from "react-icons/md";
import { Torrent } from "../types";
import RemoveMenuItem from "./RemoveMenuItem";
import filesize from 'filesize';

interface TorrentListItemProps {
  onMove?: (torrent: Torrent) => void;
  onPause: (hash: string) => void | undefined;
  torrent: Torrent;
}

export default function TorrentListItem(props: TorrentListItemProps) {
  const {
    onMove,
    onPause,
    torrent
  } = props;

  const getColor = (state: number) => {
    switch (state) {
      case 2: // metadata
        return "gray";
      case 3: // downloading
        return "green";
      case 5: // seeding
        return "blue"
    }
  }

  return (
    <Box className='TorrentListItem' p='2' borderColor={'gray.200'} borderRadius='lg' borderWidth={'thin'}>
      <Flex alignItems={'center'}>
        <Box flex='1'>
          <Flex>
            <Flex fontSize='sm' flex={1}>
              <HStack alignItems='center'>
                <Text>{torrent.name || torrent.info_hash_v1} {torrent.flags}</Text>
                {torrent.state===2 &&
                  <Icon as={MdOutlineFindReplace} />
                }
                {torrent.state===3 &&
                  <Icon as={MdCloudDownload} color="green.300" />
                }
                {torrent.state===5 &&
                  <Icon as={MdCloudUpload} color='blue.400' />
                }
              </HStack>
            </Flex>
            <Tag size='sm'>Linux ISOs</Tag>
          </Flex>
          <HStack spacing='3' mt='1'>
            <Flex alignItems={'center'} flex='1'>
              <Icon as={MdFolder} size='xs' mr='1' color='gray.400' />
              <Text fontSize={'xs'} color='gray.500'>{torrent.save_path}</Text>
            </Flex>
            { torrent.state !== 2 && (
              <>
                <Flex alignItems='end'>
                  <Icon as={MdDownload} size='xs' mr='1' color='gray.400' />
                  <Text fontSize='xs' color='gray.500'>{filesize(torrent.dl)}/s</Text>
                </Flex>
                <Flex alignItems='end'>
                  <Icon as={MdUpload} size='xs' mr='1' color='gray.400' />
                  <Text fontSize='xs' color='gray.500'>{filesize(torrent.ul)}/s</Text>
                </Flex>
                <Flex alignItems='center'>
                  <Icon as={MdPeople} size='xs' mr='1' color='gray.400' />
                  <Text fontSize='xs' color='gray.500'>{torrent.num_peers + torrent.num_seeds}</Text>
                </Flex>
              </>
            )}
          </HStack> 
          <Progress
            value={torrent.progress*100}
            size="xs"
            mt={1}
            isIndeterminate={torrent.state===2}
            colorScheme={getColor(torrent.state)}
          />
        </Box>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Torrent menu'
            icon={<MdSettings />}
            ml='3'
            size='sm'
            variant='ghost'
          />
          <MenuList>
            <MenuGroup title='Actions'>
              <MenuItem icon={<MdPause />} onClick={() => onPause(torrent.info_hash_v1!)}>Pause</MenuItem>
              { onMove && <MenuItem icon={<MdDriveFileMove />} onClick={() => onMove(torrent)}>Move</MenuItem> }
              <RemoveMenuItem hash={torrent.info_hash_v1} />
            </MenuGroup>
            <MenuGroup title='Other'>
              <MenuItem icon={<MdLabel />}>Labels</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  )
}
