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
        const error = await res.json();
        console.error(error);

        throw new Error(
            `Fetch failed: ${res.status} ${JSON.stringify(error)}`
        );
    }

    return (await res.json()) as T;
}