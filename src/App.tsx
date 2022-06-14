import { AspectRatio, Box, Button, Divider, Flex, HStack, IconButton, Image, Input, InputGroup, InputLeftElement, InputRightElement, Kbd, Menu, MenuButton, MenuItem, MenuList, useToast } from "@chakra-ui/react";
import { AddIcon, HamburgerIcon, SearchIcon, SettingsIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import AddTorrentModal from "./components/AddTorrentModal";
import { InfoHash, Torrent } from "./types";
import TorrentList from "./components/TorrentList";
import jsonrpc from "./services/jsonrpc";
import MoveTorrentModal from "./components/MoveTorrentModal";
import EditLabelsModal from "./components/EditLabelsModal";
import SettingsModal from "./components/SettingsModal";
import ToggleTheme from "./components/ToggleTheme";
import * as nearley from 'nearley';
import * as pql from './grammar/pql';

function pause(hash: InfoHash) {
  jsonrpc('torrents.pause', [ hash ])
    .catch(console.error);
}

function resume(hash: InfoHash) {
  jsonrpc('torrents.resume', [ hash ])
    .catch(console.error);
}

function updateTorrents(updated: Torrent[]) : React.SetStateAction<Torrent[]> {
  return (torrents: Torrent[]) => {
    for (const updatedTorrent of updated) {
      const idx = torrents.findIndex(
        c => c.info_hash[0] === updatedTorrent.info_hash[0]);

      if (idx >= 0) {
        torrents[idx] = updatedTorrent;
      }
    }

    return [...torrents];
  }
}

function App() {
  const [torrents, setTorrents] = useState<Torrent[]>([]);
  const [showAddTorrentModal, setShowAddTorrentModal] = useState(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [editLabels, setEditLabels] = useState<Torrent | undefined>(undefined);
  const [moveTorrent, setMoveTorrent] = useState<Torrent | undefined>(undefined);
  const toast = useToast();

  useEffect(() => {
    const es = new EventSource('/api/events', {withCredentials: true});

    es.addEventListener('initial_state', e => {
      const data = JSON.parse(e.data);
      if (data === null) { return; }

      const { torrents } = data;
      const hashes = torrents.map((t:any) => t.info_hash);

      jsonrpc('session.getTorrents', [...hashes])
        .then(r => setTorrents(_ => [...r]));
    });

    es.addEventListener('state_update', e => {
      const data = JSON.parse(e.data);
      const hashes = data.map((t:any) => t.info_hash);

      jsonrpc('session.getTorrents', [...hashes])
        .then(result => {
          setTorrents(updateTorrents(result));
        });
    });

    es.addEventListener('torrent_added', (e) => {
      const data = JSON.parse(e.data);

      jsonrpc('session.getTorrents', [data.info_hash])
        .then(r => setTorrents(t => [...t, ...r]));
    });

    es.addEventListener('torrent_paused', e => {
      const data = JSON.parse(e.data);
      jsonrpc('session.getTorrents', [data.info_hash])
        .then(r => updateTorrents(r));
    });

    es.addEventListener('torrent_removed', (e) => {
      const data = JSON.parse(e.data);

      setTorrents(t => {
        const updated = t.filter(torrent =>
          torrent.info_hash[0] !== data.info_hash[0]);
        return [...updated];
      })

      toast({
        position: 'bottom-right',
        title: 'Torrent removed'
      });
    });

    es.addEventListener('torrent_resumed', e => {
      const data = JSON.parse(e.data);
      jsonrpc('session.getTorrents', [data.info_hash])
        .then(r => updateTorrents(r));
    });

    return () => es.close();
  }, [toast]);

  const testParser = () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(pql));
    parser.feed("not is:completed");
    console.log(parser.results[0]);
  }

  return (
    <Flex mt='20px' justifyContent={'center'} mx='10px'>
      <Button onClick={() => testParser()}>Hej</Button>
      <Box w='640px'>
        <HStack alignItems={'center'} align='stretch' mb='3'>
          <Box>
            <AspectRatio w={'32px'} ratio={1}>
              <Image src='/assets/brand/logo.svg' />
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
            <ToggleTheme />
          </Box>
          <Box>
            <Menu placement="bottom-end">
              <MenuButton
                as={IconButton}
                aria-label='Menu'
                icon={<HamburgerIcon />}
                size='sm'
                variant='outline'
              />
              <MenuList>
                <MenuItem icon={<AddIcon />} onClick={() => setShowAddTorrentModal(true)}>
                  Add torrent
                </MenuItem>
                <MenuItem icon={<SettingsIcon />} onClick={() => setShowSettings(true)}>
                  Settings
                </MenuItem>
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
        <Divider orientation='horizontal' mb='3' />
        { torrents?.length >= 0 &&
          <TorrentList
            onEditLabels={setEditLabels}
            onMove={setMoveTorrent}
            onPause={pause}
            onResume={resume}
            torrents={torrents}
          />
        }
      </Box>

      { editLabels &&
        <EditLabelsModal
          onClose={() => setEditLabels(undefined) }
          torrent={editLabels}
        />
      }

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

      { showSettings &&
        <SettingsModal
          isOpen={showSettings}
          onClose={() => setShowSettings(false) }
        />
      }
    </Flex>
  );
}

export default App;
