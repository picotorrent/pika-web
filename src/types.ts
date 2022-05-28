export type NullableString = (string|null);

export type InfoHash = [NullableString,NullableString];

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
  state: number;
}
