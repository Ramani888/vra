import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { IOrder, IOrderDetails } from '../../types/order';
import { getStringDate } from '../../utils/helpers/date';
import { CustomerContainer, CustomerTitle, CustomerWrapper, DeliveryAddress, DeliveryAddressContainer, DeliveryAddressTitle, OrderDetailDialogBodyContainer, OrderDetailDialogBodyWrapper, OrderDetailDialogContainer, OrderDetailDialogHeaderContainer, OrderDetailRow, OrderDetailRowData, OrderDetailRowLabel, PackingImage, PackingVideo, PaymentStatus, ProductImage, ProductName, TrackingDetailContainer, TrackingDetailData, TrackingDetailLabel, TrackingDetailRow, TrackingDetailTitle, TrackingDetailTitleContainer, TrackingWrapper } from './OrderDetailDialog.styled'
import {
  useMaterialReactTable,
  MaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { ICategory } from '../../types/category';
import { serverGetCategory } from '../../services/serverApi';
import CarousalDialog from '../CarousalDialog/CarousalDialog';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { formatNumber } from '../../utils/helpers/global';

interface Props {
  open: boolean;
  handleClose: () => void;
  orderData?: IOrder;
}

const OrderDetailDialog: React.FC<Props> = ({ open, handleClose, orderData }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [categoryData, setCategoryData] = useState<ICategory[]>([]);
  const [openImageDialog, setOpenImageDialog] = useState<boolean>(false)
  const [imageDataPath, setImageDataPath] = useState<any>([])
  const [videoPath, setVideoPath] = useState<any>(undefined)
  const [showTrackingDetail, setShowTrackingDetail] = useState<boolean>(false)
  const [showUnloadingDetail, setShowUnloadingDetail] = useState<boolean>(false)

  const handleToggleShowTracking = () => {
    setShowTrackingDetail(!showTrackingDetail)
  }

  const handleToggleShowUnloadingDetail = () => {
    setShowUnloadingDetail(!showTrackingDetail)
  }

  const handleOpenImageDialog = (data: any) => {
    setOpenImageDialog(true)
    setImageDataPath(data?.image)
    setVideoPath(data?.videoPath)
  }

  const handleCloseImageDialog = () => {
    setOpenImageDialog(false)
  }

  const totalAmount = orderData?.productDetails?.reduce((accumulator, currentValue) => {
    if (typeof currentValue?.totalPrice === 'number') {
      return accumulator + currentValue?.totalPrice;
    } else {
      return accumulator;
    }
  }, 0);

  const totalQty = orderData?.productDetails?.reduce((accumulator, currentValue) => {
    if (typeof currentValue?.qty === 'number') {
      return accumulator + currentValue?.qty;
    } else {
      return accumulator;
    }
  }, 0);

  const getCategoryName = (categoryId: string) => {
    const data = categoryData?.find((item) => item?._id === categoryId);
    return data?.name;
  }

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'product.name',
        header: 'Name',
        Cell: ({ row }) => {
          return (
          <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center', rowGap: '5px' }}>
            <ProductImage src={row?.original?.product?.image[0]?.path} onClick={() => handleOpenImageDialog(row?.original?.product)}></ProductImage>
            <ProductName>{row?.original?.product?.name}</ProductName>
          </Box>
          )
        }
      },
      {
        accessorKey: 'product.categoryId',
        header: 'Category Name',
        Cell: ({ row }) => {
          return (
          <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
            {getCategoryName(row?.original?.product?.categoryId)}
          </Box>
          )
        }
      },
      {
        accessorKey: 'product.code',
        header: 'Code'
      },
      {
        accessorKey: 'product.price',
        header: 'Price',
        Cell: ({ row }: any) => (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CurrencyRupeeIcon sx={{height: '15px', width: '15px'}}/>
            <div>{formatNumber(Number(row?.original?.product?.price))}</div>
          </Box>
        )
      },
      {
        accessorKey: 'qty',
        header: 'Qty',
        Cell: ({ row }: any) => (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <div>{formatNumber(Number(row?.original?.qty))}</div>
          </Box>
        ),
        Footer: () => (
          <Stack>
            Total Qty:
            <Box color="warning.main">
              {formatNumber(Number(totalQty))}
            </Box>
          </Stack>
        ),
      },
      {
        accessorKey: 'totalPrice',
        header: 'Total Price',
        Cell: ({ row }: any) => (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CurrencyRupeeIcon sx={{height: '15px', width: '15px'}}/>
            <div>{formatNumber(Number(row?.original?.totalPrice))}</div>
          </Box>
        ),
        Footer: () => (
          <Stack>
            Total Amount:
            <Box color="warning.main" sx={{ display: 'flex', alignItems: 'center' }}>
              <CurrencyRupeeIcon sx={{height: '15px', width: '15px'}}/>
              <div>{Number(totalAmount) !== 0 ? formatNumber(Number(totalAmount) + 55) : 0}</div>
            </Box>
          </Stack>
        ),
      },
    ],
    [totalAmount, totalQty, categoryData],
  );

  const table = useMaterialReactTable({
    columns,
    data: orderData?.productDetails ?? [],
    enableEditing: false,
    positionActionsColumn: 'last',
    enablePagination: false,
    enableBottomToolbar: false,
    state: { isLoading: false },
    enableStickyHeader: true,
    muiTableContainerProps: { sx: { maxHeight: '65vh'} },
  });

  const getCategoryData = async () => {
    try {
      setLoading(true)
      const res = await serverGetCategory();
      setCategoryData(res?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  console.log('videoPath', videoPath);

  useEffect(() => {
    getCategoryData();
  }, []);
  return (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title" bgcolor={'#0b3157'} color={'#ffffff'}>
          {'Order Details'}
        </DialogTitle>
        <DialogContent>
          <OrderDetailDialogContainer>
            <OrderDetailDialogHeaderContainer>
              <OrderDetailRow>
                <OrderDetailRowLabel>Payment Id:</OrderDetailRowLabel>
                <OrderDetailRowData>{orderData?.paymentId}</OrderDetailRowData>
              </OrderDetailRow>
              <OrderDetailRow>
                <OrderDetailRowLabel>Create Date:</OrderDetailRowLabel>
                <OrderDetailRowData>{getStringDate(orderData?.createdAt)}</OrderDetailRowData>
              </OrderDetailRow>
              <OrderDetailRow>
                <OrderDetailRowLabel>Total Amount:</OrderDetailRowLabel>
                <OrderDetailRowData><CurrencyRupeeIcon sx={{height: '15px', width: '15px'}}/>{orderData?.totalAmount}</OrderDetailRowData>
              </OrderDetailRow>

              <PaymentStatus>{orderData?.status}</PaymentStatus>
            </OrderDetailDialogHeaderContainer>
            <OrderDetailDialogBodyWrapper>
              <OrderDetailDialogBodyContainer>
                <DeliveryAddressContainer>
                  <DeliveryAddressTitle>Delivery Address</DeliveryAddressTitle>
                  <DeliveryAddress>
                    {`${orderData?.addressDetails?.addressFirst}, ${orderData?.addressDetails?.area}, ${orderData?.addressDetails?.city}, ${orderData?.addressDetails?.state}, ${orderData?.addressDetails?.country}, ${orderData?.addressDetails?.pinCode}.`}
                  </DeliveryAddress>
                </DeliveryAddressContainer>
                <CustomerContainer>
                  <CustomerTitle>Customer</CustomerTitle>
                  <CustomerWrapper>
                    <OrderDetailRow>
                      <OrderDetailRowLabel>Name:</OrderDetailRowLabel>
                      <OrderDetailRowData>{orderData?.userData?.name}</OrderDetailRowData>
                    </OrderDetailRow>
                    <OrderDetailRow>
                      <OrderDetailRowLabel>Email:</OrderDetailRowLabel>
                      <OrderDetailRowData>{orderData?.userData?.email}</OrderDetailRowData>
                    </OrderDetailRow>
                    <OrderDetailRow>
                      <OrderDetailRowLabel>Phone:</OrderDetailRowLabel>
                      <OrderDetailRowData>{orderData?.userData?.mobileNumber}</OrderDetailRowData>
                    </OrderDetailRow>
                  </CustomerWrapper>
                </CustomerContainer>
              </OrderDetailDialogBodyContainer>
              {orderData?.trackingDetails?._id && (
                <TrackingWrapper>
                  <TrackingDetailTitleContainer onClick={() => handleToggleShowTracking()}>
                    <TrackingDetailTitle>Show Tracking Detail</TrackingDetailTitle>
                    {showTrackingDetail ? (
                      <KeyboardArrowUpIcon sx={{color: '#ffffff'}}/>
                    ) : (
                      <KeyboardArrowDownIcon sx={{color: '#ffffff'}}/>
                    )}
                  </TrackingDetailTitleContainer>
                  {showTrackingDetail && (
                    <TrackingDetailContainer>
                        <TrackingDetailRow>
                          <TrackingDetailLabel>Track Number</TrackingDetailLabel>
                          <TrackingDetailData>{orderData?.trackingDetails?.trackingId}</TrackingDetailData>
                        </TrackingDetailRow>
                        {orderData?.trackingDetails?.video && (
                          <TrackingDetailRow>
                            <TrackingDetailLabel>Packing Video</TrackingDetailLabel>
                            <PackingVideo src={orderData?.trackingDetails?.video} controls></PackingVideo>
                          </TrackingDetailRow>
                        )}
                    </TrackingDetailContainer>
                  )}
                </TrackingWrapper>
              )}
              {(orderData?.unloadingDetails?.videoUrl || orderData?.unloadingDetails?.imageUrl) && (
                <TrackingWrapper>
                  <TrackingDetailTitleContainer onClick={() => handleToggleShowUnloadingDetail()}>
                    <TrackingDetailTitle>Show Unloading Detail</TrackingDetailTitle>
                    {showUnloadingDetail ? (
                      <KeyboardArrowUpIcon sx={{color: '#ffffff'}}/>
                    ) : (
                      <KeyboardArrowDownIcon sx={{color: '#ffffff'}}/>
                    )}
                  </TrackingDetailTitleContainer>
                  {showUnloadingDetail && (
                    <TrackingDetailContainer>
                      {orderData?.unloadingDetails?.videoUrl && (
                        <TrackingDetailRow>
                          <TrackingDetailLabel>Packing Image</TrackingDetailLabel>
                          <PackingImage src={orderData?.unloadingDetails?.imageUrl}></PackingImage>
                        </TrackingDetailRow>
                      )}
                      {orderData?.unloadingDetails?.videoUrl && (
                        <TrackingDetailRow>
                          <TrackingDetailLabel>Packing Video</TrackingDetailLabel>
                          <PackingVideo src={orderData?.unloadingDetails?.videoUrl} controls></PackingVideo>
                        </TrackingDetailRow>
                      )}
                    </TrackingDetailContainer>
                  )}
                </TrackingWrapper>
              )}
              <MaterialReactTable table={table} />
            </OrderDetailDialogBodyWrapper>
          </OrderDetailDialogContainer>
        </DialogContent>
        {/* <DialogActions>
            <Button onClick={handleClose} 
                sx={{
                    background: '#1876d1',
                    color: '#ffffff',
                    '&:hover': { 
                        background: '#1876d1',
                    },
                }}
                disabled={loading}
            >
                Cancel
            </Button>
            <Button onClick={() => handleSuccess()} 
                sx={{
                    background: '#d32f2f', 
                    color: '#ffffff',
                    '&:hover': { 
                        background: '#d32f2f',
                    },
                }}
                disabled={loading}
            >
                Ok
            </Button>
        </DialogActions> */}

      <CarousalDialog open={openImageDialog} handleClose={handleCloseImageDialog} imageDataPath={imageDataPath} videoPath={videoPath} />
    </Dialog>
  )
}

export default OrderDetailDialog