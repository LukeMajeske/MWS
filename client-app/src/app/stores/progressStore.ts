import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import { ProgressNote, ProgressNoteDto, ProgressNotesDto } from "../models/progressNote";
import { store } from "./store";



export default class ProgressStore
{
    progressRegistry = new Map<string, ProgressNote[]>();//Key = Website ID
    hubConnection: HubConnection | null = null;

    constructor(){
        makeAutoObservable(this);
    }

    createHubConnection = (websiteId:string) => {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(process.env.REACT_APP_PROGRESS_URL + '?websiteId='+ websiteId, {
                accessTokenFactory: () => store.userStore.user?.token!
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();
        
        this.hubConnection.start()
        .catch(error => console.log('Error establishing connection: ', error));
        
        //Recieves Object {ticketId, comments:TicketComment[]}
        this.hubConnection.on('LoadNotes', (noteDto:ProgressNotesDto) => {
            runInAction(() => {
                noteDto.notes.forEach(comment => {
                    comment.createAt = new Date(comment.createAt + 'Z');
                })
                this.progressRegistry.set(noteDto.websiteId, noteDto.notes);
            });
        });

        this.hubConnection.on('ReceiveNote', (noteDto: ProgressNoteDto) => {
            runInAction(() => {
                console.log(noteDto);
                var note = noteDto.note;
                note.createAt = new Date(note.createAt);
                var notes = this.progressRegistry.get(noteDto.websiteId);
                notes.push(note);
                console.log("Progress Store:", note);
                this.progressRegistry.set(noteDto.websiteId, notes);
            });
        })

    }


    addNote = async (values: any) => {
        try{
            await this.hubConnection?.invoke('SendProgressNote',values);
        }
        catch(error){
            console.log(error);
        }
    }

}