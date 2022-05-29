import { InfoHash, Torrent } from "../types";

interface AddTorrentParams {
  magnet_uri: string;
  save_path:  string;
}

interface MoveStorageParams {
  info_hash: InfoHash;
  save_path: string;
}

interface GetLabelsResult {
  info_hash: InfoHash;
  labels: Record<string, string>;
}

interface SetLabelsParams {
  info_hash: InfoHash;
  labels: Record<string, string>;
}

export default function jsonrpc(method: 'config.get',           params: Array<string>):          Promise<Record<string,string>>;
export default function jsonrpc(method: 'config.set',           params: Record<string, string>): Promise<boolean>;
export default function jsonrpc(method: 'session.addTorrent',   params: AddTorrentParams):       Promise<InfoHash>;
export default function jsonrpc(method: 'session.getTorrents',  params: InfoHash[]):             Promise<Torrent[]>;
export default function jsonrpc(method: 'torrents.getLabels',   params: InfoHash[]):             Promise<GetLabelsResult[]>;
export default function jsonrpc(method: 'torrents.moveStorage', params: MoveStorageParams):      Promise<boolean>;
export default function jsonrpc(method: 'torrents.pause',       params: InfoHash[]):             Promise<boolean>;
export default function jsonrpc(method: 'torrents.resume',      params: InfoHash[]):             Promise<boolean>;
export default function jsonrpc(method: 'torrents.setLabels',   params: SetLabelsParams[]):      Promise<boolean>;

export default function jsonrpc(method: string, params: Object | []) {
  return fetch('/api/jsonrpc', {
    body: JSON.stringify({
      jsonrpc: '2.0',
      method,
      params,
      id: 1337
    }),
    method: 'POST'
  })
  .then(res => res.json())
  .then(res => {
    if (res.error) {
      throw new Error(res.error.message);
    }
    return res.result;
  });
}
