export interface ProgressNote
{
    id: string,
    body: string,
    author: string,
    progressAmount: number,
    createAt: Date
}

export interface ProgressNotesDto{
    websiteId: string;
    notes: ProgressNote[];
}

export interface ProgressNoteDto{
    websiteId: string;
    note: ProgressNote;
}