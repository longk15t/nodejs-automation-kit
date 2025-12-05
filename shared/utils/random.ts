export function randomString(length = 8): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length })
    .map(() => chars[Math.floor(Math.random() * chars.length)])
    .join('');
}

export function randomEmail(): string {
  return `user_${randomString(6)}@test.com`;
}
