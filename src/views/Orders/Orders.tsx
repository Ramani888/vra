import React, { useEffect } from 'react'
import AppHeader from '../../components/AppHeader/AppHeader'
import { OrderStatusTab, OrderStatusTabContainer, OrdersContainer } from './Orders.styled'
import useOrders from './useOrders'
import {
    MaterialReactTable,
} from 'material-react-table';
import OrderDetailDialog from '../../Dialogs/OrderDetailDialog/OrderDetailDialog';
import AddTrackingDialog from '../../Dialogs/AddTrackingDialog/AddTrackingDialog';
import { OrderStatusType } from '../../types/order.d';
import InvoiceDialog from '../../Dialogs/InvoiceDialog/InvoiceDialog';

const Orders = () => {
    const {
        loading,
        orderData,
        table,
        openDetailDialog,
        handleCloseDetailDialog,
        selectedOrderData,
        openTrackingDialog,
        handleCloseTrackingDialog,
        getOrdersData,
        editTrackingDetailObject,
        handleChangeOrderStatusType,
        selectedOrderStatus,
        getOrderCountByStatus,
        handleCloseInvoiceDialog,
        openInvoiceDialog,
        invoiceOrderData
    } = useOrders()

    return (
        <OrdersContainer>
            {/* <AppHeader headerTitle={'Orders'} dataCount={orderData?.length} buttonHide={true} /> */}
            <OrderStatusTabContainer>
                <OrderStatusTab isActive={selectedOrderStatus === OrderStatusType?.Pending} onClick={() => handleChangeOrderStatusType(OrderStatusType?.Pending)}>Pending ({getOrderCountByStatus(OrderStatusType?.Pending)})</OrderStatusTab>
                <OrderStatusTab isActive={selectedOrderStatus === OrderStatusType?.ReadyToShip} onClick={() => handleChangeOrderStatusType(OrderStatusType?.ReadyToShip)}>Ready To Ship ({getOrderCountByStatus(OrderStatusType?.ReadyToShip)})</OrderStatusTab>
                <OrderStatusTab isActive={selectedOrderStatus === OrderStatusType?.Shipped} onClick={() => handleChangeOrderStatusType(OrderStatusType?.Shipped)}>Shipped ({getOrderCountByStatus(OrderStatusType?.Shipped)})</OrderStatusTab>
                <OrderStatusTab isActive={selectedOrderStatus === OrderStatusType?.Delivered} onClick={() => handleChangeOrderStatusType(OrderStatusType?.Delivered)}>Delivered ({getOrderCountByStatus(OrderStatusType?.Delivered)})</OrderStatusTab>
                <OrderStatusTab isActive={selectedOrderStatus === OrderStatusType?.Cancelled} onClick={() => handleChangeOrderStatusType(OrderStatusType?.Cancelled)}>Cancelled ({getOrderCountByStatus(OrderStatusType?.Cancelled)})</OrderStatusTab>
            </OrderStatusTabContainer>
            <MaterialReactTable table={table} />

            {openDetailDialog && (
                <OrderDetailDialog open={openDetailDialog} handleClose={handleCloseDetailDialog} orderData={selectedOrderData} />
            )}

            {openTrackingDialog && (
                <AddTrackingDialog open={openTrackingDialog} handleClose={handleCloseTrackingDialog} orderId={selectedOrderData?._id?.toString()} getOrdersData={getOrdersData} editTrackingDetailObject={editTrackingDetailObject} />
            )}

            {openInvoiceDialog && (
                <InvoiceDialog open={true} handleClose={handleCloseInvoiceDialog} invoiceOrderData={invoiceOrderData} />
            )}
        </OrdersContainer>
    )
}

export default Orders