import React from 'react'
import { PramotionContainer } from './Pramotion.styled'
import usePramotion from './usePramotion'
import { MaterialReactTable } from "material-react-table";
import CarousalDialog from '../../Dialogs/CarousalDialog/CarousalDialog';
import AppHeader from '../../components/AppHeader/AppHeader';

const Pramotion = () => {
    const {
        table,
        selectedImage,
        selectedVideo,
        openImageDialog,
        handleCloseImageDialog,
        productData
    } = usePramotion();
    return (
        <PramotionContainer>
            <AppHeader headerTitle={'Pramotions'} dataCount={productData?.length} buttonHide={true} />
            <MaterialReactTable table={table} />
            <CarousalDialog open={openImageDialog} handleClose={handleCloseImageDialog} imageDataPath={selectedImage} videoPath={selectedVideo} />
        </PramotionContainer>
    )
}

export default Pramotion