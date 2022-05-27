
export interface Torrent {
  flags: number;
  info_hash_v1: string | null;
  info_hash_v2: string | null;
  dl: number;
  name: string;
  save_path: string;
  ul: number;
  num_peers: number;
  num_seeds: number;
  progress: number;
  state: number;
}
