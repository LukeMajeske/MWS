import React from "react";
import { Table } from "semantic-ui-react";
import { Transaction } from "../../app/models/transaction";

interface Props{
    transaction: Transaction;
}

export default function TransactionItem({transaction}:Props){

    return(
        <Table.Row key={transaction.id}>
            <Table.Cell>{transaction.amount}</Table.Cell>
            <Table.Cell>{transaction.service}</Table.Cell>
            <Table.Cell>{transaction.description}</Table.Cell>
            <Table.Cell>{transaction.transactiontype}</Table.Cell>
            <Table.Cell>{transaction.createTime}</Table.Cell>
            <Table.Cell>{transaction.dueTime}</Table.Cell>
        </Table.Row>
    )
}