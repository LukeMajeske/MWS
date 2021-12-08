export interface Profile{
    username: string;
    displayName: string;
    bio?: string;
    isAssignedTo: boolean;
    isWatching: boolean;
    isOwner: boolean;
}