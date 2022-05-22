import { Alert, AlertIcon, AlertTitle, AspectRatio, Box, Flex, HStack, IconButton, Image, Input, InputGroup, InputLeftElement, InputRightElement, Kbd, Menu, MenuButton, MenuItem, MenuList, useBreakpoint } from '@chakra-ui/react';
import { HamburgerIcon, SearchIcon } from '@chakra-ui/icons';
import useSwr from 'swr';
import { useState } from 'react';
import AddTorrentModal from './components/AddTorrentModal';
import { Torrent } from './types';
import TorrentList from './components/TorrentList';
import jsonrpc from './services/jsonrpc';
import MoveTorrentModal from './components/MoveTorrentModal';

function pause(hash: string) {
  jsonrpc('torrents.pause', [ hash ])
    .catch(console.error);
}

function App() {
  const { data, error } = useSwr(
    'session.listTorrents',
    (key: string) => jsonrpc(key, []),
    { refreshInterval: 1000 });

  const [showAddTorrentModal, setShowAddTorrentModal] = useState(false);
  const [moveTorrent, setMoveTorrent] = useState<Torrent | undefined>(undefined);

  return (
    <Flex mt='20px' justifyContent={'center'} mx='10px'>
      <Box w='640px'>
        <HStack alignItems={'center'} borderBottom={'1px solid #f0f0f0'} align='stretch' mb='3' pb={'3'}>
          <Box>
            <AspectRatio w={'32px'} ratio={1}>
              <Image src='/logo.png' />
            </AspectRatio>
          </Box>
          <Box flex={1}>
            <InputGroup>
              <InputLeftElement
                pointerEvents={'none'}
                children={<SearchIcon color={'gray.300'} />}
              />
              <Input placeholder='Search torrents...' />
              {}
              <InputRightElement pointerEvents={'none'} width='6em'>
                <HStack>
                  <Kbd>Ctrl</Kbd>
                  <Kbd>K</Kbd>
                </HStack>
              </InputRightElement>
            </InputGroup>
          </Box>
          <Box>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label='Menu'
                icon={<HamburgerIcon />}
                size='sm'
                variant='outline'
              />
              <MenuList>
                <MenuItem onClick={() => setShowAddTorrentModal(true)}>Add torrent</MenuItem>
                <MenuItem>Settings</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </HStack>
        { error &&
          <Alert status='error'>
            <AlertIcon />
            <AlertTitle>Cannot connect to Pika API.</AlertTitle>
          </Alert>
        }

        { !error && data?.length >= 0 &&
          <TorrentList
            onMove={setMoveTorrent}
            onPause={pause}
            torrents={data as Torrent[]}
          />
        }
      </Box>

      { moveTorrent &&
        <MoveTorrentModal
          onClose={() => setMoveTorrent(undefined) }
          torrent={moveTorrent}
        />
      }

      { showAddTorrentModal &&
        <AddTorrentModal
          isOpen={showAddTorrentModal}
          onClose={() => setShowAddTorrentModal(false) }
        />
      }
    </Flex>
  );
}

export default App;
