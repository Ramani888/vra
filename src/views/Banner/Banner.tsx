import React, { useState } from 'react'
import AddButton from '../../components/AddButton/AddButton'
import AddBanner from './AddBanner/AddBanner';
import { BannerBodyContainer, BannerContainer, BannerHeaderContainer, BannerHeading } from './Banner.styled'
import useBanner from './useBanner';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import MessageDialog from '../../Dialogs/MeesageDialog/MessageDialog';
import ImageDialog from '../../Dialogs/ImageDialog/ImageDialog';
import AppHeader from '../../components/AppHeader/AppHeader';

const Banner = () => {
  const { isOpen, setIsOpen, table, getBannerData, bannerData, showMessageDialog, handleCloseMessageDialog, handleDeleteBanner, editDataObject, selectedImage, handleCloseImageDialog, openImageDialog } = useBanner();
  return (
    <BannerContainer>
      {/* <BannerHeaderContainer>
        <BannerHeading>Banners ({bannerData?.length})</BannerHeading>
        <AddButton buttonLabel='Add Banner' onClick={() => setIsOpen(true)} />
      </BannerHeaderContainer>
      <BannerBodyContainer> */}
        <AppHeader headerTitle={'Banner'} dataCount={bannerData?.length} buttonLabel={'Add Banner'} onClick={() => setIsOpen(true)} />
        <MaterialReactTable table={table} />
      {/* </BannerBodyContainer> */}

      <AddBanner open={isOpen} handleClose={() => setIsOpen(false)} getBannerData={getBannerData} editDataObject={editDataObject}/>

      <MessageDialog open={showMessageDialog} handleClose={handleCloseMessageDialog} handleSuccess={() => handleDeleteBanner()} message={'Are you sure you want to delete this banner?.'} headerTitle={'Delete Banner'}></MessageDialog>

      <ImageDialog open={openImageDialog} handleClose={handleCloseImageDialog} imageBaseString={selectedImage}/>
    </BannerContainer>
  )
}

export default Banner