import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../app/stores/store";
import {Comment} from "semantic-ui-react";
import {formatDistanceToNow} from 'date-fns';

interface Props {
    websiteId: string;
}


export default observer(function ProgressNoteItem({websiteId}: Props)
{
    const {progressStore} = useStore();

    let getNotes = () => {
        var notes = progressStore.progressRegistry.get(websiteId);
        var progressNotes = [];

        if (!notes) return progressNotes; 

        for(var note of notes){

            progressNotes.push(
                    <Comment key={note.id}>
                        <Comment.Content>
                            <Comment.Author as='a'>{note.author}</Comment.Author>
                            <Comment.Metadata>
                                <div>{formatDistanceToNow(note.createAt)} ago</div>
                                <div>+{note.progressAmount}%</div>
                            </Comment.Metadata>
                            <Comment.Text style={{whiteSpace:"pre-wrap"}}>{note.body}</Comment.Text>
                        </Comment.Content>
                    </Comment>
                );
        }
        return progressNotes;
    }
    return(<>{getNotes()}</>)
})