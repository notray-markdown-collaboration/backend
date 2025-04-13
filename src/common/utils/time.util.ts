export function getKSTTimestamp(): string {
  return new Date()
    .toLocaleString('sv-SE', { timeZone: 'Asia/Seoul' })
    .replace(' ', 'T');
}
