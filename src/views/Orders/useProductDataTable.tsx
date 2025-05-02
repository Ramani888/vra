import { useMaterialReactTable } from "material-react-table";
import { MRT_ColumnDef } from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import { ICategory } from "../../types/category";
import {
  serverGetCategory,
  serverGetProductBaseMetalData,
  serverGetProductBrandData,
  serverGetProductColorData,
  serverGetProductOccasionData,
  serverGetProductPlatingData,
  serverGetProductStoneTypeData,
  serverGetProductTrendData,
  serverGetProductTypeData,
} from "../../services/serverApi";
import { ProductImage, ProductName } from "./Orders.styled";

const useProductDataTable = (data: any[]) => {
  const [productInformationData, setProductInformationData] = useState<any>({
    productBaseMetalData: [],
    productPlatingData: [],
    productStoneTypeData: [],
    productTrendData: [],
    productBrandData: [],
    productColorData: [],
    productOccasionData: [],
    productTypeData: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [categoryData, setCategoryData] = useState<ICategory[]>([]);
  const [openImageDialog, setOpenImageDialog] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<any[]>([])
  const [selectedVideo, setSelectedVideo] = useState<string | null>()

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
        productTypeData: productTypeData?.data,
      };

      setProductInformationData(productInformationData);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategoryData = async () => {
    try {
      setLoading(true);
      const res = await serverGetCategory();
      setCategoryData(res?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const getCategoryName = (categoryId: string) => {
    const data = categoryData?.find((item) => item?._id === categoryId);
    return data?.name;
  };

  const getProductBaseMetalName = (productBaseMetalId: string) => {
    const data = productInformationData?.productBaseMetalData?.find(
      (item: any) => item?._id === productBaseMetalId
    );
    return data?.name;
  };

  const getProductPlatingName = (productPlatingId: string) => {
    const data = productInformationData?.productPlatingData?.find(
      (item: any) => item?._id === productPlatingId
    );
    return data?.name;
  };

  const getProductStoneTypeName = (productStoneTypeId: string) => {
    const data = productInformationData?.productStoneTypeData?.find(
      (item: any) => item?._id === productStoneTypeId
    );
    return data?.name;
  };

  const getProductTrendName = (productTrendId: string) => {
    const data = productInformationData?.productTrendData?.find(
      (item: any) => item?._id === productTrendId
    );
    return data?.name;
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

  const productColumns = useMemo<MRT_ColumnDef<any[]>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        enableEditing: false,
        Cell: ({ row }: any) => {
          return (
            <Box sx={{ display: "flex", gap: "2ch", alignItems: "center", whiteSpace: 'nowrap' }}>
              <ProductImage
                src={row?.original?.product?.image[0]?.path}
                onClick={() => handleOpenImageDialog(row?.original?.product?.image, row?.original?.product?.videoPath)}
              ></ProductImage>
              <ProductName>{row?.original?.product?.name}</ProductName>
            </Box>
          );
        },
      },
      {
        accessorKey: "categoryId",
        header: "Category",
        Cell: ({ row }: any) => {
          return (
            <Box sx={{ display: "flex", gap: "2ch", alignItems: "center" }}>
              {getCategoryName(row?.original?.product?.categoryId)}
            </Box>
          );
        },
      },
      {
        accessorKey: "productBaseMetalId",
        header: "Base Metal",
        Cell: ({ row }: any) => {
          return (
            <Box sx={{ display: "flex", gap: "2ch", alignItems: "center" }}>
              {getProductBaseMetalName(
                row?.original?.product?.productBaseMetalId
              )}
            </Box>
          );
        },
      },
      {
        accessorKey: "productPlatingId",
        header: "Plating",
        Cell: ({ row }: any) => {
          return (
            <Box sx={{ display: "flex", gap: "2ch", alignItems: "center" }}>
              {getProductPlatingName(row?.original?.product?.productPlatingId)}
            </Box>
          );
        },
      },
      {
        accessorKey: "productStoneTypeId",
        header: "Stone Type",
        Cell: ({ row }: any) => {
          return (
            <Box sx={{ display: "flex", gap: "2ch", alignItems: "center" }}>
              {getProductStoneTypeName(
                row?.original?.product?.productStoneTypeId
              )}
            </Box>
          );
        },
      },
      {
        accessorKey: "productTrendId",
        header: "Trend",
        Cell: ({ row }: any) => {
          return (
            <Box sx={{ display: "flex", gap: "2ch", alignItems: "center" }}>
              {getProductTrendName(row?.original?.product?.productTrendId)}
            </Box>
          );
        },
      },
      {
        accessorKey: "code",
        header: "Code",
        Cell: ({ row }: any) => (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {row?.original?.product?.code}
          </Box>
        ),
      },
      {
        accessorKey: "qty",
        header: "QTY",
        Cell: ({ row }: any) => (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {row?.original?.qty}
          </Box>
        ),
      },
      {
        accessorKey: "price",
        header: "Total Price",
        Cell: ({ row }: any) => (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {row?.original?.product?.price * row?.original?.qty}
          </Box>
        ),
      },
    ],
    [categoryData, productInformationData]
  );

  const productTable = useMaterialReactTable({
    columns: productColumns as any[],
    data,
    positionActionsColumn: "last",
    enablePagination: false,
    enableBottomToolbar: false,
    state: { isLoading: loading },
    enableStickyHeader: true,
    muiTableContainerProps: { sx: { maxHeight: "65vh" } },
  });

  useEffect(() => {
    getCategoryData();
    getProductInformationData();
  }, []);

  return {
    productTable,
    openImageDialog,
    selectedImage,
    selectedVideo,
    handleCloseImageDialog
  };
};

export default useProductDataTable;
