export default interface Feedback {
    feedbackid?: number;
    customerid: number;
    name: string;
    comments: string;
    response?: string;
    rating: 1 | 2 | 3 | 4 | 5;
}