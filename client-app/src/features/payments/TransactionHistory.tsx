import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Header, Table } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import TransactionItem from "./TransactionItem";


export default observer(function TransactionHistory()
{
    const {userStore} = useStore();
    const {transactionHistory,user} = userStore;
    const [total, setTotal] = useState(0);

    useEffect(()=>{
        if(user == null){
            userStore.getUser();
        }
        userStore.setTransactions();
    },[user,total, userStore])

    let transactionItems = () => {
        let transactionItems = [];
        let total_amount = 0;

        if(transactionHistory.length === 0)
        {
            transactionItems.push((<Table.Row key='no-transactions'></Table.Row>));
            return transactionItems;
        }

        transactionHistory.forEach((transaction) => {
            total_amount += transaction.amount;
            transactionItems.push((<TransactionItem transaction={transaction}/>));
        })
        if(total === 0){
            setTotal(prevTotal => prevTotal + total_amount);
        }
        
        return transactionItems;
    }
    return(
        <>
        <Header as='h1' style={{color:'black'}}>{"$" + total}</Header>
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Amount</Table.HeaderCell>
                    <Table.HeaderCell>Service</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>Type</Table.HeaderCell>
                    <Table.HeaderCell>Sent Date</Table.HeaderCell>
                    <Table.HeaderCell>Due By</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {transactionItems()}
            </Table.Body>
        </Table>
        </>
    )
})