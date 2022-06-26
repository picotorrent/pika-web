import { Alert, AlertIcon, AlertTitle, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { InfoHash, Torrent, TorrentFilter } from "../types"
import TorrentListItem from "./TorrentListItem"

interface TorrentListProps {
  onEditLabels?: (torrent: Torrent) => void;
  onMove?: (torrent: Torrent) => void;
  onPause: (hash: InfoHash) => void;
  onResume: (hash: InfoHash) => void;

  filters: TorrentFilter[];
  torrents: Torrent[];
}

export default function TorrentList(props: TorrentListProps) {
  const {
    onEditLabels,
    onMove,
    onPause,
    onResume,
    filters,
    torrents
  } = props;

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
        filters.every(f => f.filter(torrent)) &&
          <TorrentListItem
            key={torrent.info_hash[0]}
            onEditLabels={onEditLabels}
            onMove={onMove}
            onPause={onPause}
            onResume={onResume}
            torrent={torrent}
          />
      )}
    </VStack>
  )
}
