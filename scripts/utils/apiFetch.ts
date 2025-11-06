import link from "./links";

const BASE_URL = link;

export default async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const fullUrl = `${BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;

  // Get token from localStorage (or cookie, etc.)
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  console.log(`Token from fetch: ${token}`)

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
