import { Box, IconButton, Switch, Tooltip } from '@mui/material'
import {
    useMaterialReactTable,
    type MRT_ColumnDef,
  } from 'material-react-table';
import React, { useEffect, useMemo, useState } from 'react'
import { serverDeleteUsers, serverGetUsers, serverUpdateUserStatus } from '../../services/serverApi'
import { IUsers } from '../../types/user.d'
import { ActionImg, StatusLabel } from './Users.styled';
import { deleteIcon } from '../../assets/images';

const useUsers = () => {
    const [userData, setUserData] = useState<IUsers[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [showMessageDialog, setShowMessageDialog] = useState<boolean>(false);
    const [deleteUserId, setDeleteUserId] = useState<string>('');
    const [selectedUserStatus, setSelectedUserStatus] = useState<any>();

    const [showStatusMessageDialog, setStatusMessageDialog] = useState<boolean>(false);
    const [selectedUserId, setSelectedUserId] = useState<string>('');
    const handleOpen = () => {
        setIsOpen(true)
    }
    const HandleClose = () => {
        setIsOpen(false)
    }
    const getUserData = async () => {
        try {
            setLoading(true)
            const res = await serverGetUsers();
            setUserData(res?.data)
            setLoading(false)
        } catch(error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getUserData()
    }, [])

    const columns = useMemo<MRT_ColumnDef<IUsers>[]>(
        () => [
        {
            accessorKey: 'name',
            header: 'Name'
        },
        {
            accessorKey: 'email',
            header: 'Email'
        },
        {
            accessorKey: 'mobileNumber',
            header: 'Mobile Number'
        },
        {
            accessorKey: 'businessType',
            header: 'Business Type'
        },
        {
            accessorKey: 'city',
            header: 'City'
        },
        {
            accessorKey: 'state',
            header: 'State'
        },
        {
            accessorKey: 'country',
            header: 'Country'
        },
        {
            accessorKey: 'pinCode',
            header: 'PinCode'
        },
        {
            accessorKey: 'earnedReward',
            header: 'Earned Reward',
            Cell: ({ row }: any) => (
                <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
                    {row?.original?.rewardData?.totalEarnedReward}
                </Box>
            )
        },
        {
            accessorKey: 'redeemedReward',
            header: 'Redeemed Reward',
            Cell: ({ row }: any) => (
                <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
                    {row?.original?.rewardData?.totalRedeemedReward}
                </Box>
            )
        },
        {
            accessorKey: 'remainingReward',
            header: 'Remaining Reward',
            Cell: ({ row }: any) => (
                <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
                    {row?.original?.rewardData?.remainingReward}
                </Box>
            )
        },
        {
            accessorKey: 'isActive',
            header: 'Account Status',
            Cell: ({ row }) => (
                <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
                    <StatusLabel isActive={row?.original?.isActive}>{row?.original?.isActive ? 'Active' : 'DisActive'}</StatusLabel>
                    <Switch
                        checked={row?.original?.isActive}
                        onChange={() => handleOpenStatusMessageDialog(row, !row?.original?.isActive)}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Box>
            )
        }
        ],
        [],
    );

    const handleOpenMessageDialog = (row: any) => {
        setShowMessageDialog(true)
        setDeleteUserId(row?.original?._id)
    }

    const handleCloseMessageDialog = () => {
        setShowMessageDialog(false)
    }

    const handleDeleteUser = async () => {
        try {
            await serverDeleteUsers(deleteUserId)
            handleCloseMessageDialog()
            setDeleteUserId('')
            getUserData()
        } catch (error) {
            console.log('error', error);
        }
    }

    const handleOpenStatusMessageDialog = (row: any, status: boolean) => {
        setStatusMessageDialog(true)
        setSelectedUserId(row?.original?._id)
        setSelectedUserStatus(status)
    }

    const handleCloseStatusMessageDialog = () => {
        setStatusMessageDialog(false)
    }

    const handleChangeUserStatus = async () => {
        try {
            const data = {
                _id: selectedUserId, 
                isActive: selectedUserStatus
            }
            await serverUpdateUserStatus(data)
            handleCloseStatusMessageDialog()
            setSelectedUserId('')
            setSelectedUserStatus(undefined)
            getUserData()
        } catch (error) {
            console.log('error', error);
        }
    }

    const table = useMaterialReactTable({
        columns,
        data: userData,
        enableEditing: true,
        positionActionsColumn: 'last',
        enablePagination: false,
        enableBottomToolbar: false,
        state: { isLoading: loading },
        enableStickyHeader: true,
        muiTableContainerProps: { sx: { maxHeight: '65vh'} },
        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip title="Delete">
                <IconButton color="error" onClick={() => handleOpenMessageDialog(row)}>
                    <ActionImg src={deleteIcon} />
                </IconButton>
                </Tooltip>
            </Box>
        ),
    });
    return {
        loading,
        userData,
        table,
        isOpen,
        handleOpen,
        HandleClose,
        handleCloseMessageDialog,
        handleOpenMessageDialog,
        deleteUserId,
        showMessageDialog,
        handleDeleteUser,
        handleCloseStatusMessageDialog,
        handleChangeUserStatus,
        showStatusMessageDialog,
        selectedUserStatus
    }
}

export default useUsers