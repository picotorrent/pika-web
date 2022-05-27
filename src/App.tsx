import { Alert, AlertIcon, AlertTitle, AspectRatio, Box, Flex, HStack, IconButton, Image, Input, InputGroup, InputLeftElement, InputRightElement, Kbd, Menu, MenuButton, MenuItem, MenuList, useBreakpoint, useToast } from '@chakra-ui/react';
import { HamburgerIcon, SearchIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
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
  const [torrents, setTorrents] = useState<Torrent[]>([]);
  const [showAddTorrentModal, setShowAddTorrentModal] = useState(false);
  const [moveTorrent, setMoveTorrent] = useState<Torrent | undefined>(undefined);
  const toast = useToast();

  useEffect(() => {
    const es = new EventSource('/api/events', {withCredentials: true});

    es.addEventListener('initial_state', e => {
      for (const torrent of JSON.parse(e.data)) {
        const {
          info_hash_v1,
          info_hash_v2 } = torrent;

        jsonrpc('session.getTorrent', {
          info_hash_v1,
          info_hash_v2
        })
        .then(r => {
          setTorrents([ ...torrents, r ]);
        });
      }
    });

    es.addEventListener('torrent_added', (e) => {
      const {
        info_hash_v1,
        info_hash_v2 } = JSON.parse(e.data);

      jsonrpc('session.getTorrent', {
        info_hash_v1,
        info_hash_v2
      })
      .then(r => {
        setTorrents([ ...torrents, r ]);
        toast({
          position: 'bottom-right',
          title: 'Torrent added'
        });
      });
    });
    es.addEventListener('torrent_removed', (e) => {
      toast({ position: 'bottom-right', title: 'Torrent removed' });
    })
    return () => es.close();
  }, []);

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
        { /*error &&
          <Alert status='error'>
            <AlertIcon />
            <AlertTitle>Cannot connect to Pika API.</AlertTitle>
          </Alert>
        */ }

        { torrents?.length >= 0 &&
          <TorrentList
            onMove={setMoveTorrent}
            onPause={pause}
            torrents={torrents}
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
