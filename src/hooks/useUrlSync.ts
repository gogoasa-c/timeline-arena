export function readParams(): URLSearchParams {
  return new URLSearchParams(window.location.search);
}

export function writeParams(params: Record<string, string>): void {
  const sp = new URLSearchParams(params);
  history.replaceState(null, '', '?' + sp.toString());
}
