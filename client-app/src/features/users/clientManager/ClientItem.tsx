import React, { SyntheticEvent } from "react";
import { Button, Segment } from "semantic-ui-react";
import { UserSimple } from "../../../app/models/user";
import { useStore } from "../../../app/stores/store";

interface Props{
    client: UserSimple
}

export default function ClientItem({client}:Props){
    const {userStore} = useStore();
    const {clientManager} = userStore;

    function deleteUser(e:SyntheticEvent<HTMLButtonElement>, id:string){
        userStore.deleteUser(id);
        clientManager.delete(id);
    }

    return(
        <Segment clearing className='clientManager'>
            <p>
                <strong>Username:</strong> {client.username}
                <strong> Role:</strong> {client.role}
            </p>
            <Button onClick={(e) => deleteUser(e,client.id)} negative floated='right'>Remove User</Button>
            <Button positive floated='right'>Create Website</Button>
        </Segment>
    )
}