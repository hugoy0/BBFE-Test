export class Transaction {
    constructor(
        public amount: string,
        public categoryCode: string,
        public merchant: string,
        public merchantLogo: string,
        public transactionDate: number,
        public transactionType: string
    ) {}
}