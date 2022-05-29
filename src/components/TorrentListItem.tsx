import './TorrentListItem.css';

import { Box, Flex, HStack, Icon, IconButton, Menu, MenuButton, MenuGroup, MenuItem, MenuList, Progress, Tag, Text } from "@chakra-ui/react";
import { MdOutlineFindReplace, MdCloudUpload, MdFolder, MdDownload, MdUpload, MdPeople, MdSettings, MdLabel, MdPause, MdDriveFileMove, MdCloudDownload, MdPlayArrow, MdCheck } from "react-icons/md";
import { InfoHash, Torrent, TorrentState } from "../types";
import RemoveMenuItem from "./RemoveMenuItem";
import filesize from 'filesize';

interface TorrentListItemProps {
  onEditLabels?: (torrent: Torrent) => void;
  onMove?: (torrent: Torrent) => void;
  onPause: (hash: InfoHash) => void;
  onResume: (hash: InfoHash) => void;
  torrent: Torrent;
}

function isPaused(torrent: Torrent) {
  return (torrent.flags & (1<<4)) === 1<<4;
}

function isCompleted(torrent: Torrent): boolean {
  return isPaused(torrent) && torrent.state === TorrentState.Seeding;
}

export default function TorrentListItem(props: TorrentListItemProps) {
  const {
    onEditLabels,
    onMove,
    onPause,
    onResume,
    torrent
  } = props;

  const getColor = (t: Torrent) => {
    if (isCompleted(t)) {
      return "green";
    }

    switch (t.state) {
      case TorrentState.Metadata:
        return "gray";
      case TorrentState.Downloading:
        return "blue";
      case TorrentState.Seeding:
        return "green"
    }
  }

  const getIcon = (torrent: Torrent) => {
    if (isPaused(torrent)) {
      if (torrent.state === 5) {
        return MdCheck;
      }
      return MdPause;
    }

    switch (torrent.state) {
      case 2: return MdOutlineFindReplace;
      case 5: return MdCloudUpload;
    }

    return MdCloudDownload;
  }

  return (
    <Box className='TorrentListItem' p='2' borderColor={'gray.200'} borderRadius='lg' borderWidth={'thin'}>
      <Flex alignItems={'center'}>
        <Box flex='1'>
          <Flex>
            <Flex fontSize='sm' flex={1}>
              <HStack alignItems='center'>
                <Text>{torrent.name || torrent.info_hash[0]}</Text>
                <Icon as={getIcon(torrent)} color={getColor(torrent)} />
              </HStack>
            </Flex>
            <Tag size='sm'>Linux ISOs</Tag>
          </Flex>
          <HStack spacing='3' mt='1'>
            <Flex alignItems={'center'} flex='1'>
              <Icon as={MdFolder} size='xs' mr='1' color='gray.400' />
              <Text fontSize={'xs'} color='gray.500'>{torrent.save_path}</Text>
            </Flex>
            { torrent.state !== TorrentState.Metadata && (
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
            isIndeterminate={torrent.state === TorrentState.Metadata}
            colorScheme={getColor(torrent)}
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
              {
                isPaused(torrent)
                  ? <MenuItem icon={<MdPlayArrow />} onClick={() => onResume(torrent.info_hash)}>Resume</MenuItem>
                  : <MenuItem icon={<MdPause />} onClick={() => onPause(torrent.info_hash)}>Pause</MenuItem>
              }

              { onMove && <MenuItem icon={<MdDriveFileMove />} onClick={() => onMove(torrent)}>Move</MenuItem> }
              <RemoveMenuItem hash={torrent.info_hash} />
            </MenuGroup>
            <MenuGroup title='Other'>
              { onEditLabels && <MenuItem icon={<MdLabel />} onClick={() => onEditLabels(torrent)}>Labels</MenuItem> }
            </MenuGroup>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  )
}
