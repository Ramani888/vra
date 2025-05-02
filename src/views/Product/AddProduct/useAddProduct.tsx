import React, { useEffect, useState } from "react";
import {
  serverGetCategory,
  serverGetProductBaseMetalData,
  serverGetProductPlatingData,
  serverGetProductStoneTypeData,
  serverGetProductTrendData,
  serverGetProductBrandData,
  serverGetProductColorData,
  serverGetProductOccasionData,
  serverGetProductTypeData,
  serverInsertProduct,
  serverUpdateProduct,
  serverPushNotification,
} from "../../../services/serverApi";
import { IBanner } from "../../../types/banner";
import * as Yup from "yup";
import { ICategory } from "../../../types/category";
import { IProduct, ProductDivision } from "../../../types/product.d";
import { isUrlString, uploadImage, uploadImageS3, uploadVideo, uploadVideoS3 } from "../../../utils/helpers/global";

const useAddProduct = (
  handleClose: () => void,
  getProductData: () => void,
  editDataObject: IProduct | null,
  open: boolean
) => {
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [categoryData, setCategoryData] = useState<ICategory[]>([]);
  const [division, setDivision] = useState<number>(ProductDivision?.Division1);
  const [selectedImage, setSelectedImage] = useState<any>({
    image1: editDataObject ? editDataObject?.image[0]?.path : '', 
    image2: editDataObject ? editDataObject?.image[1]?.path : '', 
    image3: editDataObject ? editDataObject?.image[2]?.path : '',
    image4: editDataObject ? editDataObject?.image[3]?.path : ''
  })
  const areAtLeastTwoImagesSelected = () => {
    const imageValues = Object.values(selectedImage);
    const filledImageCount = imageValues.filter(image => image !== '').length;
    return filledImageCount >= 2;
  };
  const [selectedVideo, setSelectedVideo] = useState<any>(editDataObject ? editDataObject?.videoPath : undefined)
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
  const [sizeData, setSizeData] = React.useState<string[]>(['Free Size']);

  const handleSizeChange = (event: any) => {
    const {
      target: { value },
    } = event;
    if (sizeData && sizeData[0] === 'Free Size') {
      setSizeData([value[1]])
    } else {
      if (value.includes('Free Size')) {
        setSizeData(['Free Size'])
      } else {
        setSizeData(
          typeof value === 'string' ? value.split(',') : value,
        );
      }
    }
  };

  const handleOnImageChange = (e: any) => {
    const { name } = e?.target;
    const minWidth = 1000;
    // const maxWidth = 500;
    const minHeight = 1000;
    // const maxHeight = 500;
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event?.target?.result as string;
        if (result) {
          const image = new Image();
          image.src = result;
          image.onload = () => {
            const { width, height } = image;
            // if (width >= minWidth && height >= minHeight) {
              // width >= minWidth && width <= maxWidth && height >= minHeight && height <= maxHeight
              setSelectedImage({...selectedImage, [name]: e?.target?.files[0]})
            // } else {
            //   alert('Please select image with proper dimension.');
            //   e.target.value = null;
            // }
          };
        } else {
          console.error('Failed to read image file.');
        }
      };
      reader.readAsDataURL(file);
    }
    // setSelectedImage({...selectedImage, [name]: e?.target?.files[0]})
  }

  const handleOnVideoChange = (e: any) => {
    setSelectedVideo(e?.target?.files[0])
  }

  const getCategoryData = async () => {
    try {
      const res = await serverGetCategory();
      setCategoryData(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategoryName = (data: string) => {
    const res = categoryData?.find((item) => item?._id?.toString() === data);
    return res?.name
  }

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



  const schema = Yup.object().shape({
    categoryId: Yup.string().required("Please select a category.*"),
    name: Yup.string().required("Name is a required field.*"),
    code: Yup.string().required("HSN Code is a required field.*"),
    price: Yup.string().required("Price is a required field.*"),
    mrp: Yup.string().required("MRP is a required field.*"),
    qty: Yup.string().required("Quantity is a required field.*"),
    gst: Yup.string().required("GST(%) is a required field.*"),
    productBaseMetalId: Yup.string().required("Base Metal is a required field.*"),
    productPlatingId: Yup.string().required("Plating is a required field.*"),
    productStoneTypeId: Yup.string().required("Stone Type is a required field.*"),
    productTrendId: Yup.string().required("Trend is a required field.*"),
    inSuratCityCharge: Yup.string().required("Surat city charge is a required field.*"),
    inGujratStateCharge: Yup.string().required("Gujrat state charge is a required field.*"),
    inOutStateCharge: Yup.string().required("Out state charge is a required field.*"),
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "image" && e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      setLoading(true)

      if (editDataObject) {
        const imageFileArray: any = [];
        const imageStringArray: any = [];

        data?.imagesData?.forEach((item: any) => {
          if (item instanceof File) {
            imageFileArray.push(item);
          } else if (typeof item === 'string') {
            imageStringArray.push(item);
          }
        });

        const deleteImageArray = editDataObject?.image.filter((item) => !imageStringArray.includes(item?.path));
        const deleteImageArrayIds: any = deleteImageArray?.map((item) => item?._id)

        let remainingImageArray: any = editDataObject?.image?.filter((obj) => !deleteImageArrayIds.includes(obj._id));

        if (imageFileArray?.length > 0) {
          const imagesUrl = await uploadImageS3(imageFileArray)
          remainingImageArray = [...remainingImageArray ?? [], ...imagesUrl];
        }

        if (deleteImageArray && deleteImageArray?.length > 0) {
          data.deleteImages = deleteImageArray
        }

        data.image = remainingImageArray
        data._id = editDataObject?._id

        if (data?.videoData) {
          if (!isUrlString(data?.videoData)) {
            const videoUrl = await uploadVideoS3(data?.videoData)
            data.videoPath = videoUrl
            data.deleteVideo = editDataObject?.videoPath
          } else {
            data.videoPath = data?.videoData
          }
        } else {
          data.deleteVideo = editDataObject?.videoPath
          data.videoPath = "";
        }
        await serverUpdateProduct(data)
      } else {
        if (data?.imagesData) {
          const imagesUrl = await uploadImageS3(data?.imagesData)
          console.log('imagesUrl', imagesUrl)
          data.image = imagesUrl;
        }
        if (data?.videoData) {
          const videoUrl = await uploadVideoS3(data?.videoData)
          data.videoPath = videoUrl
        }
        await serverInsertProduct(data);
        // const notificationData = {
        //   title: getCategoryName(data?.categoryId),
        //   body: data?.name,
        // }
        // await serverPushNotification(notificationData)
      }
      setLoading(false)
      handleClose();
      setImage("");
      getProductData();
    } catch (error) {
      console.log("error", error);
      setLoading(false)
    } finally {
      setLoading(false);
    }
  };

  const handleChangeDivision = (data: number) => {
    setDivision(data)
  }

  useEffect(() => {
    getCategoryData();
    getProductInformationData();
  }, []);

  useEffect(() => {
    setDivision(ProductDivision?.Division1)
    setSelectedImage({image1: editDataObject ? editDataObject?.image[0]?.path : '', image2: editDataObject ? editDataObject?.image[1]?.path : '', image3: editDataObject ? editDataObject?.image[2]?.path : '', image4: editDataObject ? editDataObject?.image[3]?.path : ''})
    setSelectedVideo(editDataObject ? editDataObject?.videoPath : undefined)
  }, [open])

  useEffect(() => {
    if (editDataObject) {
      setSizeData(editDataObject?.size)
    }
  }, [editDataObject])

  return {
    image,
    handleImageChange,
    handleSubmit,
    loading,
    schema,
    categoryData,
    handleChangeDivision,
    division,
    handleOnImageChange,
    selectedImage,
    handleOnVideoChange,
    selectedVideo,
    setSelectedImage,
    setSelectedVideo,
    productInformationData,
    areAtLeastTwoImagesSelected,
    sizeData,
    handleSizeChange
  };
};

export default useAddProduct;
