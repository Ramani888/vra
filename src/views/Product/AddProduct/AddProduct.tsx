import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import AppInput from "../../../components/AppInput/AppInput";
import { Form, ImageContainer, ImageLabel, ImageNote, ImageWrapper, ProductSectionContainer, VideoContainer, VideoLabel } from "./AddProduct.styled";
import { IProduct } from "../../../types/product.d";
import { Formik } from "formik";
import useAddProduct from "./useAddProduct";
import AppDropDown from "../../../components/AppDropDown/AppDropDown";
import AppFileInput from "../../../components/AppFileInput/AppFileInput";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import AppCheckBoxDropDown from "../../../components/AppCheckBoxDropDown/AppCheckBoxDropDown";
import { ProductSizeData } from "../../../utils/consts/product";

interface Props {
  open: boolean;
  handleClose: () => void;
  getProductData: () => void;
  editDataObject: IProduct | null;
}

const AddProduct: React.FC<Props> = ({
  open,
  handleClose,
  getProductData,
  editDataObject,
}) => {
  const { 
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
  } = useAddProduct(handleClose, getProductData, editDataObject, open);

  return (
    <Dialog
      open={open}
      onClose={!loading ? handleClose : () => {}}
      scroll={"body"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      fullWidth
      maxWidth={false}
    >
      <DialogTitle id="scroll-dialog-title" bgcolor={'#0b3157'} color={'#ffffff'}>
        {editDataObject ? "Update Product" : "Add Product"}
      </DialogTitle>
      <Formik
        validationSchema={schema}
        initialValues={{
          categoryId: editDataObject ? editDataObject?.categoryId : "",
          name: editDataObject ? editDataObject?.name : "",
          code: editDataObject ? editDataObject?.code :"",
          gst: editDataObject ? editDataObject?.gst: "",
          price: editDataObject ? editDataObject?.price : "",
          mrp: editDataObject ? editDataObject?.mrp :"",
          description: editDataObject ? editDataObject?.description : "",
          size: editDataObject ? editDataObject?.size ?? "" : "",
          weight: editDataObject ? editDataObject?.weight : "",
          qty: editDataObject ? editDataObject?.qty : "",
          productBaseMetalId: editDataObject ? editDataObject?.productBaseMetalId : "",
          productPlatingId: editDataObject ? editDataObject?.productPlatingId : "",
          productStoneTypeId: editDataObject ? editDataObject?.productStoneTypeId : "",
          productTrendId: editDataObject ? editDataObject?.productTrendId : "",
          productBrandId: editDataObject ? editDataObject?.productBrandId : "",
          productColorId: editDataObject ? editDataObject?.productColorId : "",
          productOccasionId: editDataObject ? editDataObject?.productOccasionId : "",
          productTypeId: editDataObject ? editDataObject?.productTypeId : "",
          inSuratCityCharge: editDataObject ? editDataObject?.inSuratCityCharge: "",
          inGujratStateCharge: editDataObject ? editDataObject?.inGujratStateCharge : "",
          inOutStateCharge: editDataObject ? editDataObject?.inOutStateCharge : ""
        }}
        onSubmit={(values) => {
          const images = [];
          if (selectedImage?.image1) images.push(selectedImage.image1);
          if (selectedImage?.image2) images.push(selectedImage.image2);
          if (selectedImage?.image3) images.push(selectedImage.image3);
          if (selectedImage?.image4) images.push(selectedImage.image4);
          handleSubmit({ 
            ...values,
            size: sizeData,
            imagesData: images,
            ...(selectedVideo && { videoData: selectedVideo })
          });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit}>
            <DialogContent
              dividers
              sx={{
                gap: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h3>1. Product Details</h3>
              <ProductSectionContainer>
                <AppDropDown
                  data={categoryData} 
                  placeHolder={'Please select'} 
                  handleChange={(e) => {
                    handleChange(e);
                  }} 
                  value={values.categoryId}
                  name={'categoryId'}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  label={'Category'}
                  minWidth={'300px'}
                  isRequired
                />

                <AppInput
                  label="Name"
                  name="name"
                  type="text"
                  handleChange={(e) => handleChange(e)}
                  value={String(values?.name)}
                  placeholder={"Enter name"}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  isRequired
                />

                <AppInput
                  label="Description"
                  name="description"
                  type="text"
                  handleChange={(e) => handleChange(e)}
                  value={String(values?.description)}
                  placeholder={"Enter Note..."}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                />

                <AppInput
                  label="HSN Code"
                  name="code"
                  type="text"
                  handleChange={(e) => handleChange(e)}
                  value={String(values?.code)}
                  placeholder={"Enter code"}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  isRequired
                />

                <AppInput
                  label="GST (%)"
                  name="gst"
                  type="text"
                  handleChange={(e) => handleChange(e)}
                  value={String(values?.gst)}
                  placeholder={"Enter GST"}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  isRequired
                />

                <AppInput
                  label="MRP"
                  name="mrp"
                  type="number"
                  handleChange={(e) => handleChange(e)}
                  value={String(values?.mrp)}
                  placeholder={"Enter MRP"}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  isRequired
                />

                <AppInput
                  label="Price"
                  name="price"
                  type="number"
                  handleChange={(e) => handleChange(e)}
                  value={String(values?.price)}
                  placeholder={"Enter price"}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  isRequired
                />
              </ProductSectionContainer>

              <h3>2. Basic Details</h3>
              <ProductSectionContainer>
                {/* <AppInput
                  label="Size"
                  name="size"
                  type="text"
                  handleChange={(e) => handleChange(e)}
                  value={String(values?.size)}
                  placeholder={"Free Size"}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                /> */}

                <AppCheckBoxDropDown
                  data={ProductSizeData} 
                  handleChange={(e) => {
                    handleSizeChange(e);
                  }}
                  placeHolder={'Please select size'} 
                  value={sizeData}
                  name={'size'}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  label={'Size'}
                  minWidth={'300px'}
                  isRequired
                />

                <AppInput
                  label="Weight (g)"
                  name="weight"
                  type="number"
                  handleChange={(e) => handleChange(e)}
                  value={String(values?.weight)}
                  placeholder={"Enter Weight (g)"}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                />

                <AppInput
                  label="Quantity"
                  name="qty"
                  type="number"
                  handleChange={(e) => handleChange(e)}
                  value={String(values?.qty)}
                  placeholder={"Enter Quantity (N)"}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  isRequired
                />

                <AppDropDown
                  data={productInformationData?.productBaseMetalData} 
                  placeHolder={'Please select'} 
                  handleChange={(e) => {
                    handleChange(e);
                  }} 
                  value={values.productBaseMetalId}
                  name={'productBaseMetalId'}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  label={'Base Metal'}
                  minWidth={'300px'}
                  isRequired
                />

                <AppDropDown
                  data={productInformationData?.productPlatingData} 
                  placeHolder={'Please select'} 
                  handleChange={(e) => {
                    handleChange(e);
                  }} 
                  value={values.productPlatingId}
                  name={'productPlatingId'}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  label={'Plating'}
                  minWidth={'300px'}
                  isRequired
                />

                <AppDropDown
                  data={productInformationData?.productStoneTypeData} 
                  placeHolder={'Please select'} 
                  handleChange={(e) => {
                    handleChange(e);
                  }} 
                  value={values.productStoneTypeId}
                  name={'productStoneTypeId'}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  label={'Stone Type'}
                  minWidth={'300px'}
                  isRequired
                />

                <AppDropDown
                  data={productInformationData?.productTrendData} 
                  placeHolder={'Please select'} 
                  handleChange={(e) => {
                    handleChange(e);
                  }} 
                  value={values.productTrendId}
                  name={'productTrendId'}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  label={'Trend'}
                  minWidth={'300px'}
                  isRequired
                />
              </ProductSectionContainer>

              <h3>3. Additional Details</h3>
              <ProductSectionContainer>
                <AppDropDown
                  data={productInformationData?.productBrandData} 
                  placeHolder={'Please select'} 
                  handleChange={(e) => {
                    handleChange(e);
                  }} 
                  value={values.productBrandId}
                  name={'productBrandId'}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  label={'Brand'}
                  minWidth={'300px'}
                />

                <AppDropDown
                  data={productInformationData?.productColorData} 
                  placeHolder={'Please select'} 
                  handleChange={(e) => {
                    handleChange(e);
                  }} 
                  value={values.productColorId}
                  name={'productColorId'}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  label={'Color'}
                  minWidth={'300px'}
                />

                <AppDropDown
                  data={productInformationData?.productOccasionData} 
                  placeHolder={'Please select'} 
                  handleChange={(e) => {
                    handleChange(e);
                  }} 
                  value={values.productOccasionId}
                  name={'productOccasionId'}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  label={'Occasion'}
                  minWidth={'300px'}
                />

                <AppDropDown
                  data={productInformationData?.productTypeData} 
                  placeHolder={'Please select'} 
                  handleChange={(e) => {
                    handleChange(e);
                  }} 
                  value={values.productTypeId}
                  name={'productTypeId'}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  label={'Type'}
                  minWidth={'300px'}
                />
              </ProductSectionContainer>
              <ImageContainer>
                <ImageLabel>Choose a image</ImageLabel>
                <ImageWrapper>
                  <AppFileInput 
                    accept="image/png, image/gif, image/jpeg"
                    name="image1"
                    handleChange={(e) => handleOnImageChange(e)}
                    value={selectedImage?.image1}
                    handleRemove={() => setSelectedImage({...selectedImage, image1: ''})}
                  />

                  <AppFileInput 
                    accept="image/png, image/gif, image/jpeg"
                    name="image2"
                    handleChange={(e) => handleOnImageChange(e)}
                    value={selectedImage?.image2}
                    handleRemove={() => setSelectedImage({...selectedImage, image2: ''})}
                  />

                  <AppFileInput 
                    accept="image/png, image/gif, image/jpeg"
                    name="image3"
                    handleChange={(e) => handleOnImageChange(e)}
                    value={selectedImage?.image3}
                    handleRemove={() => setSelectedImage({...selectedImage, image3: ''})}
                  />

                  <AppFileInput 
                    accept="image/png, image/gif, image/jpeg"
                    name="image4"
                    handleChange={(e) => handleOnImageChange(e)}
                    value={selectedImage?.image4}
                    handleRemove={() => setSelectedImage({...selectedImage, image4: ''})}
                  />
                </ImageWrapper>
                <ImageNote isSuccess={!areAtLeastTwoImagesSelected()}><PriorityHighIcon />Please select minimum two image.</ImageNote>
              </ImageContainer>
              <VideoContainer>
                <VideoLabel>Choose a video</VideoLabel>
                <AppFileInput 
                  accept="video/mp4,video/x-m4v,video/*"
                  name="video"
                  handleChange={(e) => handleOnVideoChange(e)}
                  value={selectedVideo}
                  isVideo
                  handleRemove={() => setSelectedVideo(undefined)}
                />
              </VideoContainer>

              <h3>4. Delivery Charge</h3>
              <ProductSectionContainer>
                <AppInput
                  label="Surat City Delivey Charge"
                  name="inSuratCityCharge"
                  type="number"
                  handleChange={(e) => handleChange(e)}
                  value={String(values?.inSuratCityCharge)}
                  placeholder={""}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                />

                <AppInput
                  label="Gujrat State Charge"
                  name="inGujratStateCharge"
                  type="number"
                  handleChange={(e) => handleChange(e)}
                  value={String(values?.inGujratStateCharge)}
                  placeholder={""}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                />

                <AppInput
                  label="Out Of State Charge"
                  name="inOutStateCharge"
                  type="number"
                  handleChange={(e) => handleChange(e)}
                  value={String(values?.inOutStateCharge)}
                  placeholder={""}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                />
              </ProductSectionContainer>
            </DialogContent>

            <DialogActions>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Button
                  onClick={handleClose}
                  variant="contained"
                  color={"inherit"}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Box sx={{ position: 'relative' }}>
                  <Button variant="contained" type='submit' color={'primary'} disabled={loading || !areAtLeastTwoImagesSelected()}>Submit</Button>
                  {loading && (
                    <CircularProgress
                      size={24}
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                      }}
                    />
                  )}
                </Box>
              </div>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default AddProduct;
