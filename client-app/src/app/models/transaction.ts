export interface Transaction{
    id: string;

    amount: number;

    description: string;

    service: string;

    transactiontype: string;

    createTime: Date;

    dueTime: Date;

    username: string;
}