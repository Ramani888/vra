import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import AppInput from '../../../components/AppInput/AppInput';
import { Form } from './AddBanner.styled';
import useAddBanner from './useAddBanner';
import { Formik } from "formik";
import { IBanner } from '../../../types/banner';

interface Props {
  open: boolean;
  handleClose: () => void;
  getBannerData: () => void;
  editDataObject: IBanner | null; 
}

const AddBanner: React.FC<Props> = ({ open, handleClose, getBannerData, editDataObject }) => {
  const { image, handleImageChange, handleSubmit, loading, schema } = useAddBanner(handleClose, getBannerData, editDataObject);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={'body'}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title" bgcolor={'#0b3157'} color={'#ffffff'}>{editDataObject ? 'Update Banner' : 'Add Banner'}</DialogTitle>
      <Formik
        validationSchema={schema}
        initialValues={{ name: editDataObject ? editDataObject?.name : "", image: "" }}
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
                label='Name' 
                name='name' 
                type='text' 
                handleChange={(e) => handleChange(e)} 
                value={String(values?.name)} 
                placeholder={'Enter name'} 
                handleBlur={handleBlur}
                errors={errors}
                touched={touched}
              />
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

export default AddBanner