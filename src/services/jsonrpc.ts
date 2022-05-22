export default function jsonrpc(method: string, params: any) {
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
