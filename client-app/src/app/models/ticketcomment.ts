export interface TicketComment{
    id: number;
    createAt: Date;
    body: string;
    username: string;
}

export interface CommentsDto{
    ticketId: string;
    comments: TicketComment[];
}

export interface CommentDto{
    ticketId: string;
    comment: TicketComment;
}