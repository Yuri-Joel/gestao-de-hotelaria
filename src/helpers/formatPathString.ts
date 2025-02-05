export function formatPathName(path: string): string | null {
  const match = path.match(/^\/[^\/]+\/([^\/]+)/);
  return match ? match[1] : null;
}