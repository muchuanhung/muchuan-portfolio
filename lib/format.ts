/** 2024-06-18 → 2024.06.18 */
export function formatDate(date: string) {
  return date.replaceAll('-', '.')
}

/** 依網址判斷外部平台名稱，用在「前往 Medium」這類按鈕文字 */
export function getExternalSourceName(url: string): string {
  const host = new URL(url).hostname
  if (host.endsWith('medium.com')) return 'Medium'
  return host.replace(/^www\./, '')
}
