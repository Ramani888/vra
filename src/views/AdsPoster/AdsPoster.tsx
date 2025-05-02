import React from 'react'
import AppHeader from '../../components/AppHeader/AppHeader'
import { AdsPosterContainer } from './AdsPoster.styled'
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import useAdsPoster from './useAdsPoster';
import AddAdsPoster from './AddAdsPoster/AddAdsPoster';
import MessageDialog from '../../Dialogs/MeesageDialog/MessageDialog';
import ImageDialog from '../../Dialogs/ImageDialog/ImageDialog';

const AdsPoster = () => {
  const {
    setIsOpen,
    isOpen,
    table,
    getAdsPosterData,
    editDataObject,
    showMessageDialog,
    handleCloseMessageDialog,
    handleDeleteAdsPoster,
    openImageDialog,
    selectedImage,
    handleCloseImageDialog,
    adsPosterData
  } = useAdsPoster();
  return (
    <AdsPosterContainer>
      <AppHeader headerTitle={'Ads Poster'} dataCount={adsPosterData?.length} buttonLabel={'Add Ads Poster'} onClick={() => setIsOpen(true)} />
      <MaterialReactTable table={table} />

      <AddAdsPoster open={isOpen} handleClose={() => setIsOpen(false)} getAdsPosterData={getAdsPosterData} editDataObject={editDataObject}/>
      <MessageDialog open={showMessageDialog} handleClose={handleCloseMessageDialog} handleSuccess={() => handleDeleteAdsPoster()} message={'Are you sure you want to delete this Ads Poster?.'} headerTitle={'Delete Ads Poster'}></MessageDialog>
      <ImageDialog open={openImageDialog} handleClose={handleCloseImageDialog} imageBaseString={selectedImage}/>
    </AdsPosterContainer>
  )
}

export default AdsPoster