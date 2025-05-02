import { Box, IconButton, Tooltip } from "@mui/material";
import {
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import React, { useEffect, useMemo, useState } from "react";
import {
  serverDeleteProduct,
  serverGetCategory,
  serverGetProductBaseMetalData,
  serverGetProductBrandData,
  serverGetProductColorData,
  serverGetProductOccasionData,
  serverGetProductPlatingData,
  serverGetProducts,
  serverGetProductStoneTypeData,
  serverGetProductTrendData,
  serverGetProductTypeData,
  serverUpdateProductAction,
} from "../../services/serverApi";
import { IProduct } from "../../types/product";
import { ActionImg, ImageLabel, ProductImage, ProductName } from "./Product.styled";
import { deleteIcon, editIcon } from "../../assets/images";
import { ICategory } from "../../types/category";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { formatNumber } from "../../utils/helpers/global";
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import NotStartedIcon from '@mui/icons-material/NotStarted';

const useProduct = () => {
  const [productData, setProductData] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showMessageDialog, setShowMessageDialog] = useState<boolean>(false);
  const [showMessageDialogForPause, setShowMessageDialogForPause] = useState<boolean>(false);
  const [showMessageDialogForContinue, setShowMessageDialogForContiue] = useState<boolean>(false);
  const [deleteProductId, setDeleteProductId] = useState<string>("");
  const [editDataObject, setEditDataObject] = useState<IProduct | null>(null);
  const [openImageDialog, setOpenImageDialog] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<any[]>([])
  const [selectedVideo, setSelectedVideo] = useState<string | null>()
  const [productInformationData, setProductInformationData] = useState<any>({
    productBaseMetalData: [],
    productPlatingData: [],
    productStoneTypeData: [],
    productTrendData: [],
    productBrandData: [],
    productColorData: [],
    productOccasionData: [],
    productTypeData: []
  })
  const [categoryData, setCategoryData] = useState<ICategory[]>([]);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const HandleClose = () => {
    setIsOpen(false);
  };
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

  const handleOpenImageDialog = (data: any[], videoData: string) => {
    setOpenImageDialog(true)
    setSelectedImage(data)
    setSelectedVideo(videoData)
  }

  const handleCloseImageDialog = () => {
    setOpenImageDialog(false)
    setSelectedImage([])
    setSelectedVideo(undefined)
  }

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

  const getProductInformationData = async () => {
    try {
      const productPlatingData = await serverGetProductPlatingData();
      const productBaseMetalData = await serverGetProductBaseMetalData();
      const productStoneTypeData = await serverGetProductStoneTypeData();
      const productTrendData = await serverGetProductTrendData();
      const productBrandData = await serverGetProductBrandData();
      const productColorData = await serverGetProductColorData();
      const productOccasionData = await serverGetProductOccasionData();
      const productTypeData = await serverGetProductTypeData();

      const productInformationData = {
        productPlatingData: productPlatingData?.data,
        productBaseMetalData: productBaseMetalData?.data,
        productStoneTypeData: productStoneTypeData?.data,
        productTrendData: productTrendData?.data,
        productBrandData: productBrandData?.data,
        productColorData: productColorData?.data,
        productOccasionData: productOccasionData?.data,
        productTypeData: productTypeData?.data
      }

      setProductInformationData(productInformationData);
    } catch (error) {
      console.log(error);
    }
  }

  const getCategoryName = (categoryId: string) => {
    const data = categoryData?.find((item) => item?._id === categoryId);
    return data?.name;
  }

  const getProductBaseMetalName = (productBaseMetalId: string) => {
    const data = productInformationData?.productBaseMetalData?.find((item: any) => item?._id === productBaseMetalId);
    return data?.name;
  }

  const getProductPlatingName = (productPlatingId: string) => {
    const data = productInformationData?.productPlatingData?.find((item: any) => item?._id === productPlatingId);
    return data?.name;
  }

  const getProductStoneTypeName = (productStoneTypeId: string) => {
    const data = productInformationData?.productStoneTypeData?.find((item: any) => item?._id === productStoneTypeId);
    return data?.name;
  }

  const getProductTrendName = (productTrendId: string) => {
    const data = productInformationData?.productTrendData?.find((item: any) => item?._id === productTrendId);
    return data?.name;
  }

  useEffect(() => {
    getProductData();
    getCategoryData();
    getProductInformationData();
  }, []);

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
        accessorKey: "categoryId",
        header: "Category",
        Cell: ({ row }) => {
          return (
          <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
            {getCategoryName(row?.original?.categoryId)}
          </Box>
          )
        }
      },
      {
        accessorKey: "productBaseMetalId",
        header: "Base Metal",
        Cell: ({ row }) => {
          return (
          <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
            {getProductBaseMetalName(row?.original?.productBaseMetalId)}
          </Box>
          )
        }
      },
      {
        accessorKey: "productPlatingId",
        header: "Plating",
        Cell: ({ row }) => {
          return (
          <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
            {getProductPlatingName(row?.original?.productPlatingId)}
          </Box>
          )
        }
      },
      {
        accessorKey: "productStoneTypeId",
        header: "Stone Type",
        Cell: ({ row }) => {
          return (
          <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
            {getProductStoneTypeName(row?.original?.productStoneTypeId)}
          </Box>
          )
        }
      },
      {
        accessorKey: "productTrendId",
        header: "Trend",
        Cell: ({ row }) => {
          return (
          <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
            {getProductTrendName(row?.original?.productTrendId)}
          </Box>
          )
        }
      },
      {
        accessorKey: "imagePath",
        header: "image",
        Cell: ({ row }) => {
          return (
          <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
              <ImageLabel onClick={() => handleOpenImageDialog(row?.original?.image, row?.original?.videoPath)}>View Image</ImageLabel>
          </Box>
          )
        }
      },
      {
        accessorKey: "code",
        header: "Code",
      },
      {
        accessorKey: "mrp",
        header: "MRP",
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
      },
    ],
    [categoryData, productInformationData]
  );

  const handleOpenMessageDialog = (row: any) => {
    setShowMessageDialog(true);
    setDeleteProductId(row?.original?._id);
  };

  const handleOpenMessageDialogForPause = (row: any) => {
    setShowMessageDialogForPause(true);
    setDeleteProductId(row?.original?._id);
  };

  const handleOpenMessageDialogForContinue = (row: any) => {
    setShowMessageDialogForContiue(true);
    setDeleteProductId(row?.original?._id);
  };

  const handleCloseMessageDialog = () => {
    setShowMessageDialog(false);
  };

  const handleCloseMessageDialogForPause = () => {
    setShowMessageDialogForPause(false);
  };

  const handleCloseMessageDialogForContinue = () => {
    setShowMessageDialogForContiue(false);
  };

  const handleDeleteProduct = async () => {
    try {
      setLoading(true)
      await serverDeleteProduct(deleteProductId);
      handleCloseMessageDialog();
      setDeleteProductId("");
      getProductData();
      setLoading(false)
    } catch (error) {
      console.log("error", error);
      setLoading(false)
    }
  };

  const handleActionProduct = async () => {
    try {
      setLoading(true)
      await serverUpdateProductAction(deleteProductId);
      handleCloseMessageDialogForContinue();
      handleCloseMessageDialogForPause();
      setDeleteProductId("");
      getProductData();
      setLoading(false)
    } catch (error) {
      console.log("error", error);
      setLoading(false)
    }
  };

  const handleEditData = (row: any) => {
    setEditDataObject(row?.original);
    setIsOpen(true);
  };

  const table = useMaterialReactTable({
    columns,
    data: productData,
    enableEditing: true,
    positionActionsColumn: "last",
    enablePagination: false,
    enableBottomToolbar: false,
    state: { isLoading: loading },
    enableStickyHeader: true,
    muiTableContainerProps: { sx: { maxHeight: "65vh" } },
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        {row?.original?.isPause ? (
          <Tooltip title="Continue Product">
            <IconButton
              color='primary'
              onClick={() => handleOpenMessageDialogForContinue(row)}
            >
              <NotStartedIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Pause Product">
            <IconButton
              color="error"
              onClick={() => handleOpenMessageDialogForPause(row)}
            >
              <PauseCircleFilledIcon />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Edit">
          <IconButton onClick={() => handleEditData(row)}>
            <ActionImg src={editIcon} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            color="error"
            onClick={() => handleOpenMessageDialog(row)}
          >
            <ActionImg src={deleteIcon} />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  });

  useEffect(() => {
    if (!isOpen) {
      setEditDataObject(null)
    }
}, [isOpen])
  return {
    loading,
    getProductData,
    productData,
    table,
    isOpen,
    setIsOpen,
    handleOpen,
    HandleClose,
    handleCloseMessageDialog,
    handleOpenMessageDialog,
    deleteProductId,
    showMessageDialog,
    handleDeleteProduct,
    editDataObject,
    handleCloseImageDialog,
    openImageDialog,
    selectedImage,
    selectedVideo,
    showMessageDialogForContinue,
    showMessageDialogForPause,
    handleCloseMessageDialogForContinue,
    handleCloseMessageDialogForPause,
    handleActionProduct
  };
};

export default useProduct;
