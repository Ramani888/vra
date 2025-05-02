import { OrderStatusType } from "../../types/order.d"

export const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjYwZjMwNDcxMDEzYmM1MThkMDRmMjkiLCJ1c2VybmFtZSI6IlJhbWFuaSBEaXZ5ZXNoIiwiaWF0IjoxNzE5NjcxMDI1LCJleHAiOjE3MjIyNjMwMjV9.82QOtRboFn1WCIGroahsaFixyG3QNWq5Jr1_v5ra6aA'

export const BusinessTypeData = [
    {id: 1, name: 'Retailer'},
    {id: 2, name: 'Wholesaler'},
    {id: 3, name: 'Online Seller'},
    {id: 4, name: 'Manufacturer'},
    {id: 5, name: 'Other'}
]

export const getOrderStatusBgColor = (data: string) => {
    switch (data) {
        case OrderStatusType.Pending:
            return '#FFEBC3'
        case OrderStatusType.ReadyToShip:
            return '#F0E0FC'
        case OrderStatusType.Shipped:
            return '#FAEADE'
        case OrderStatusType.Delivered:
            return '#E3F1E4'
        case OrderStatusType.Cancelled:
            return '#EAEAEA'
        default: 
            return '#EAEAEA'
    }
}

export const getOrderStatusColor = (data: string) => {
    switch (data) {
        case OrderStatusType.Pending:
            return '#E16E2E'
        case OrderStatusType.ReadyToShip:
            return '#962DE9'
        case OrderStatusType.Shipped:
            return '#DF8633'
        case OrderStatusType.Delivered:
            return '#43A047'
        case OrderStatusType.Cancelled:
            return '#565656'
        default:
            return '#565656'
    }
}