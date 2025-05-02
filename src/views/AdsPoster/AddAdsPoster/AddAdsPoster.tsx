import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react'
import { IAdsPoster } from '../../../types/adsPoster';
import { Formik } from "formik";
import useAddAdsPoster from './useAddAdsPoster';
import { Form } from './AddAdsPoster.styled';
import AppInput from '../../../components/AppInput/AppInput';

interface Props {
    open: boolean;
    handleClose: () => void;
    getAdsPosterData: () => void;
    editDataObject: IAdsPoster | null; 
}

const AddAdsPoster: React.FC<Props> = ({ open, handleClose, getAdsPosterData, editDataObject }) => {
    const { schema, handleSubmit, handleImageChange, image, loading } = useAddAdsPoster(handleClose, getAdsPosterData, editDataObject, )
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={'body'}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title" bgcolor={'#0b3157'} color={'#ffffff'}>{editDataObject ? 'Update Ads Poster' : 'Add Ads Poster'}</DialogTitle>
      <Formik
        validationSchema={schema}
        initialValues={{ image: "" }}
        onSubmit={(values) => {
          handleSubmit({...values, image: image})
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit}>
            <DialogContent dividers sx={{gap: 2, display: 'flex', flexDirection: 'column', width: '400px' }}>
              <AppInput
                label='Select Image' 
                name='image' 
                type='file' 
                handleChange={(e) => {
                  handleChange(e);
                  handleImageChange(e);
                }} 
                inputProps={{ accept: "image/png, image/gif, image/jpeg" }}

                handleBlur={handleBlur}
                errors={errors}
                touched={touched}
                isUpdate={editDataObject ? true : false}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="contained" color={'inherit'}>Cancel</Button>
              <Box sx={{ m: 1, position: 'relative' }}>
                <Button variant="contained" type='submit' color={'primary'} disabled={loading}>Submit</Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                  />
                )}
              </Box>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  )
}

export default AddAdsPoster