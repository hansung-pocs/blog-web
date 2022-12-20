export function makeUrl(api) {
  const baseUrl = `http://${process.env.DEV_API_KEY}:80`;
  return `${baseUrl}/${api}`;
}
