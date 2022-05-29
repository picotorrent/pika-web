export type NullableString = (string|null);

export type InfoHash = [NullableString,NullableString];

export const TorrentState = {
  Metadata: 2,
  Downloading: 3,
  Seeding: 5
} as const;

type Values<T> = T[keyof T];

export interface Torrent {
  flags: number;
  info_hash: InfoHash;
  dl: number;
  name: string;
  save_path: string;
  ul: number;
  num_peers: number;
  num_seeds: number;
  progress: number;
  state: Values<typeof TorrentState>;
}
