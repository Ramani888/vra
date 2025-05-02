import React from 'react';
import { IProduct } from '../../types/product';
import { MaterialReactTable } from 'material-react-table';
import useProductDataTable from './useProductDataTable';
import CarousalDialog from '../../Dialogs/CarousalDialog/CarousalDialog';

interface ProductDataTableProps {
    data: IProduct[];
}

const ProductDataTable: React.FC<ProductDataTableProps> = ({ data }) => {
    const {productTable, openImageDialog, selectedImage, selectedVideo, handleCloseImageDialog} = useProductDataTable(data);

    return (
        <>
            <MaterialReactTable table={productTable} />
            {openImageDialog && (<CarousalDialog open={openImageDialog} handleClose={handleCloseImageDialog} imageDataPath={selectedImage} videoPath={selectedVideo} />)}
        </>

    );
};

export default ProductDataTable;
