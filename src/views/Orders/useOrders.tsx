import React, { useEffect, useMemo, useState } from 'react'
import { serverCapturePayment, serverGetOrders, serverRefundPayment, serverUpdateOrderStatus } from '../../services/serverApi'
import {
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';
import { IOrder, ITrackingDetails, OrderStatusType } from '../../types/order.d';
import { Box, Button, Tooltip } from '@mui/material';
import moment from 'moment';
import FeedIcon from '@mui/icons-material/Feed';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { formatNumber } from '../../utils/helpers/global'
import { AcceptButton, ButtonContainer, CancelButton, OrderStatusLabel } from './Orders.styled';
import { getOrderStatusBgColor, getOrderStatusColor } from '../../utils/consts/globalConst';
import { IProduct } from '../../types/product';
import ProductDataTable from './ProductDataTable';

const useOrders = () => {
    const [orderData, setOrderData] = useState<IOrder[]>([])
    const [filterOrderData, setFilterOrderData] = useState<IOrder[]>([]);
    const [loading, setLoading] = useState<boolean>(false)
    const [openDetailDialog, setOpenDetailDialog] = useState<boolean>(false)
    const [openTrackingDialog, setOpenTrackingDialog] = useState<boolean>(false)
    const [selectedOrderData, setSelectedOrderData] = useState<IOrder | undefined>(undefined)
    const [editTrackingDetailObject, setEditTrackingDetailObject] = useState<ITrackingDetails | undefined>(undefined)
    const [selectedOrderStatus, setSelectedOrderStatus] = useState<string>(OrderStatusType.Pending)
    const [openInvoiceDialog, setOpenInvoiceDialog] = useState<boolean>(false);
    const [invoiceOrderData, setInvoiceOrderData] = useState<IOrder>()

    const handleOpenInvoiceDialog = (rowData: any) => {
        setInvoiceOrderData(rowData?.original)
        setOpenInvoiceDialog(true);
    }

    const handleCloseInvoiceDialog = () => {
        setOpenInvoiceDialog(false);
    }

    const handleChangeOrderStatusType = (data: string) => {
        setSelectedOrderStatus(data)
        const findOrderData = orderData?.filter((item) => item?.status === data);
        setFilterOrderData(findOrderData)
    }

    const getOrdersData = async () => {
        try {
            setLoading(true)
            const res = await serverGetOrders();
            setOrderData(res?.data)
            const findOrderData = res?.data?.filter((item: any) => item?.status === selectedOrderStatus);
            setFilterOrderData(findOrderData)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    const handleOpenDetailDialog = (data: any) => {
        setSelectedOrderData(data?.original)
        setOpenDetailDialog(true)
    }

    const handleCloseDetailDialog = () => {
        setSelectedOrderData(undefined)
        setOpenDetailDialog(false)
    }

    const handleOpenTrackingDialog = (data: any) => {
        setSelectedOrderData(data?.original)
        setOpenTrackingDialog(true)
    }

    const handleCloseTrackingDialog = () => {
        setSelectedOrderData(undefined)
        setEditTrackingDetailObject(undefined)
        setOpenTrackingDialog(false)
    }

    const handleEditTrackingDetail = (data: any) => {
        setSelectedOrderData(data?.original)
        setEditTrackingDetailObject(data?.original?.trackingDetails)
        setOpenTrackingDialog(true)
    }

    const getOrderCountByStatus = (status: string) => {
        const data = orderData?.filter((item) => item?.status === status)?.length
        return data
    }

    useEffect(() => {
        getOrdersData();
    }, [])

    const columns = useMemo<MRT_ColumnDef<IOrder>[]>(
        () => [
        {
            accessorKey: 'paymentId',
            header: 'Payment Id'
        },
        {
            accessorKey: 'totalAmount',
            header: 'Total Amount',
            Cell: ({ row }: any) => (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CurrencyRupeeIcon sx={{height: '15px', width: '15px'}}/>
                    <div>{formatNumber(row?.original.totalAmount)}</div>
                </Box>
            )
        },
        {
            accessorKey: 'userData.email',
            header: 'Email'
        },
        {
            accessorKey: 'userData.mobileNumber',
            header: 'Contact'
        },
        {
            accessorKey: 'status',
            header: 'Status',
            Cell: ({ row }: any) => (
                <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
                    <OrderStatusLabel bgColor={getOrderStatusBgColor(row.original.status)} color={getOrderStatusColor(row.original.status)}>{row.original.status}</OrderStatusLabel>
                </Box>
            )
        },
        {
            accessorKey: 'createdAt',
            header: 'Create Date',
            Cell: ({ row }: any) => (
                <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
                    <div>{moment(row.original.createdAt).format('YYYY-MM-DD')}</div>
                </Box>
            )
        },
        ],
        [],
    );

    const handleUpdateOrderStatus = async (status: string, orderId: string, orderData: IOrder) => {
        try {
            console.log('orderData', orderData);
            setLoading(true)
            await serverUpdateOrderStatus(orderId, status);
            if (status === OrderStatusType?.Cancelled) {
                await serverRefundPayment(orderData?.paymentId ?? '', orderData?.totalAmount ?? Number(0));
            } else {
                await serverCapturePayment(orderData?.paymentId ?? '', orderData?.totalAmount ?? Number(0));
            }
            getOrdersData();
            setLoading(false)
        } catch (err) {
            console.log(err);
            setLoading(false)
        }
    }

    const table = useMaterialReactTable({
        columns,
        data: filterOrderData,
        enableEditing: selectedOrderStatus === OrderStatusType.Cancelled ? false : true,
        positionActionsColumn: 'last',
        enablePagination: false,
        enableBottomToolbar: false,
        state: { isLoading: loading },
        enableStickyHeader: true,
        muiTableContainerProps: { sx: { maxHeight: '75vh'} },
        renderDetailPanel: ({ row }) =>
            row.original.productDetails ? (
                <ProductDataTable data={row.original.productDetails as IProduct[]} />
            ) : null,
        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: "flex", gap: "1rem", cursor: 'pointer' }}>
                {row?.original?.status === OrderStatusType.Pending && (
                    <ButtonContainer>
                        <AcceptButton onClick={() => handleUpdateOrderStatus(OrderStatusType?.ReadyToShip, row?.original?._id?.toString(), row?.original)}>Accept</AcceptButton>
                        <CancelButton onClick={() => handleUpdateOrderStatus(OrderStatusType?.Cancelled, row?.original?._id?.toString(), row?.original)}>Cancel</CancelButton>
                    </ButtonContainer>
                )}
                {(row?.original?.status === OrderStatusType.ReadyToShip || row?.original?.status === OrderStatusType.Shipped) && (
                    <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                        <Button variant="contained" onClick={() => handleOpenInvoiceDialog(row)}>Invoice</Button>
                        {row?.original?.trackingDetails?._id ? (
                            <Tooltip title="Edit Tracking Detail">
                                <EditLocationAltIcon onClick={() => handleEditTrackingDetail(row)} sx={{color: '#0b3157'}}>
                                </EditLocationAltIcon>
                            </Tooltip>
                        ) : (
                            <Tooltip title="Add Tracking Detail">
                                <LocationOnIcon onClick={() => handleOpenTrackingDialog(row)} sx={{color: '#0b3157'}}>
                                </LocationOnIcon>
                            </Tooltip>
                        )}  

                        <Tooltip title="Order Detail">
                            <FeedIcon onClick={() => handleOpenDetailDialog(row)} sx={{color: '#0b3157'}}>
                            </FeedIcon>
                        </Tooltip>
                    </div>
                )}
                {row?.original?.status === OrderStatusType.Delivered && (
                    <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                        <Button variant="contained" onClick={() => handleOpenInvoiceDialog(row)}>Invoice</Button>
                        <Tooltip title="Order Detail">
                            <FeedIcon onClick={() => handleOpenDetailDialog(row)} sx={{color: '#0b3157'}}>
                            </FeedIcon>
                        </Tooltip>
                    </div>
                )}
            </Box>
        ),
    });

    return {
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
        openInvoiceDialog,
        handleCloseInvoiceDialog,
        invoiceOrderData
    }
}

export default useOrders