import { Dialog } from '@mui/material'
import React from 'react'

interface Props {
    open: boolean;
    handleClose: () => void;
    imageBaseString: string;
}

const ImageDialog: React.FC<Props> = ({ open, handleClose, imageBaseString }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      style={{ maxWidth: "100%", maxHeight: "100%" }}
    >
      <img
        style={{ width: 'auto', height: '100%' }}
        src={`${imageBaseString}`}
        alt="image"
      />
    </Dialog>
  )
}

export default ImageDialog