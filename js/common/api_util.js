const baseUrl = `http://${process.env.DEV_API_KEY}`;

export function makeUrl(api) {
  return `${baseUrl}/${api}`;
}

export function makePagenationUrl(api, offset, pageNum) {
  return `${baseUrl}/${api}?offset=${offset}&pageNum=${pageNum}`;
}