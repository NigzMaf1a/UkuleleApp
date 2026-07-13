import link from "./links";
import storage from "../auth/storage";

const BASE_URL = link;

export default async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {

    const fullUrl =
        `${BASE_URL.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;

    // Get token from AsyncStorage
    const token = await storage.get.key();

    console.log("Token from storage:", token);

    const res = await fetch(fullUrl, {
        ...options,
        headers: {
            "Content-Type": "application/json",

            ...(token
                ? {
                    Authorization: `Bearer ${token}`,
                }
                : {}),

            ...(options.headers ?? {}),
        },
    });

    if (!res.ok) {
        let message = `Fetch failed: ${res.status} ${res.statusText}`;

        try {
            const body = await res.json();
            if (body?.error) {
                message = body.error;
            } else if (body?.message) {
                message = body.message;
            }
        } catch {
            // Response body wasn't JSON — fall back to the generic message
        }

        throw new Error(message);
    }

    return (await res.json()) as T;
}
