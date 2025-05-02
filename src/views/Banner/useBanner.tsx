import React, { useEffect, useMemo, useState } from 'react'
import { serverDeleteBanner, serverGetBanners } from '../../services/serverApi'
import {
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { IBanner } from '../../types/banner';
import moment from 'moment';
import { Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ActionImg, ImageLabel } from './Banner.styled';
import { deleteIcon, editIcon } from '../../assets/images';

const useBanner = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [bannerData, setBannerData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [showMessageDialog, setShowMessageDialog] = useState<boolean>(false);
    const [deleteBannerId, setDeleteBannerId] = useState<string>('');
    const [editDataObject, setEditDataObject] = useState<IBanner | null>(null)
    const [openImageDialog, setOpenImageDialog] = useState<boolean>(false)
    const [selectedImage, setSelectedImage] = useState<string>('')
    const getBannerData = async () => {
        try {
            setLoading(true)
            const res = await serverGetBanners();
            setBannerData(res?.data)
            setLoading(false)
        } catch (error) {
            console.error(error);
            setBannerData([])
            setLoading(false)
        }
    }

    useEffect(() => {
        getBannerData()
    }, [])

    const handleOpenMessageDialog = (row: any) => {
        setShowMessageDialog(true)
        setDeleteBannerId(row?.original?._id)
    }

    const handleCloseMessageDialog = () => {
        setShowMessageDialog(false)
    }

    const handleDeleteBanner = async () => {
        try {
            await serverDeleteBanner(deleteBannerId)
            handleCloseMessageDialog()
            setDeleteBannerId('')
            getBannerData()
        } catch (error) {
            console.log('error', error);
        }
    }

    const handleEditData = (row: any) => {
        setEditDataObject(row?.original)
        setIsOpen(true)
    }

    const columns = useMemo<MRT_ColumnDef<any>[]>(
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

    const table = useMaterialReactTable({
        columns,
        data: bannerData,
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
                    <ActionImg src={editIcon}/>
                </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                <IconButton color="error" onClick={() => handleOpenMessageDialog(row)}>
                    <ActionImg src={deleteIcon}/>
                </IconButton>
                </Tooltip>
            </Box>
        ),
    });

    useEffect(() => {
        if (!isOpen) {
            setEditDataObject(null)
        }
    }, [isOpen])

    return {
        bannerData,
        isOpen,
        setIsOpen,
        table,
        getBannerData,
        showMessageDialog,
        handleCloseMessageDialog,
        handleDeleteBanner,
        editDataObject,
        selectedImage,
        handleCloseImageDialog,
        openImageDialog
    }
}

export default useBanner