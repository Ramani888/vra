import React, { useEffect, useMemo, useState } from 'react'
import { serverDeleteCategory, serverGetCategory } from '../../services/serverApi'
import { ICategory } from '../../types/category'
import {
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';
import { Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import { ActionImg, ImageLabel } from './Category.styled';
import { deleteIcon, editIcon } from '../../assets/images';

const useCategory = () => {
    const [categoryData, setCategoryData] = useState<ICategory[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [showMessageDialog, setShowMessageDialog] = useState<boolean>(false);
    const [deleteCategoryId, setDeleteCategoryId] = useState<string>('');
    const [openImageDialog, setOpenImageDialog] = useState<boolean>(false)
    const [selectedImage, setSelectedImage] = useState<string>('')
    const [editDataObject, setEditDataObject] = useState<ICategory | null>(null)

    const getCategoryData = async () => {
        try {
            setLoading(true)
            const res = await serverGetCategory();
            setCategoryData(res?.data)
            setLoading(false)
        } catch (e) {
            console.log(e)
            setCategoryData([])
            setLoading(false)
        }
    }

    const columns = useMemo<MRT_ColumnDef<ICategory>[]>(
        () => [
        {
            accessorKey: 'name', //access nested data with dot notation
            header: 'Name'
        },
        {
            accessorKey: 'createdAt',
            header: 'Create Date',
            Cell: ({ row }) => (
                <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
                    <div>{moment(row.original.createdAt).format('YYYY-MM-DD')}</div>
                </Box>
            )
        },
        {
            accessorKey: 'image',
            header: 'Image',
            Cell: ({ row }) => {
                // const uint8Array = new Uint8Array(row.original.image.data.data);
                // let str = '';
                // for (let i = 0; i < uint8Array.length; i++) {
                //     str += String.fromCharCode(uint8Array[i]);
                // }
                // const base64String = btoa(str);
                return (
                <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
                    <ImageLabel onClick={() => handleOpenImageDialog(row?.original?.imagePath)}>View Image</ImageLabel>
                </Box>
                )
            }
        }
        ],
        [],
    );

    const handleOpenImageDialog = (data: string) => {
        setOpenImageDialog(true)
        setSelectedImage(data)
    }

    const handleCloseImageDialog = () => {
        setOpenImageDialog(false)
        setSelectedImage('')
    }

    const handleOpenMessageDialog = (row: any) => {
        setShowMessageDialog(true)
        setDeleteCategoryId(row?.original?._id)
    }

    const handleCloseMessageDialog = () => {
        setShowMessageDialog(false)
        setDeleteCategoryId('')
    }

    const handleDeleteCategory = async () => {
        try {
            await serverDeleteCategory(deleteCategoryId)
            handleCloseMessageDialog()
            getCategoryData()
        } catch (e) {
            console.log(e)
        }
    }

    const handleEditData = (row: any) => {
        setEditDataObject(row?.original)
        setIsOpen(true)
    }

    const table = useMaterialReactTable({
        columns,
        data: categoryData,
        enableEditing: true,
        positionActionsColumn: 'last',
        enablePagination: false,
        enableBottomToolbar: false,
        state: { isLoading: loading },
        enableStickyHeader: true,
        muiTableContainerProps: { sx: { maxHeight: '65vh'} },
        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip title="Edit">
                <IconButton onClick={() => handleEditData(row)}>
                    <ActionImg src={editIcon} />
                </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                <IconButton color="error" onClick={() => handleOpenMessageDialog(row)}>
                    <ActionImg src={deleteIcon} />
                </IconButton>
                </Tooltip>
            </Box>
        ),
    });
    
    useEffect(() => {
        getCategoryData()
    }, [])

    useEffect(() => {
        if (!isOpen) {
            setEditDataObject(null)
        }
    }, [isOpen])
    return {
        table,
        showMessageDialog,
        handleDeleteCategory,
        handleCloseMessageDialog,
        getCategoryData,
        isOpen,
        setIsOpen,
        categoryData,
        openImageDialog,
        handleCloseImageDialog,
        selectedImage,
        editDataObject
    }
}

export default useCategory