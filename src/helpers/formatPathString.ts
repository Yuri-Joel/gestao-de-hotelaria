export function formatPathName(path: string): string {
  return  path.split('/').pop()!
}