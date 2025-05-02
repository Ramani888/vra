import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

interface Props {
    open: boolean;
    handleClose: () => void;
    handleSuccess: () => void;
    message: string;
    headerTitle: string;
    loading?: boolean;
}

const MessageDialog: React.FC<Props> = ({ open, handleClose, handleSuccess, message, headerTitle, loading }) => {
  return (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title" bgcolor={'#0b3157'} color={'#ffffff'}>
          {headerTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" marginTop={2}>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} 
                sx={{
                    background: '#1876d1',
                    color: '#ffffff',
                    '&:hover': { 
                        background: '#1876d1',
                    },
                }}
                disabled={loading}
            >
                Cancel
            </Button>
            <Button onClick={() => handleSuccess()} 
                sx={{
                    background: '#d32f2f', 
                    color: '#ffffff',
                    '&:hover': { 
                        background: '#d32f2f',
                    },
                }}
                disabled={loading}
            >
                Ok
            </Button>
        </DialogActions>
    </Dialog>
  )
}

export default MessageDialog