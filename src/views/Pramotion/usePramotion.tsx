import { Box, Checkbox, IconButton, Tooltip } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react'
import {
    useMaterialReactTable,
    type MRT_ColumnDef,
} from "material-react-table";
import { IProduct } from '../../types/product';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { formatNumber } from '../../utils/helpers/global';
import { ProductImage, ProductName } from './Pramotion.styled';
import { serverGetProducts, serverUpdateProductDiscount, serverUpdateProductPramotion, serverUpdateProductReward } from '../../services/serverApi';

const usePramotion = () => {
    const [openImageDialog, setOpenImageDialog] = useState<boolean>(false)
    const [selectedImage, setSelectedImage] = useState<any[]>([])
    const [selectedVideo, setSelectedVideo] = useState<string | null>()
    const [productData, setProductData] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleCloseImageDialog = () => {
        setOpenImageDialog(false)
        setSelectedImage([])
        setSelectedVideo(undefined)
    }

    const calculateSettlementAmount = (price: number, discount: number, reward: number) => {
        const discountAmount = discount ? (price * discount) / 100 : 0;
        const finalAmount = reward ? ((price - discountAmount) - reward) : (price - discountAmount);
        return formatNumber(finalAmount)
    }

    const columns = useMemo<MRT_ColumnDef<IProduct>[]>(
        () => [
            {
                accessorKey: "name",
                header: "Name",
                enableEditing: false,
                Cell: ({ row }) => {
                    return (
                        <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
                            <ProductImage src={row?.original?.image[0]?.path}></ProductImage>
                            <ProductName>{row?.original?.name}</ProductName>
                        </Box>
                    )
                }
            },
            {
                accessorKey: "code",
                header: "Code",
                enableEditing: false,
            },
            {
                accessorKey: "mrp",
                header: "MRP",
                enableEditing: false,
                Cell: ({ row }: any) => (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CurrencyRupeeIcon sx={{height: '15px', width: '15px'}}/>
                    <div>{formatNumber(row?.original?.mrp)}</div>
                </Box>
                )
            },
            {
                accessorKey: "price",
                header: "Price",
                enableEditing: false,
                Cell: ({ row }: any) => (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CurrencyRupeeIcon sx={{height: '15px', width: '15px'}}/>
                    <div>{formatNumber(row?.original?.price)}</div>
                </Box>
                )
            },
            {
                accessorKey: "qty",
                header: "Qty",
                enableEditing: false,
            },
            {
                accessorKey: "discount",
                header: "Discount",
                Cell: ({ row }: any) => (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <div>{isNaN(row?.original?.discount) ? 'N/A' : `${row?.original?.discount}%`}</div>
                    </Box>
                )
            },
            {
                accessorKey: "reward",
                header: "Reward",
                Cell: ({ row }: any) => (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <div>{isNaN(row?.original?.reward) ? 'N/A' : `${row?.original?.reward}`}</div>
                    </Box>
                )
            },
            {
                accessorKey: "settlementAmount",
                header: "Settlement Amount",
                enableEditing: false,
                Cell: ({ row }: any) => (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CurrencyRupeeIcon sx={{height: '15px', width: '15px'}}/>
                        <div>{calculateSettlementAmount(Number(row?.original?.price), Number(row?.original?.discount), Number(row?.original?.reward))}</div>
                    </Box>
                )
            },
            {
                accessorKey: "isPramotion",
                header: "Pramotion",
                enableEditing: false,
                Cell: ({ row }: any) => (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox checked={row?.original?.isPramotion} onClick={() => handleChecked(row?.original)} color="success" />
                    </Box>
                )
            },
        ],
        []
    );

    const getProductData = async () => {
        try {
          setLoading(true);
          const res = await serverGetProducts();
          setProductData(res?.data);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
    };

    useEffect(() => {
        getProductData();
    }, []);

    const handleChecked = async (data: IProduct) => {
        try {
            setLoading(true);
            await serverUpdateProductPramotion({...data, isPramotion: !data?.isPramotion});
            getProductData()
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const handleCellChange = async (data: IProduct, name: string) => {
        try {
            setLoading(true);
            if (name === 'reward') {
                await serverUpdateProductReward(data);
            } else {
                await serverUpdateProductDiscount(data);
            }
            getProductData()
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const table = useMaterialReactTable({
        columns,
        data: productData,
        enableEditing: true,
        positionActionsColumn: "last",
        enablePagination: false,
        enableBottomToolbar: false,
        state: { isLoading: loading },
        enableStickyHeader: true,
        enableCellActions: true,
        editDisplayMode: 'cell',
        muiTableContainerProps: { sx: { maxHeight: "65vh" } },
        renderRowActions: ({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip title="Edit">
              <IconButton onClick={() => {}}>
                <Checkbox checked={row?.original?.isPramotion} onClick={() => handleChecked(row?.original)} color="success" />
              </IconButton>
            </Tooltip>
          </Box>
        ),
        muiEditTextFieldProps: ({ cell }) => ({
            onBlur: (event) => {
              const dataObject: any = {
                ...cell.row.original,
                [event.target.name]: event.target.value,
              }
              if (event.target.value.length > 0 && dataObject !== cell.row.original) {
                handleCellChange(dataObject, event.target.name)
              }
            }
        }),
    });

    return {
        table,
        selectedImage,
        selectedVideo,
        openImageDialog,
        handleCloseImageDialog,
        productData
    }
}

export default usePramotion