// utils/stringToNumber.ts

export default function stringToNumber(val: string): number | null {

    const parsed = Number(val.trim());

    if (
        val.trim().length === 0 ||
        Number.isNaN(parsed) ||
        parsed <= 0
    ) {
        return null;
    }

    return parsed;
}