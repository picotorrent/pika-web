import { Alert, AlertIcon, AlertTitle, VStack } from "@chakra-ui/react"
import { Torrent } from "../types"
import TorrentListItem from "./TorrentListItem"

interface TorrentListProps {
  onMove?: (torrent: Torrent) => void;
  onPause: (hash: string) => void;
  torrents: Torrent[]
}

export default function TorrentList({ onMove, onPause, torrents }: TorrentListProps) {
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
          key={torrent.info_hash_v1}
          onMove={onMove}
          onPause={onPause}
          torrent={torrent}
        />
      )}
    </VStack>
  )
}
