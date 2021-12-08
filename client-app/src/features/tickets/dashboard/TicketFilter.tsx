
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Header, Menu } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function TicketFilter() {
    const {ticketStore: {predicate, setPredicate}} = useStore();
    return (
        <>
            <Menu vertical size='large' style={{ width: '100%', marginTop: 25 }}>
                <Header icon='filter' attached color='teal' content='Filters' />
                <Menu.Item 
                    content='All Tickets' 
                    active={predicate.has('all')}
                    onClick={() => setPredicate('all', 'true')}
                />
                <Menu.Item 
                    content="I'm watching" 
                    active={predicate.has('isWatching')}
                    onClick={() => setPredicate('isWatching', 'true')}
                />
                <Menu.Item 
                    content="I'm Assigned To" 
                    active={predicate.has('isAssignedTo')}
                    onClick={() => setPredicate('isAssignedTo', 'true')}    
                />
                <Menu.Item 
                    content="I Created" 
                    active={predicate.has('isOwner')}
                    onClick={() => setPredicate('isOwner', 'true')}    
                />
            </Menu>
            <Header />
        </>
    )
})