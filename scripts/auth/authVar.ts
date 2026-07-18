import storage from "../auth/storage";
import Users from "../interfaces/user";

export default async function authKey() {
    const thisId = await storage.get.profile().then(prof => {
        if (typeof prof !== null && typeof prof?.RegID === 'number') return prof.RegID;
    });
    const key = await storage.get.key().then(key => key);
}