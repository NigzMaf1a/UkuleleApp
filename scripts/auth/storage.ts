import AsyncStorage from "@react-native-async-storage/async-storage";

//interfaces
import User from "../interfaces/user";

/**
 * Safe JSON stringify
 */
function jsonStringifier<T>(val: T): string {
    return JSON.stringify(val);
}

/**
 * Safe JSON parse
 */
function jsonParser<T>(val: string | null): T | null {
    if (val === null) return null;

    try {
        return JSON.parse(val) as T;
    } catch {
        return null;
    }
}

const storage = {

    /**
     * Store token and user profile safely
     */
    set: async function (token: string, thisUser: User): Promise<void> {

        // remove sensitive data
        const { password, ...safeUser } = thisUser;

        await AsyncStorage.multiSet([
            ['token', token], // store raw string
            ['profile', jsonStringifier(safeUser)]
        ]);
    },

    get: {

        /**
         * Get token safely
         */
        key: async function (): Promise<string | null> {

            const token = await AsyncStorage.getItem('token');

            return token; // already string | null
        },

        /**
         * Get user profile safely
         */
        profile: async function (): Promise<User | null> {

            const raw = await AsyncStorage.getItem('profile');

            return jsonParser<User>(raw);
        }
    },

    /**
     * Clear all storage
     */
    clear: async function (): Promise<void> {

        await AsyncStorage.multiRemove(['token', 'profile']);

    }
};

export default storage;