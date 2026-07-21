export default async function classApiFetch<T>(
  baseUrl: string,
  token: string,
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {

  if (!token) {
    console.error("Invalid token");
    throw new Error("Unauthorized access");
  }

  const fullUrl = `${baseUrl.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;

  const mergedHeaders: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...(options.headers ?? {}),
  };

  console.log({
    fullUrl,
    method: options.method,
    body: options.body
  });

  const response = await fetch(fullUrl, {
    ...options,
    headers: mergedHeaders,
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Fetch failed: ${response.status} ${response.statusText} ${body}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
