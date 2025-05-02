import React, { useEffect, useMemo, useState } from 'react'
import {
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';
import { IAdsPoster } from '../../types/adsPoster';
import { Box, IconButton, Tooltip } from '@mui/material';
import moment from 'moment';
import { ActionImg, ImageLabel } from './AdsPoster.styled';
import { serverDeleteAdsPoster, serverGetAdsPosterData } from '../../services/serverApi';
import { deleteIcon, editIcon } from '../../assets/images';

const useAdsPoster = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [openImageDialog, setOpenImageDialog] = useState<boolean>(false)
    const [selectedImage, setSelectedImage] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false);
    const [adsPosterData, setAdsPosterData] = useState<any[]>([]);
    const [editDataObject, setEditDataObject] = useState<IAdsPoster | null>(null)
    const [showMessageDialog, setShowMessageDialog] = useState<boolean>(false);
    const [deleteAdsPosterId, setDeleteAdsPosterId] = useState<string>('');

    const getAdsPosterData = async () => {
        try {
            setLoading(true)
            const res = await serverGetAdsPosterData();
            setAdsPosterData(res?.data)
            setLoading(false)
        } catch (error) {
            console.error(error);
            setAdsPosterData([])
            setLoading(false)
        }
    }

    useEffect(() => {
        getAdsPosterData()
    }, [])

    const columns = useMemo<MRT_ColumnDef<IAdsPoster>[]>(
        () => [
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

    const handleEditData = (row: any) => {
        setEditDataObject(row?.original)
        setIsOpen(true)
    }

    const handleOpenMessageDialog = (row: any) => {
        setShowMessageDialog(true)
        setDeleteAdsPosterId(row?.original?._id)
    }

    const handleCloseMessageDialog = () => {
        setShowMessageDialog(false)
    }

    const handleDeleteAdsPoster = async () => {
        try {
            await serverDeleteAdsPoster(deleteAdsPosterId)
            handleCloseMessageDialog()
            setDeleteAdsPosterId('')
            getAdsPosterData()
        } catch (error) {
            console.log('error', error);
        }
    }

    const handleCloseImageDialog = () => {
        setOpenImageDialog(false)
        setSelectedImage('')
    }

    const table = useMaterialReactTable({
        columns,
        data: adsPosterData,
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
        setIsOpen,
        isOpen,
        table,
        adsPosterData,
        getAdsPosterData,
        showMessageDialog,
        handleCloseMessageDialog,
        handleDeleteAdsPoster,
        editDataObject,
        selectedImage,
        handleCloseImageDialog,
        openImageDialog
    }
}

export default useAdsPoster