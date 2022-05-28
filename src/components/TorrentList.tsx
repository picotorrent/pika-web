import { Alert, AlertIcon, AlertTitle, VStack } from "@chakra-ui/react"
import { InfoHash, Torrent } from "../types"
import TorrentListItem from "./TorrentListItem"

interface TorrentListProps {
  onMove?: (torrent: Torrent) => void;
  onPause: (hash: InfoHash) => void;
  onResume: (hash: InfoHash) => void;
  torrents: Torrent[]
}

export default function TorrentList({ onMove, onPause, onResume, torrents }: TorrentListProps) {
  if (!torrents?.length) {
    return (
      <Alert status='info'>
        <AlertIcon />
        <AlertTitle>No torrents added yet.</AlertTitle>
      </Alert>
    )
  }

  return (
    <VStack align={'stretch'} spacing={2}>
      { torrents.map(torrent => 
        <TorrentListItem
          key={torrent.info_hash[0]}
          onMove={onMove}
          onPause={onPause}
          onResume={onResume}
          torrent={torrent}
        />
      )}
    </VStack>
  )
}
