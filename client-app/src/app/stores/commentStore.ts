import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import { CommentDto, CommentsDto, TicketComment } from "../models/ticketcomment";
import { store } from "./store";

export default class CommentStore{
    ticketComments = new Map<string,TicketComment[]>();
    hubConnection: HubConnection | null = null;

    constructor(){
        makeAutoObservable(this);
    }

    createHubConnection = (ticketId: string) => {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(process.env.REACT_APP_CHAT_URL + '?ticketId='+ ticketId, {
                accessTokenFactory: () => store.userStore.user?.token!
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();
        
        this.hubConnection.start()
        .catch(error => console.log('Error establishing connection: ', error));
        
        //Recieves Object {ticketId, comments:TicketComment[]}
        this.hubConnection.on('LoadComments', (commentsDto:CommentsDto) => {
            runInAction(() => {
                commentsDto.comments.forEach(comment => {
                    comment.createAt = new Date(comment.createAt + 'Z');
                })
                this.ticketComments.set(commentsDto.ticketId, commentsDto.comments);
            });
        });

        this.hubConnection.on('ReceiveComment', (commentDto: CommentDto) => {
            runInAction(() => {
                var comment = commentDto.comment;
                comment.createAt = new Date(comment.createAt);
                var comments = this.ticketComments.get(commentDto.ticketId);
                comments.push(comment);
                console.log("Comment Store:", comment);
                this.ticketComments.set(commentDto.ticketId, comments);
            });
        })
    }

    stopHubConnection = () => {
        this.hubConnection?.stop().catch(error => console.log('Error stopping connection: ', error));
    }

    clearComments = () => {
        this.ticketComments.clear();
        this.stopHubConnection();
    }

    addComment = async (values: any) => {
        try{
            await this.hubConnection?.invoke('SendComment',values);
        }
        catch(error){
            console.log(error);
        }
    }
}