import React from "react";
import AppHeader from "../../components/AppHeader/AppHeader";
import { UsersContainer } from "../Users/Users.styled";
import useProduct from "./useProduct";
import { MaterialReactTable } from "material-react-table";
import MessageDialog from "../../Dialogs/MeesageDialog/MessageDialog";
import AddProduct from "./AddProduct/AddProduct";
import ImageDialog from "../../Dialogs/ImageDialog/ImageDialog";
import CarousalDialog from "../../Dialogs/CarousalDialog/CarousalDialog";

const Product = () => {
  const {
    getProductData,
    productData,
    table,
    isOpen,
    setIsOpen,
    showMessageDialog,
    handleCloseMessageDialog,
    handleDeleteProduct,
    editDataObject,
    handleCloseImageDialog,
    openImageDialog,
    selectedImage,
    selectedVideo,
    loading,
    showMessageDialogForContinue,
    showMessageDialogForPause,
    handleCloseMessageDialogForContinue,
    handleCloseMessageDialogForPause,
    handleActionProduct
  } = useProduct();

  return (
    <UsersContainer>
      <AppHeader
        headerTitle={"Product"}
        dataCount={productData?.length}
        buttonHide={false}
        buttonLabel={'Add Product'}
        onClick={() => setIsOpen(true)}
      />
      <MaterialReactTable table={table} />

      {isOpen && (
        <AddProduct
          open={isOpen}
          handleClose={() => setIsOpen(false)}
          getProductData={getProductData}
          editDataObject={editDataObject}
        />
      )}

      <MessageDialog
        open={showMessageDialog}
        handleClose={handleCloseMessageDialog}
        handleSuccess={() => handleDeleteProduct()}
        message={"Are you sure you want to delete this product?"}
        headerTitle={"Delete Product"}
        loading={loading}
      ></MessageDialog>

      <MessageDialog
        open={showMessageDialogForPause}
        handleClose={handleCloseMessageDialogForPause}
        handleSuccess={() => handleActionProduct()}
        message={"Are you sure you want to pause this product?"}
        headerTitle={"Pause Product"}
        loading={loading}
      ></MessageDialog>

      <MessageDialog
        open={showMessageDialogForContinue}
        handleClose={handleCloseMessageDialogForContinue}
        handleSuccess={() => handleActionProduct()}
        message={"Are you sure you want to continue this product?"}
        headerTitle={"Continue Product"}
        loading={loading}
      ></MessageDialog>

      <CarousalDialog open={openImageDialog} handleClose={handleCloseImageDialog} imageDataPath={selectedImage} videoPath={selectedVideo} />
      {/* <ImageDialog open={openImageDialog} handleClose={handleCloseImageDialog} /> */}

    </UsersContainer>
  );
};

export default Product;
