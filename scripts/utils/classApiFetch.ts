export default async function classApiFetch<T>(
  baseUrl: string,
  token: string,
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  // Early token validation
  if (!token) {
    console.error("Invalid token");
    throw new Error("Unauthorized access");
  }

  // Normalize slashes and build full URL
  const fullUrl = `${baseUrl.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;

  // Merge headers safely (caller’s headers take precedence)
  const mergedHeaders: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...(options.headers ?? {}),
  };

  const response = await fetch(fullUrl, {
    ...options,
    headers: mergedHeaders,
  });

  // Graceful error with body text when available
  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Fetch failed: ${response.status} ${response.statusText} ${body}`);
  }

  // Handle endpoints that return no content
  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
