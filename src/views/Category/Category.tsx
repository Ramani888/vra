import React from 'react'
import AppHeader from '../../components/AppHeader/AppHeader'
import { CategoryContainer } from './Category.styled'
import useCategory from './useCategory'
import {
    MaterialReactTable,
} from 'material-react-table';
import MessageDialog from '../../Dialogs/MeesageDialog/MessageDialog';
import AddCategory from './AddCategory/AddCategory';
import ImageDialog from '../../Dialogs/ImageDialog/ImageDialog';

const Category = () => {
    const { table, showMessageDialog, handleDeleteCategory, handleCloseMessageDialog, getCategoryData, isOpen, setIsOpen, categoryData, openImageDialog, handleCloseImageDialog, selectedImage, editDataObject } = useCategory()
  return (
    <CategoryContainer>
        <AppHeader headerTitle={'Category'} dataCount={categoryData?.length} buttonLabel={'Add Category'} onClick={() => setIsOpen(true)} />
        <MaterialReactTable table={table} />

        <AddCategory open={isOpen} handleClose={() => setIsOpen(false)} getCategoryData={getCategoryData} editDataObject={editDataObject}/>

        <MessageDialog open={showMessageDialog} handleClose={handleCloseMessageDialog} handleSuccess={() => handleDeleteCategory()} message={'Are you sure you want to delete this category?.'} headerTitle={'Delete Category'}></MessageDialog>

        <ImageDialog open={openImageDialog} handleClose={handleCloseImageDialog} imageBaseString={selectedImage}/>

    </CategoryContainer>
  )
}

export default Category