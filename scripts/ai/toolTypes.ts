import RegType from "../enums/regType";

export interface Tool {
    id: string;
    screen: string;
    title: string;
    description: string;

    // Words the AI can match against
    keywords: string[];

    // Roles allowed to use it
    roles: RegType[];
}