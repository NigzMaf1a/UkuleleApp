export default interface Feedback {
    FeedbackID?: number;
    CustomerID: number;
    Name: string;
    Comments: string;
    Response?: string;
    Rating: 1 | 2 | 3 | 4 | 5;
}