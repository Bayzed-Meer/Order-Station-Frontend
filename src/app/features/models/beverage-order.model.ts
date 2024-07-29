export interface BeverageOrder {
    _id: string;
    username: string;
    employeeID: string;
    teaQuantity: number;
    teaAmount: string;
    coffeeQuantity: number;
    coffeeAmount: string;
    notes: string;
    roomNumber: number;
    createdAt: Date;
    orderStatus: string;
}
