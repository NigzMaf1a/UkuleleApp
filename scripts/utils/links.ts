const backendUrl = "https://ukulelebackend.onrender.com";
const liveBackendUrl = "https://ukulelebackend.onrender.com";

const links: Record<string, string> = {
  dev: backendUrl,
  prod: liveBackendUrl,
};

export function getBackendUrl(env: "dev" | "prod" = "dev"): string {
  return links[env];
}

const link = getBackendUrl("dev");
export default link;
