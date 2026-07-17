import AsyncStorage from "@react-native-async-storage/async-storage";

// interfaces
import { UserPayload } from "../interfaces/login";

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
     * Store token, role and user profile safely
     */
    set: async function (
        token: string,
        role: string,
        thisUser: UserPayload
    ): Promise<void> {

        // remove sensitive data
        const { Password, ...safeUser } = thisUser;

        await AsyncStorage.multiSet([
            ['token', token],
            ['role', role],
            ['profile', jsonStringifier(safeUser)]
        ]);
    },

    get: {

        /**
         * Get token
         */
        key: async function (): Promise<string | null> {

            const token = await AsyncStorage.getItem('token');

            return token;
        },

        /**
         * Get stored role
         */
        role: async function (): Promise<string | null> {

            const role = await AsyncStorage.getItem('role');

            return role;
        },

        /**
         * Get user profile safely
         */
        profile: async function (): Promise<UserPayload | null> {

            const raw = await AsyncStorage.getItem('profile');

            return jsonParser<UserPayload>(raw);
        }
    },

    /**
     * Clear stored session
     */
    clear: async function (): Promise<void> {

        await AsyncStorage.multiRemove([
            'token',
            'role',
            'profile'
        ]);

    }
};

export default storage;