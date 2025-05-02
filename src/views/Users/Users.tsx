import React from 'react'
import AppHeader from '../../components/AppHeader/AppHeader'
import { UsersContainer } from './Users.styled'
import useUsers from './useUsers'
import {
  MaterialReactTable,
} from 'material-react-table';
import AddUser from './AddUser/AddUser';
import MessageDialog from '../../Dialogs/MeesageDialog/MessageDialog';

const Users = () => {
  const { loading, userData, table, isOpen, handleOpen, HandleClose, showMessageDialog, handleCloseMessageDialog, handleDeleteUser, handleCloseStatusMessageDialog, handleChangeUserStatus, showStatusMessageDialog, selectedUserStatus } = useUsers();
  return (
    <UsersContainer>
      <AppHeader headerTitle={'Users'} dataCount={userData?.length} buttonHide={true} />
      <MaterialReactTable table={table} />

      <MessageDialog open={showMessageDialog} handleClose={handleCloseMessageDialog} handleSuccess={() => handleDeleteUser()} message={'Are you sure you want to delete this user?'} headerTitle={'Delete User'}></MessageDialog>

      <MessageDialog open={showStatusMessageDialog} handleClose={handleCloseStatusMessageDialog} handleSuccess={() => handleChangeUserStatus()} message={`Are you sure you want to ${selectedUserStatus ? 'active' : 'disActive'} this user status?`} headerTitle={'Update User Status'}></MessageDialog>
    </UsersContainer>
  )
}

export default Users